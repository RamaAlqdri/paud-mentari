import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Konfigurasi Dynamic SEO (Metadata)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug }
  });

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | PAUD Mentari",
      description: "Artikel yang Anda cari tidak tersedia."
    };
  }

  return {
    title: `${article.title} | PAUD Mentari`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt ? article.publishedAt.toISOString() : undefined,
    }
  };
}

export default async function ArtikelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug }
  });

  if (!article) {
    notFound();
  }

  return (
    <div className="py-16 md:py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl mx-auto">
        <Link href="/artikel" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-orange transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Artikel
        </Link>
        
        <article className="space-y-8">
          <header className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 pb-8 border-b">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(article.createdAt), "dd MMMM yyyy", { locale: localeID })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span>Admin PAUD Mentari</span>
              </div>
            </div>
          </header>
          
          <div className="h-64 sm:h-80 w-full bg-slate-100 rounded-2xl flex items-center justify-center mb-10 overflow-hidden shadow-sm">
             <span className="text-muted-foreground">Thumbnail (Opsional)</span>
          </div>

          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-a:text-brand-blue prose-img:rounded-xl">
            {/* 
              Di skenario nyata, kita akan memakai parser HTML atau Markdown.
              Karena input masih berupa plaintext/textarea sederhana, kita gunakan whitespace-pre-wrap 
            */}
            <div className="whitespace-pre-wrap leading-relaxed text-slate-700">
              {article.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
