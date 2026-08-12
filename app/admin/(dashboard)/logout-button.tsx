"use client";

import { signOut } from "next-auth/react";
import { RiLogoutBoxLine } from "@remixicon/react";

export default function AdminLogoutButton({ isMinimized = false }: { isMinimized?: boolean }) {
  return (
    <button 
      className={`w-full flex items-center border border-gray-200 shadow-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all ${isMinimized ? 'p-3 justify-center' : 'justify-start px-4 py-2.5 gap-2'}`}
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      title={isMinimized ? "Keluar" : undefined}
    >
      <RiLogoutBoxLine className={isMinimized ? 'h-5 w-5 shrink-0' : 'h-5 w-5 shrink-0'} />
      {!isMinimized && <span className="font-medium text-sm">Keluar</span>}
    </button>
  );
}
