function realKey(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed.length < 30 || trimmed.includes("...")) return undefined;
  return trimmed;
}

export function supabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url?.startsWith("https://")) return undefined;
  return url;
}

export function supabaseKey() {
  return realKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ?? realKey(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

export function serviceRoleKey() {
  return realKey(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl() && supabaseKey());
}

export function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}
