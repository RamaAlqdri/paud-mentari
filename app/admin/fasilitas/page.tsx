import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
            <CardHeader className="pb-3">
              <CardTitle>Daftar Fasilitas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Nama Fasilitas</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead className="w-[100px] text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
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
                              <Button type="submit" variant="destructive" size="sm">Hapus</Button>
                            </form>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Tambah Fasilitas Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={createFasilitas} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nama Fasilitas</label>
                  <Input name="title" required placeholder="Contoh: Ruang Musik" />
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
