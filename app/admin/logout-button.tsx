"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
  return (
    <Button 
      variant="outline" 
      className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Keluar
    </Button>
  );
}
