"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  RiDashboardLine, 
  RiTeamLine, 
  RiBookOpenLine, 
  RiBuildingLine, 
  RiFileTextLine, 
  RiMenuLine,
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine
} from "@remixicon/react";
import AdminLogoutButton from "@/app/admin/(dashboard)/logout-button";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface AdminLayoutShellProps {
  children: React.ReactNode;
  user?: User;
}

const navItems = [
  { name: "Dashboard", href: "/admin", icon: RiDashboardLine },
  { name: "Pendaftar PPDB", href: "/admin/ppdb", icon: RiTeamLine },
  { name: "Siswa", href: "/admin/siswa", icon: RiBookOpenLine },
  { name: "Artikel & Berita", href: "/admin/artikel", icon: RiFileTextLine },
  { name: "Guru & Staf", href: "/admin/guru", icon: RiTeamLine },
  { name: "Program", href: "/admin/program", icon: RiBookOpenLine },
];

export default function AdminLayoutShell({ children, user }: AdminLayoutShellProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-30 flex flex-col transition-all duration-300 ease-in-out
          ${isMinimized ? 'w-20' : 'w-64'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Sidebar Header / Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 shrink-0">
          <Link href="/admin" className="flex items-center gap-2 overflow-hidden w-full">
            {isMinimized ? (
              <div className="w-full flex justify-center">
                <Image src="/logo-icon.png" alt="Mentari Icon" width={32} height={32} className="object-contain" />
              </div>
            ) : (
              <Image src="/logo-landscape.png" alt="PAUD Mentari" width={140} height={40} className="object-contain" />
            )}
          </Link>
          {/* Close button for mobile inside sidebar */}
          <button 
            className="md:hidden text-gray-500 hover:text-gray-900 p-1"
            onClick={() => setIsMobileOpen(false)}
          >
            <RiCloseLine className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Nav */}
        <div className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`) && item.href !== '/admin';
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  title={isMinimized ? item.name : undefined}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-brand-orange text-white" 
                      : "text-slate-600 hover:text-brand-orange hover:bg-orange-50"
                  } ${isMinimized ? "justify-center" : ""}`}
                >
                  <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : ""}`} />
                  {!isMinimized && <span className="whitespace-nowrap truncate">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / User & Logout */}
        <div className="p-4 border-t border-gray-100 shrink-0 flex flex-col gap-4">
          <div className={`flex items-center ${isMinimized ? 'justify-center' : 'gap-3 px-2'}`}>
            <div className="h-9 w-9 shrink-0 rounded-full bg-brand-yellow/30 flex items-center justify-center text-sm font-bold text-brand-orange">
              {user?.name?.charAt(0) || "A"}
            </div>
            {!isMinimized && (
              <div className="flex flex-col truncate">
                <span className="text-sm font-bold text-slate-900 truncate">{user?.name || "Admin User"}</span>
                <span className="text-xs font-medium text-slate-500 truncate">{user?.email || "admin@mentari.com"}</span>
              </div>
            )}
          </div>
          <AdminLogoutButton isMinimized={isMinimized} />
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isMinimized ? 'md:ml-20' : 'md:ml-64'}`}>
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-8 shadow-sm sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-4 w-full">
            {/* Mobile Hamburger */}
            <button 
              className="md:hidden text-gray-600 hover:text-brand-orange p-1 rounded-md transition-colors"
              onClick={() => setIsMobileOpen(true)}
            >
              <RiMenuLine className="w-6 h-6" />
            </button>
            
            {/* Desktop Minimize Arrow */}
            <button 
              className="hidden md:flex text-gray-500 hover:text-brand-orange p-1 rounded-md transition-colors items-center justify-center bg-gray-50 border border-gray-100"
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? "Buka Sidebar" : "Perkecil Sidebar"}
            >
              {isMinimized ? <RiArrowRightSLine className="w-5 h-5" /> : <RiArrowLeftSLine className="w-5 h-5" />}
            </button>

            <h2 className="text-md font-normal text-gray-600">Administrator Panel</h2>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 bg-slate-50 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
