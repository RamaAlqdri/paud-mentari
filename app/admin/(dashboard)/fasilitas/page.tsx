import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead as TableHeaderCell, TableHead, TableRow } from "@tremor/react";
import { Card } from "@tremor/react";
import { Button } from "@tremor/react";
import { TextInput } from "@tremor/react";
import { createFasilitas, deleteFasilitas } from "@/actions/admin-crud";

export default async function AdminFasilitasPage() {
  const data = await prisma.facility.findMany();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Fasilitas</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm">
            <div className="mb-4 pb-3">
              <h3 className="text-xl font-semibold">Daftar Fasilitas</h3>
            </div>
            <div>
              <div className="rounded-md border">
                <Table>
                  <TableHeaderCell>
                    <TableRow className="bg-slate-50">
                      <TableHeaderCell>Nama Fasilitas</TableHeaderCell>
                      <TableHeaderCell>Deskripsi</TableHeaderCell>
                      <TableHeaderCell className="w-[100px] text-right">Aksi</TableHeaderCell>
                    </TableRow>
                  </TableHeaderCell>
                  <TableBody>
                    {data.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">Belum ada data.</TableCell>
                      </TableRow>
                    ) : (
                      data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell className="text-sm text-slate-500">{item.description}</TableCell>
                          <TableCell className="text-right">
                            <form action={async () => {
                              "use server";
                              await deleteFasilitas(item.id);
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
              <h3 className="text-xl font-semibold">Tambah Fasilitas Baru</h3>
            </div>
            <div>
              <form action={async (fd) => { await createFasilitas(fd); }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nama Fasilitas</label>
                  <TextInput name="title" required placeholder="Contoh: Ruang Musik" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deskripsi</label>
                  <textarea 
                    name="description" 
                    required 
                    rows={3}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
                <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">Simpan Data</Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
