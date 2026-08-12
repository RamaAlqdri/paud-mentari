"use client";

import { RiEdit2Line, RiDeleteBin6Line, RiToggleLine, RiEyeLine } from "@remixicon/react";
import Link from "next/link";
import { deleteSiswa, toggleSiswaStatus } from "@/actions/admin-crud";
import { useState } from "react";
import { ConfirmationModal } from "@/components/confirmation-modal";

export default function StudentActions({ id, isActive }: { id: string, isActive: boolean }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteSiswa(id);
    setIsDeleting(false);
    setDeleteModalOpen(false);
  };

  const handleToggle = async () => {
    setIsToggling(true);
    await toggleSiswaStatus(id, isActive);
    setIsToggling(false);
    setToggleModalOpen(false);
  };

  const actionText = isActive ? "menonaktifkan" : "mengaktifkan";

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <button 
          onClick={() => setToggleModalOpen(true)}
          disabled={isToggling}
          className={`p-2 rounded-lg transition-colors border shadow-sm flex items-center justify-center gap-1 ${
            isActive 
              ? "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100" 
              : "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
          } ${isToggling ? "opacity-50 cursor-not-allowed" : ""}`}
          title={isActive ? "Nonaktifkan Siswa" : "Aktifkan Siswa"}
        >
          <RiToggleLine className="w-4 h-4" />
        </button>

        <Link 
          href={`/admin/siswa/${id}`}
          className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200 shadow-sm"
          title="Lihat Detail Siswa"
        >
          <RiEyeLine className="w-4 h-4" />
        </Link>

        <Link 
          href={`/admin/siswa/${id}/edit`}
          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 shadow-sm"
          title="Edit Data Siswa"
        >
          <RiEdit2Line className="w-4 h-4" />
        </Link>
        
        <button 
          onClick={() => setDeleteModalOpen(true)}
          disabled={isDeleting}
          className={`p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 shadow-sm ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
          title="Hapus Siswa"
        >
          <RiDeleteBin6Line className="w-4 h-4" />
        </button>
      </div>

      <ConfirmationModal 
        isOpen={deleteModalOpen}
        onClose={() => !isDeleting && setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Hapus Data Siswa"
        message="Apakah Anda yakin ingin menghapus data siswa ini? Data tidak dapat dikembalikan."
        confirmText="Ya, Hapus"
      />

      <ConfirmationModal 
        isOpen={toggleModalOpen}
        onClose={() => !isToggling && setToggleModalOpen(false)}
        onConfirm={handleToggle}
        isLoading={isToggling}
        title={`${isActive ? 'Nonaktifkan' : 'Aktifkan'} Siswa`}
        message={`Apakah Anda yakin ingin ${actionText} siswa ini?`}
        confirmText="Ya, Lanjutkan"
      />
    </>
  );
}
