"use client";

import { useState } from "react";
import { Select, SelectItem } from "@tremor/react";
import { updatePPDBStatus } from "@/actions/admin-ppdb";

interface StatusSelectProps {
  id: string;
  currentStatus: "MENUNGGU" | "DITERIMA" | "DITOLAK";
}

export default function StatusSelect({ id, currentStatus }: StatusSelectProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (value: string) => {
    const newStatus = value as "MENUNGGU" | "DITERIMA" | "DITOLAK";
    setIsUpdating(true);
    
    const res = await updatePPDBStatus(id, newStatus);
    
    if (res.success) {
      setStatus(newStatus);
    } else {
      // Revert if failed
      setStatus(currentStatus);
      alert(res.message);
    }
    
    setIsUpdating(false);
  };

  return (
    <Select value={status} onValueChange={handleStatusChange} disabled={isUpdating} className={`w-[130px] h-8 text-xs font-medium ${
        status === "MENUNGGU" ? "border-amber-200 text-amber-700 bg-amber-50" :
        status === "DITERIMA" ? "border-emerald-200 text-emerald-700 bg-emerald-50" :
        "border-red-200 text-red-700 bg-red-50"
      }`}>
        <SelectItem value="MENUNGGU">Menunggu</SelectItem>
        <SelectItem value="DITERIMA">Diterima</SelectItem>
        <SelectItem value="DITOLAK">Ditolak</SelectItem>
    </Select>
  );
}
