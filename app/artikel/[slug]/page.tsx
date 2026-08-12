import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { RiArrowLeftLine, RiShareForwardLine } from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";

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

  const relatedArticles = await prisma.article.findMany({
    where: {
      slug: { not: slug }
    },
    take: 3,
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 pt-24 md:pt-32 min-h-screen">
      {/* Back Button */}
      <Link 
        href="/artikel" 
        className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-orange font-semibold text-sm mb-8 transition-colors group"
      >
        <RiArrowLeftLine className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Artikel
      </Link>

      {/* Page Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* Article Core (8 columns) */}
        <article className="lg:col-span-8">
          
          {/* Article Header */}
          <header className="mb-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-brand-orange/10 text-brand-orange font-semibold text-xs px-3 py-1 rounded-full">
                {article.category || "Umum"}
              </span>
              <span className="text-gray-500 font-medium text-xs">
                {format(new Date(article.createdAt), "dd MMMM yyyy", { locale: localeID })}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {article.title}
            </h1>
          </header>

          {/* Hero Image */}
          <figure className="mb-8 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            {article.thumbnail ? (
              <Image 
                src={article.thumbnail}
                alt={article.title}
                width={800}
                height={400}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            ) : (
              <div className="w-full h-[300px] md:h-[400px] bg-slate-100 flex items-center justify-center">
                <span className="text-slate-400 font-medium">Gambar Tidak Tersedia</span>
              </div>
            )}
          </figure>

          {/* Article Body */}
          <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap font-medium">
            {article.content}
          </div>

          {/* Share */}
          <div className="mt-12 pt-6 border-t border-gray-200 flex justify-end">
            <button className="flex items-center gap-2 text-brand-orange font-semibold text-sm hover:bg-orange-50 px-4 py-2 rounded-full transition-colors border border-transparent hover:border-brand-orange/20">
              <RiShareForwardLine className="w-4 h-4" />
              Bagikan Artikel
            </button>
          </div>
        </article>

        {/* Sidebar (4 columns) */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">
              Artikel Lainnya
            </h3>
            
            <div className="flex flex-col gap-6">
              {relatedArticles.length > 0 ? (
                relatedArticles.map((related) => (
                  <Link 
                    key={related.id} 
                    href={`/artikel/${related.slug}`}
                    className="group flex gap-4 items-start hover:bg-gray-50 p-2 -mx-2 rounded-xl transition-colors"
                  >
                    <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-gray-100">
                      {related.thumbnail ? (
                        <Image 
                          src={related.thumbnail} 
                          alt={related.title}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[10px] text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-brand-orange transition-colors line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">
                        {format(new Date(related.createdAt), "dd MMM yyyy", { locale: localeID })}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-gray-500">Belum ada artikel lain.</p>
              )}
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}
