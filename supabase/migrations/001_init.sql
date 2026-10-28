-- Meridian LMS schema. Run this in the Supabase SQL editor.
-- Service role bypasses RLS. Purchases and private PDFs are written with that key.

-- profiles must exist before is_admin() (SQL functions are validated at create time)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  thumbnail_url text,
  price decimal(10,2) not null default 0.00,
  is_published boolean not null default false,
  created_by uuid references public.profiles(id),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_pdfs (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  file_path text not null,
  module_title text not null default 'Lessons',
  summary text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  amount_paid decimal(10,2) not null,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'completed', 'refunded')),
  payment_reference text,
  purchased_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create index if not exists courses_published_idx on public.courses (is_published);
create index if not exists course_pdfs_course_idx on public.course_pdfs (course_id, sort_order);
create index if not exists purchases_user_idx on public.purchases (user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at before update on public.courses
for each row execute function public.set_updated_at();

create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'Only admins can change roles';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_role_guard on public.profiles;
create trigger profiles_role_guard before update on public.profiles
for each row execute function public.prevent_role_escalation();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_pdfs enable row level security;
alter table public.purchases enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select to authenticated
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Admins can view all profiles" on public.profiles;
create policy "Admins can view all profiles"
  on public.profiles for select to authenticated
  using (public.is_admin());

drop policy if exists "Admins can update all profiles" on public.profiles;
create policy "Admins can update all profiles"
  on public.profiles for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Anyone can view published courses" on public.courses;
create policy "Anyone can view published courses"
  on public.courses for select
  using (is_published = true);

drop policy if exists "Admins full access to courses" on public.courses;
create policy "Admins full access to courses"
  on public.courses for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Anyone can view syllabus of published courses" on public.course_pdfs;
create policy "Anyone can view syllabus of published courses"
  on public.course_pdfs for select
  using (
    exists (
      select 1 from public.courses
      where courses.id = course_pdfs.course_id and courses.is_published = true
    )
  );

drop policy if exists "Purchasers can view course PDFs" on public.course_pdfs;
create policy "Purchasers can view course PDFs"
  on public.course_pdfs for select to authenticated
  using (
    exists (
      select 1 from public.purchases
      where purchases.course_id = course_pdfs.course_id
        and purchases.user_id = auth.uid()
        and purchases.payment_status = 'completed'
    )
  );

drop policy if exists "Admins full access to course_pdfs" on public.course_pdfs;
create policy "Admins full access to course_pdfs"
  on public.course_pdfs for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Users can view own purchases" on public.purchases;
create policy "Users can view own purchases"
  on public.purchases for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Admins full access to purchases" on public.purchases;
create policy "Admins full access to purchases"
  on public.purchases for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('course-thumbnails', 'course-thumbnails', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('course-pdfs', 'course-pdfs', false)
on conflict (id) do nothing;

drop policy if exists "Public read thumbnails" on storage.objects;
create policy "Public read thumbnails"
  on storage.objects for select
  using (bucket_id = 'course-thumbnails');

drop policy if exists "Admins write thumbnails" on storage.objects;
create policy "Admins write thumbnails"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'course-thumbnails' and public.is_admin());

drop policy if exists "Admins can upload PDFs" on storage.objects;
create policy "Admins can upload PDFs"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'course-pdfs' and public.is_admin());

drop policy if exists "Admins can update PDFs" on storage.objects;
create policy "Admins can update PDFs"
  on storage.objects for update to authenticated
  using (bucket_id = 'course-pdfs' and public.is_admin());

drop policy if exists "Admins can delete PDFs" on storage.objects;
create policy "Admins can delete PDFs"
  on storage.objects for delete to authenticated
  using (bucket_id = 'course-pdfs' and public.is_admin());

grant select on public.courses, public.course_pdfs to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.purchases to authenticated;
grant insert, update, delete on public.courses, public.course_pdfs to authenticated;
grant all on public.profiles, public.courses, public.course_pdfs, public.purchases to service_role;