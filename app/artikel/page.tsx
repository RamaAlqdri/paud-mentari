import { Metadata } from "next";
import { Card, Button, Badge } from "@tremor/react";
import Link from "next/link";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { RiArrowRightLine } from "@remixicon/react";

export const metadata: Metadata = {
  title: "Artikel & Berita | PAUD Mentari",
  description: "Kumpulan artikel dan berita terbaru dari PAUD Mentari",
};

import { prisma } from "@/lib/prisma";

export default async function ArtikelPage() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen bg-white pt-24">
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8 md:py-16">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-orange mb-4">Artikel & Wawasan</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Tips parenting, perkembangan anak usia dini, dan cerita menarik dari kegiatan sehari-hari di PAUD Mentari.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">Belum ada artikel yang dipublikasikan.</p>
          ) : (
            articles.map((article, index) => {
              const isFeatured = index === 0;
              
              // Menambahkan variasi warna badge kategori secara otomatis
              const badgeColors = [
                "bg-brand-orange/20 text-brand-orange",
                "bg-brand-blue/20 text-brand-blue",
                "bg-brand-pink/20 text-brand-pink",
              ];
              const badgeColor = badgeColors[index % 3];
              const categoryName = article.category;
              
              if (isFeatured) {
                return (
                  <Card key={article.id} className="col-span-1 md:col-span-2 p-0 rounded-[1.5rem] border border-gray-200 overflow-hidden shadow-sm hover:border-gray-300 transition-colors group flex flex-col md:flex-row">
                    <div className="h-64 md:h-auto md:w-1/2 overflow-hidden bg-gray-100">
                      {article.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={article.title} src={article.thumbnail} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">Thumbnail</div>
                      )}
                    </div>
                    <div className="p-8 flex flex-col justify-center md:w-1/2">
                      <div className="mb-4 flex items-center gap-2">
                        <Badge className={`font-semibold text-xs px-3 py-1 rounded-full ${badgeColor}`}>
                          {categoryName}
                        </Badge>
                        <span className="text-xs text-gray-500 font-medium">
                          {format(new Date(article.publishedAt || article.createdAt), "dd MMMM yyyy", { locale: localeID })}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                        <Link href={`/artikel/${article.slug}`} className="hover:text-brand-orange transition-colors">
                          {article.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="mt-auto">
                        <Link href={`/artikel/${article.slug}`}>
                          <Button variant="secondary" className="bg-gray-50 text-brand-orange border-none shadow-none font-semibold text-sm px-6 py-3 rounded-2xl hover:bg-gray-100 transition-colors gap-2">
                            Baca Selengkapnya
                            <RiArrowRightLine className="w-4 h-4 ml-1 inline-block" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              }

              return (
                <Card key={article.id} className="p-0 rounded-[1.5rem] border border-gray-200 overflow-hidden shadow-sm hover:border-gray-300 transition-colors group flex flex-col">
                  <div className="h-56 overflow-hidden bg-gray-100">
                    {article.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={article.title} src={article.thumbnail} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">Thumbnail</div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4 flex items-center gap-2">
                      <Badge className={`font-semibold text-xs px-3 py-1 rounded-full ${badgeColor}`}>
                        {categoryName}
                      </Badge>
                      <span className="text-xs text-gray-500 font-medium">
                        {format(new Date(article.publishedAt || article.createdAt), "dd MMMM yyyy", { locale: localeID })}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      <Link href={`/artikel/${article.slug}`} className="hover:text-brand-orange transition-colors">
                        {article.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-8 line-clamp-3 flex-grow leading-relaxed">
                      {article.excerpt}
                    </p>
                    <Link href={`/artikel/${article.slug}`} className="mt-auto self-start">
                      <Button variant="secondary" className="bg-gray-50 text-brand-orange border-none shadow-none font-semibold text-sm px-6 py-3 rounded-2xl hover:bg-gray-100 transition-colors gap-2">
                        Baca Selengkapnya
                        <RiArrowRightLine className="w-4 h-4 ml-1 inline-block" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
