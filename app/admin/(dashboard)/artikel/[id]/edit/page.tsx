import { Metadata } from "next";
import EditArticleForm from "./edit-article-form";
import Link from "next/link";
import { RiArrowLeftSLine } from "@remixicon/react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Artikel | Admin PAUD Mentari",
  description: "Formulir pengeditan artikel atau pengumuman",
};

export default async function EditArticlePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  const article = await prisma.article.findUnique({
    where: { id: params.id }
  });

  if (!article) {
    notFound();
  }

  const initialData = {
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    content: article.content,
    thumbnail: article.thumbnail,
  };

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
        <EditArticleForm id={article.id} initialData={initialData} />
      </div>
    </div>
  );
}
