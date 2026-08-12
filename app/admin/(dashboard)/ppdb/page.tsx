import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead as TableHeaderCell, TableHead, TableRow } from "@tremor/react";
import { Card } from "@tremor/react";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import StatusSelect from "./status-select";
import Link from "next/link";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

export default async function AdminPPDBPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const take = 10;
  const skip = (page - 1) * take;

  const [totalCount, pendaftar] = await Promise.all([
    prisma.pPDB.count(),
    prisma.pPDB.findMany({
      take,
      skip,
      orderBy: { createdAt: "desc" }
    })
  ]);

  const totalPages = Math.ceil(totalCount / take);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Data Pendaftar PPDB</h1>
      </div>

      <Card className="border-none shadow-sm p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold">Daftar Calon Peserta Didik Baru</h3>
        </div>
        <div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeaderCell>
                <TableRow className="bg-slate-50 border-b border-gray-200">
                  <TableHeaderCell className="w-[180px] font-semibold text-gray-700">Tgl. Daftar</TableHeaderCell>
                  <TableHeaderCell className="font-semibold text-gray-700">Nama Anak</TableHeaderCell>
                  <TableHeaderCell className="font-semibold text-gray-700">Wali</TableHeaderCell>
                  <TableHeaderCell className="font-semibold text-gray-700">Kontak</TableHeaderCell>
                  <TableHeaderCell className="w-[150px] font-semibold text-gray-700">Status</TableHeaderCell>
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
                    <TableRow key={p.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                      <TableCell className="text-slate-500">
                        {format(new Date(p.createdAt), "dd MMM yyyy, HH:mm", { locale: localeID })}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {p.childName}
                        <div className="text-xs text-slate-500 font-normal mt-1">NIK: {p.nik}</div>
                      </TableCell>
                      <TableCell className="text-gray-700">{p.parentName}</TableCell>
                      <TableCell className="text-gray-700">
                        {p.phone}
                        <div className="text-xs text-slate-500 mt-1">{p.email || "-"}</div>
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/30">
            <div className="text-sm text-gray-500 font-medium">
              Menampilkan <span className="font-bold text-gray-900">{skip + 1}</span> - <span className="font-bold text-gray-900">{Math.min(skip + take, totalCount)}</span> dari <span className="font-bold text-gray-900">{totalCount}</span> data
            </div>
            <div className="flex items-center gap-2">
              {page > 1 ? (
                <Link href={`/admin/ppdb?page=${page - 1}`} className="p-2 rounded-md border border-gray-200 bg-white text-gray-600 hover:text-brand-orange hover:border-brand-orange transition-colors">
                  <RiArrowLeftSLine className="w-5 h-5" />
                </Link>
              ) : (
                <button disabled className="p-2 rounded-md border border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed">
                  <RiArrowLeftSLine className="w-5 h-5" />
                </button>
              )}
              
              <span className="text-sm font-bold text-gray-700 px-4">
                Halaman {page} / {totalPages}
              </span>

              {page < totalPages ? (
                <Link href={`/admin/ppdb?page=${page + 1}`} className="p-2 rounded-md border border-gray-200 bg-white text-gray-600 hover:text-brand-orange hover:border-brand-orange transition-colors">
                  <RiArrowRightSLine className="w-5 h-5" />
                </Link>
              ) : (
                <button disabled className="p-2 rounded-md border border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed">
                  <RiArrowRightSLine className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
