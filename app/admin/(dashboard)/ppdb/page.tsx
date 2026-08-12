import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead as TableHeaderCell, TableHead, TableRow } from "@tremor/react";
import { Card } from "@tremor/react";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import StatusSelect from "./status-select";

export default async function AdminPPDBPage() {
  const pendaftar = await prisma.pPDB.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Data Pendaftar PPDB</h1>
      </div>

      <Card className="border-none shadow-sm">
        <div className="mb-4 pb-3">
          <h3 className="text-xl font-semibold">Daftar Calon Peserta Didik Baru</h3>
        </div>
        <div>
          <div className="rounded-md border">
            <Table>
              <TableHeaderCell>
                <TableRow className="bg-slate-50">
                  <TableHeaderCell className="w-[180px]">Tgl. Daftar</TableHeaderCell>
                  <TableHeaderCell>Nama Anak</TableHeaderCell>
                  <TableHeaderCell>Wali</TableHeaderCell>
                  <TableHeaderCell>Kontak</TableHeaderCell>
                  <TableHeaderCell className="w-[150px]">Status</TableHeaderCell>
                </TableRow>
              </TableHeaderCell>
              <TableBody>
                {pendaftar.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                      Belum ada data pendaftar.
                    </TableCell>
                  </TableRow>
                ) : (
                  pendaftar.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-slate-500">
                        {format(new Date(p.createdAt), "dd MMM yyyy, HH:mm", { locale: localeID })}
                      </TableCell>
                      <TableCell className="font-medium">
                        {p.childName}
                        <div className="text-xs text-slate-500 font-normal">NIK: {p.nik}</div>
                      </TableCell>
                      <TableCell>{p.parentName}</TableCell>
                      <TableCell>
                        {p.phone}
                        <div className="text-xs text-slate-500">{p.email || "-"}</div>
                      </TableCell>
                      <TableCell>
                        <StatusSelect id={p.id} currentStatus={p.status} />
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
  );
}
