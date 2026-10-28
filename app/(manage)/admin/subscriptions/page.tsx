import { SubscriptionTable } from "@/components/admin/subscription-table";
import { listAllSubscriptions } from "@/lib/data/repository";

export const metadata = { title: "Subscriptions & Enrollments · Admin" };

export default async function SubscriptionsPage() {
  const subscriptions = await listAllSubscriptions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Subscriptions & Enrollments
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage course purchases, view student payment references, and track access grants.
        </p>
      </div>

      <SubscriptionTable subscriptions={subscriptions} />
    </div>
  );
}
