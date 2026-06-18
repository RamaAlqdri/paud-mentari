import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, Building, FileText, Settings, LogOut } from "lucide-react";
import AdminLogoutButton from "./logout-button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // Proteksi rute admin
  if (!session) {
    redirect("/admin/login");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Pendaftar PPDB", href: "/admin/ppdb", icon: Users },
    { name: "Artikel & Berita", href: "/admin/artikel", icon: FileText },
    { name: "Tenaga Pendidik", href: "/admin/guru", icon: Users },
    { name: "Program", href: "/admin/program", icon: BookOpen },
    { name: "Fasilitas", href: "/admin/fasilitas", icon: Building },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r fixed h-full flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/admin" className="font-bold text-lg text-brand-orange flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-brand-yellow flex items-center justify-center text-foreground text-sm">
              M
            </div>
            PAUD Mentari
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-brand-orange hover:bg-orange-50 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
              {session.user?.name?.charAt(0) || "A"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-900 leading-none">{session.user?.name}</span>
              <span className="text-xs text-slate-500 mt-1">Admin</span>
            </div>
          </div>
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b flex items-center px-8 shadow-sm sticky top-0 z-10">
          <h2 className="text-lg font-medium text-slate-800">Administrator Panel</h2>
        </header>
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
