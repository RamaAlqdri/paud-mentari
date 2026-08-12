import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminLayoutShell from "@/components/admin-layout-shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // Proteksi rute admin
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminLayoutShell user={session.user}>
      {children}
    </AdminLayoutShell>
  );
}
