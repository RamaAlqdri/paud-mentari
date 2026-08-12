import { Metadata } from "next";
import ArticleForm from "./article-form";
import Link from "next/link";
import { RiArrowLeftSLine } from "@remixicon/react";

export const metadata: Metadata = {
  title: "Tambah Artikel | Admin PAUD Mentari",
  description: "Formulir penambahan artikel atau pengumuman baru",
};

export default function CreateArticlePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb / Back Navigation */}
      <div>
        <Link 
          href="/admin/artikel"
          className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-brand-orange transition-colors"
        >
          <RiArrowLeftSLine className="w-5 h-5 mr-1" />
          Kembali ke Manajemen Artikel
        </Link>
      </div>

      <div className="py-4">
        <ArticleForm />
      </div>
    </div>
  );
}
