import { UserTable } from "@/components/admin/user-table";
import { listAllStudents } from "@/lib/data/repository";

export const metadata = { title: "Students & Roles · Admin" };

export default async function UsersPage() {
  const users = await listAllStudents();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Students & Roles
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage enrolled learners, review lifetime purchase volume, and adjust administrative access.
        </p>
      </div>

      <UserTable users={users} />
    </div>
  );
}
