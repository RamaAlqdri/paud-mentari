import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead as TableHeaderCell, TableHead, TableRow } from "@tremor/react";
import { Card } from "@tremor/react";
import { Button } from "@tremor/react";
import { TextInput } from "@tremor/react";
import { createArtikel, deleteArtikel } from "@/actions/admin-crud";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";

export default async function AdminArtikelPage() {
  const data = await prisma.article.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Artikel & Berita</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm">
            <div className="mb-4 pb-3">
              <h3 className="text-xl font-semibold">Daftar Publikasi</h3>
            </div>
            <div>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeaderCell>
                    <TableRow className="bg-slate-50">
                      <TableHeaderCell>Judul Artikel</TableHeaderCell>
                      <TableHeaderCell>Tgl. Terbit</TableHeaderCell>
                      <TableHeaderCell className="w-[100px] text-right">Aksi</TableHeaderCell>
                    </TableRow>
                  </TableHeaderCell>
                  <TableBody>
                    {data.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground h-24">Belum ada artikel.</TableCell>
                      </TableRow>
                    ) : (
                      data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.title}
                            <div className="text-xs text-slate-500 font-normal mt-1">{item.slug}</div>
                          </TableCell>
                          <TableCell className="text-sm text-slate-500 whitespace-nowrap">
                            {format(new Date(item.createdAt), "dd MMM yyyy", { locale: localeID })}
                          </TableCell>
                          <TableCell className="text-right">
                            <form action={async () => {
                              "use server";
                              await deleteArtikel(item.id);
                            }}>
                              <Button type="submit" variant="secondary" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700" size="sm">Hapus</Button>
                            </form>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="border-none shadow-sm">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Tulis Artikel Baru</h3>
            </div>
            <div>
              <form action={async (fd) => { await createArtikel(fd); }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Judul</label>
                  <TextInput name="title" required placeholder="Contoh: Kegiatan Porseni 2026" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ringkasan (Excerpt)</label>
                  <textarea 
                    name="excerpt" 
                    required 
                    rows={2}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Kalimat singkat pemancing minat..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Konten Penuh</label>
                  <textarea 
                    name="content" 
                    required 
                    rows={8}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Isi artikel..."
                  />
                </div>
                <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">Terbitkan</Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
