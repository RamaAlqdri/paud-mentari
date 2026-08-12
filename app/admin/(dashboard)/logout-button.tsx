"use client";

import { signOut } from "next-auth/react";
import { Button } from "@tremor/react";
import { RiLogoutBoxLine } from "@remixicon/react";

export default function AdminLogoutButton({ isMinimized = false }: { isMinimized?: boolean }) {
  return (
    <Button 
      variant="secondary" 
      className={`w-full text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all ${isMinimized ? 'p-3 flex justify-center' : 'justify-start px-3 py-2'}`}
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      title={isMinimized ? "Keluar" : undefined}
    >
      <RiLogoutBoxLine className={`${isMinimized ? 'h-5 w-5 m-0' : 'mr-2 h-4 w-4 shrink-0'}`} />
      {!isMinimized && <span>Keluar</span>}
    </Button>
  );
}
