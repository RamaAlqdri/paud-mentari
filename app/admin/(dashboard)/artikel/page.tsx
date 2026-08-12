import { prisma } from "@/lib/prisma";
import { Card, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import ArticleFilters from "./article-filters";
import ArticleActions from "./article-actions";

export default async function AdminArtikelPage(props: { searchParams: Promise<{ search?: string, category?: string }> }) {
  const searchParams = await props.searchParams;
  const search = searchParams.search || "";
  const category = searchParams.category || "";

  const whereClause: any = {};
  if (search) {
    whereClause.title = { contains: search, mode: "insensitive" };
  }
  if (category && category !== "all") {
    whereClause.category = category;
  }

  const data = await prisma.article.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Manajemen Artikel</h1>
          <p className="text-gray-600 font-medium">Kelola publikasi berita, kegiatan, dan pengumuman sekolah.</p>
        </div>
      </div>

      {/* Filters & Actions */}
      <ArticleFilters />

      {/* Main Table Card */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-0 rounded-2xl overflow-hidden ring-1 ring-gray-200">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[800px]">
            <TableHead className="bg-gray-50/80 border-b border-gray-200">
              <TableRow>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Judul Artikel</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Kategori</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Tanggal Publish</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-right text-sm">Aksi</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500 py-12">
                    Belum ada data artikel.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="py-4 px-6">
                      <p className="text-gray-900 font-bold text-base">{item.title}</p>
                      <p className="text-sm text-gray-500 mt-1 max-w-xs truncate">{item.excerpt}</p>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize ${
                        item.category?.toLowerCase() === "pengumuman" ? "bg-red-100 text-red-800" :
                        item.category?.toLowerCase() === "akademik" ? "bg-blue-100 text-blue-800" :
                        item.category?.toLowerCase() === "kegiatan" ? "bg-emerald-100 text-emerald-800" :
                        "bg-amber-100 text-amber-800"
                      }`}>
                        {item.category || "Umum"}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700 font-medium whitespace-nowrap">
                      {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <ArticleActions id={item.id} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
