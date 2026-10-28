import Link from "next/link";
import { redirect } from "next/navigation";
import { purchaseCourse } from "@/lib/actions/purchases";
import { Cover } from "@/components/courses/cover";
import { SubmitButton } from "@/components/ui/submit-button";
import { requireUser } from "@/lib/auth/current-user";
import { getCourse, hasCompletedPurchase } from "@/lib/data/repository";
import { containerClass, formatPrice } from "@/lib/utils";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { courseId } = await params;
  const { error } = await searchParams;
  const user = await requireUser();
  const course = await getCourse(courseId);
  if (!course || !course.is_published) redirect("/courses");
  if (await hasCompletedPurchase(user.id, courseId)) redirect(`/dashboard/courses/${courseId}`);

  return (
    <div className={`${containerClass} py-8`}>
      <p className="text-sm text-muted">
        <Link href={`/courses/${course.id}`} className="font-semibold text-brand">Back to course</Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold">Checkout</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="rounded-lg border border-line bg-white p-5">
          <h2 className="text-lg font-bold">Confirm enrollment</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Complete your enrollment to gain immediate lifetime access to all course readings and lesson handouts in your dashboard.
          </p>
          <dl className="mt-5 grid gap-3 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-muted">Account</dt><dd className="font-semibold">{user.email}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted">Access</dt><dd className="font-semibold">Lifetime in your library</dd></div>
          </dl>
          {error ? <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p> : null}
          <form action={purchaseCourse} className="mt-6">
            <input type="hidden" name="course_id" value={course.id} />
            <SubmitButton className="w-full sm:w-auto" pendingLabel="Confirming...">
              {course.price <= 0 ? "Enroll for free" : `Complete enrollment · ${formatPrice(course.price)}`}
            </SubmitButton>
          </form>
        </section>
        <aside className="h-fit rounded-lg border border-line bg-white p-4">
          <div className="aspect-[16/9] overflow-hidden rounded-md">
            <Cover src={course.thumbnail_url} alt="" category={course.metadata.category} />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-brand">{course.metadata.partner}</p>
          <h2 className="mt-1 font-bold">{course.title}</h2>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
            <span>Total</span>
            <span className="text-lg font-bold">{formatPrice(course.price)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
