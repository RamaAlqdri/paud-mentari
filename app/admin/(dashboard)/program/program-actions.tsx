"use client";

import { RiEdit2Line, RiDeleteBin6Line, RiToggleLine } from "@remixicon/react";
import Link from "next/link";
import { deleteProgram, toggleProgramStatus } from "@/actions/admin-crud";
import { useState } from "react";

export default function ProgramActions({ id, isActive }: { id: string, isActive: boolean }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus program ini? Data tidak dapat dikembalikan.")) {
      setIsDeleting(true);
      await deleteProgram(id);
      setIsDeleting(false);
    }
  };

  const handleToggle = async () => {
    const actionText = isActive ? "menonaktifkan" : "mengaktifkan";
    if (confirm(`Apakah Anda yakin ingin ${actionText} program ini?`)) {
      setIsToggling(true);
      await toggleProgramStatus(id, isActive);
      setIsToggling(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <button 
        onClick={handleToggle}
        disabled={isToggling}
        className={`p-2 rounded-lg transition-colors border shadow-sm flex items-center justify-center gap-1 ${
          isActive 
            ? "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100" 
            : "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
        } ${isToggling ? "opacity-50 cursor-not-allowed" : ""}`}
        title={isActive ? "Nonaktifkan Program" : "Aktifkan Program"}
      >
        <RiToggleLine className="w-4 h-4" />
      </button>

      <Link 
        href={`/admin/program/${id}/edit`}
        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 shadow-sm"
        title="Edit Program"
      >
        <RiEdit2Line className="w-4 h-4" />
      </Link>
      
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className={`p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 shadow-sm ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
        title="Hapus Program"
      >
        <RiDeleteBin6Line className="w-4 h-4" />
      </button>
    </div>
  );
}
