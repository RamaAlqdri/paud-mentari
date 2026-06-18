import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Artikel & Berita | PAUD Mentari",
  description: "Kumpulan artikel dan berita terbaru dari PAUD Mentari",
};

export default async function ArtikelPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="py-16 md:py-24 bg-slate-50 min-h-screen">
      <div className="container px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Artikel & Berita</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ikuti informasi terkini, tips pengasuhan anak, dan berita kegiatan seru di PAUD Mentari.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">Belum ada artikel yang dipublikasikan.</p>
          ) : (
            articles.map((article) => (
              <Card key={article.id} className="border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden flex flex-col h-full">
                <div className="h-48 bg-slate-200 w-full relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <span className="text-muted-foreground font-medium text-sm">Thumbnail Artikel</span>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-xs text-muted-foreground mb-3 gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{format(new Date(article.createdAt), "dd MMMM yyyy", { locale: localeID })}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 line-clamp-2 text-slate-800 group-hover:text-brand-orange transition-colors">
                    <Link href={`/artikel/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                    {article.excerpt}
                  </p>
                  <Link href={`/artikel/${article.slug}`} className="inline-flex items-center text-sm font-semibold text-brand-blue hover:text-brand-orange transition-colors mt-auto">
                    Baca Selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
