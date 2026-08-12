"use client";

import { signOut } from "next-auth/react";
import { Button } from "@tremor/react";
import { RiLogoutBoxLine } from "@remixicon/react";

export default function AdminLogoutButton() {
  return (
    <Button 
      variant="secondary" 
      className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      <RiLogoutBoxLine className="mr-2 h-4 w-4" />
      Keluar
    </Button>
  );
}
