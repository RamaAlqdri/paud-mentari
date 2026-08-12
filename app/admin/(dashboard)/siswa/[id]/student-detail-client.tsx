"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toggleSiswaStatus } from "@/actions/admin-crud";
import { RiEdit2Line, RiProhibitedLine, RiCheckLine } from "@remixicon/react";
import { ConfirmationModal } from "@/components/confirmation-modal";

export default function StudentDetailClient({ studentId, isActive }: { studentId: string, isActive: boolean }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleStatus = async () => {
    setIsUpdating(true);
    try {
      const result = await toggleSiswaStatus(studentId, isActive);
      if (result.success) {
        setIsModalOpen(false);
        router.refresh();
      } else {
        alert(result.message || "Terjadi kesalahan.");
        setIsUpdating(false);
      }
    } catch (error) {
      alert("Terjadi kesalahan internal.");
      setIsUpdating(false);
    }
  };

  return (
    <>
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleToggleStatus}
        title={isActive ? "Nonaktifkan Siswa?" : "Aktifkan Siswa?"}
        message={isActive 
          ? "Siswa ini akan dicoret dari daftar siswa aktif." 
          : "Siswa ini akan kembali terdaftar sebagai siswa aktif."}
        confirmText={isActive ? "Ya, Nonaktifkan" : "Ya, Aktifkan"}
        isLoading={isUpdating}
      />
      
      <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
        <button 
          onClick={() => router.push(`/admin/siswa/${studentId}/edit`)}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-brand-orange text-white font-semibold text-sm hover:bg-brand-orange/90 transition-colors shadow-sm"
        >
          <RiEdit2Line className="w-4 h-4" />
          Edit Data
        </button>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          disabled={isUpdating}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border font-semibold text-sm transition-colors ${
            isActive 
              ? "border-red-600 text-red-600 hover:bg-red-50" 
              : "border-emerald-600 text-emerald-600 hover:bg-emerald-50"
          }`}
        >
          {isUpdating ? (
            <span>Memproses...</span>
          ) : isActive ? (
            <>
              <RiProhibitedLine className="w-4 h-4" />
              Nonaktifkan
            </>
          ) : (
            <>
              <RiCheckLine className="w-4 h-4" />
              Aktifkan
            </>
          )}
        </button>
      </div>
    </>
  );
}
