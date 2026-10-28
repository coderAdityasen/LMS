import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { UserEditor } from "@/components/admin/user-editor";
import { getUserDetail } from "@/lib/data/repository";

export const metadata = { title: "Student Profile · Admin" };

export default async function UserDetailPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const detail = await getUserDetail(userId);
  if (!detail) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Students</span>
        </Link>
      </div>

      <UserEditor detail={detail} />
    </div>
  );
}
