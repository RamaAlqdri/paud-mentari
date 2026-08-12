import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead as TableHeaderCell, TableHead, TableRow } from "@tremor/react";
import { Card } from "@tremor/react";
import { Button } from "@tremor/react";
import { TextInput } from "@tremor/react";
import { createGuru, deleteGuru } from "@/actions/admin-crud";

export default async function AdminGuruPage() {
  const data = await prisma.teacher.findMany();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Tenaga Pendidik</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm">
            <div className="mb-4 pb-3">
              <h3 className="text-xl font-semibold">Daftar Guru</h3>
            </div>
            <div>
              <div className="rounded-md border">
                <Table>
                  <TableHeaderCell>
                    <TableRow className="bg-slate-50">
                      <TableHeaderCell>Nama Guru</TableHeaderCell>
                      <TableHeaderCell>Jabatan</TableHeaderCell>
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
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-sm text-slate-500">{item.position}</TableCell>
                          <TableCell className="text-right">
                            <form action={async () => {
                              "use server";
                              await deleteGuru(item.id);
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
              <h3 className="text-xl font-semibold">Tambah Guru Baru</h3>
            </div>
            <div>
              <form action={async (fd) => { await createGuru(fd); }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nama Lengkap</label>
                  <TextInput name="name" required placeholder="Contoh: Siti Aminah, S.Pd" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Jabatan</label>
                  <TextInput name="position" required placeholder="Contoh: Guru Kelas A" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Biografi Singkat</label>
                  <textarea 
                    name="bio" 
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
