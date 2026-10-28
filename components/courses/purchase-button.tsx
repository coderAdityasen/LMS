import Link from "next/link";
import { buttonClass } from "@/lib/ui";
import { formatPrice } from "@/lib/utils";

export function PurchaseButton({
  courseId,
  price,
  purchased,
  loggedIn,
}: {
  courseId: string;
  price: number;
  purchased: boolean;
  loggedIn: boolean;
}) {
  if (purchased) {
    return (
      <Link href={`/dashboard/courses/${courseId}`} className={buttonClass("primary", "lg", "w-full")}>
        Go to course
      </Link>
    );
  }
  const href = loggedIn ? `/courses/${courseId}/checkout` : `/login?next=${encodeURIComponent(`/courses/${courseId}/checkout`)}`;
  return (
    <Link href={href} className={buttonClass("primary", "lg", "w-full")}>
      {price <= 0 ? "Enroll for free" : `Enroll · ${formatPrice(price)}`}
    </Link>
  );
}
