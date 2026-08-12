"use client";

import { useState } from "react";
import { deleteArtikel } from "@/actions/admin-crud";
import { useRouter } from "next/navigation";
import { RiEdit2Line, RiDeleteBinLine } from "@remixicon/react";
import Link from "next/link";
import { ConfirmationModal } from "@/components/confirmation-modal";

interface ArticleActionsProps {
  id: string;
}

export default function ArticleActions({ id }: ArticleActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteArtikel(id);
    
    if (res.success) {
      router.refresh();
    } else {
      alert(res.message);
    }
    
    setIsDeleting(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <Link 
          href={`/admin/artikel/${id}/edit`}
          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 shadow-sm"
          title="Edit Artikel"
        >
          <RiEdit2Line className="w-4 h-4" />
        </Link>
        <button 
          onClick={() => setIsModalOpen(true)}
          disabled={isDeleting}
          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 shadow-sm disabled:opacity-50"
          title="Hapus Artikel"
        >
          <RiDeleteBinLine className="w-4 h-4" />
        </button>
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => !isDeleting && setIsModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Hapus Artikel"
        message="Apakah Anda yakin ingin menghapus artikel ini? Data yang sudah dihapus tidak dapat dikembalikan."
        confirmText="Ya, Hapus"
        cancelText="Batal"
      />
    </>
  );
}
