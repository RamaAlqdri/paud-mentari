"use client";

import { useState } from "react";
import { updatePPDBStatus } from "@/actions/admin-ppdb";
import { useRouter } from "next/navigation";
import { RiDownload2Line, RiCloseLine, RiCheckLine } from "@remixicon/react";
import { ConfirmationModal } from "@/components/confirmation-modal";

interface PPDBDetailActionsProps {
  id: string;
  currentStatus: "MENUNGGU" | "DITERIMA" | "DITOLAK";
}

export default function PPDBDetailActions({ id, currentStatus }: PPDBDetailActionsProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"DITERIMA" | "DITOLAK" | null>(null);

  const handleOpenModal = (type: "DITERIMA" | "DITOLAK") => {
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!actionType || currentStatus === actionType) return;

    setIsUpdating(true);
    const res = await updatePPDBStatus(id, actionType);
    
    if (res.success) {
      router.refresh();
    } else {
      alert(res.message);
    }
    
    setIsUpdating(false);
    setIsModalOpen(false);
    setActionType(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <button 
          onClick={handlePrint}
          className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
        >
          <RiDownload2Line className="w-4 h-4" />
          Unduh PDF
        </button>

        {currentStatus !== "DITOLAK" && (
          <button 
            onClick={() => handleOpenModal("DITOLAK")}
            disabled={isUpdating}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold text-sm flex items-center gap-2 hover:bg-red-700 transition-all shadow-sm disabled:opacity-50"
          >
            <RiCloseLine className="w-4 h-4" />
            Tolak
          </button>
        )}

        {currentStatus !== "DITERIMA" && (
          <button 
            onClick={() => handleOpenModal("DITERIMA")}
            disabled={isUpdating}
            className="px-4 py-2 rounded-lg bg-teal-600 text-white font-semibold text-sm flex items-center gap-2 hover:bg-teal-700 transition-all shadow-sm disabled:opacity-50"
          >
            <RiCheckLine className="w-4 h-4" />
            Terima
          </button>
        )}
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => !isUpdating && setIsModalOpen(false)}
        onConfirm={handleConfirm}
        isLoading={isUpdating}
        title="Konfirmasi Tindakan"
        message={`Apakah Anda yakin ingin memproses pendaftaran ini menjadi status ${actionType === "DITERIMA" ? "Diterima" : "Ditolak"}? Tindakan ini akan mengubah status pendaftar di sistem.`}
      />
    </>
  );
}
