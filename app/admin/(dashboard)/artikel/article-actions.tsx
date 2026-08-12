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
          className="p-2 text-gray-500 hover:text-brand-orange hover:bg-brand-yellow/20 rounded-lg transition-colors"
          title="Edit Artikel"
        >
          <RiEdit2Line className="w-5 h-5" />
        </Link>
        <button 
          onClick={() => setIsModalOpen(true)}
          disabled={isDeleting}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          title="Hapus Artikel"
        >
          <RiDeleteBinLine className="w-5 h-5" />
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
