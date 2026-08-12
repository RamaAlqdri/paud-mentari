import { prisma } from "@/lib/prisma";
import { Card, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge } from "@tremor/react";
import { RiArrowLeftSLine, RiArrowRightSLine, RiEyeLine } from "@remixicon/react";
import Link from "next/link";
import PPDBFilters from "./ppdb-filters";

export default async function AdminPPDBPage(props: { searchParams: Promise<{ page?: string, search?: string, status?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const take = 10;
  const skip = (page - 1) * take;

  const search = searchParams.search || "";
  const status = searchParams.status?.toUpperCase() as any;

  const whereClause: any = {};
  if (search) {
    whereClause.OR = [
      { childName: { contains: search, mode: "insensitive" } },
      { nik: { contains: search } }
    ];
  }
  if (status && status !== "ALL") {
    whereClause.status = status;
  }

  const [totalCount, pendaftar] = await Promise.all([
    prisma.pPDB.count({ where: whereClause }),
    prisma.pPDB.findMany({
      where: whereClause,
      take,
      skip,
      orderBy: { createdAt: "desc" }
    })
  ]);

  const totalPages = Math.ceil(totalCount / take);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Data Pendaftar PPDB</h1>
          <p className="text-gray-600 font-medium">Kelola dan pantau status pendaftaran calon siswa PAUD Mentari.</p>
        </div>
        
        {/* Search & Filter */}
        <PPDBFilters />
      </div>

      {/* Main Table Card */}
      <Card className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[900px]">
            <TableHead>
              <TableRow className="bg-gray-50/50">
                <TableHeaderCell className="font-bold text-gray-700">Nama Anak</TableHeaderCell>
                <TableHeaderCell className="font-bold text-gray-700">Tanggal Daftar</TableHeaderCell>
                <TableHeaderCell className="font-bold text-gray-700">Orang Tua</TableHeaderCell>
                <TableHeaderCell className="font-bold text-gray-700">Kontak</TableHeaderCell>
                <TableHeaderCell className="font-bold text-gray-700">Status</TableHeaderCell>
                <TableHeaderCell className="font-bold text-gray-700 text-right">Aksi</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendaftar.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-12 font-medium">
                    Belum ada data pendaftar.
                  </TableCell>
                </TableRow>
              ) : (
                pendaftar.map((ppdb) => (
                  <TableRow key={ppdb.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none">
                    <TableCell className="font-semibold text-gray-900">
                      {ppdb.childName}
                      <span className="block text-xs font-normal text-gray-500 mt-0.5">NIK: {ppdb.nik}</span>
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium">
                      {new Date(ppdb.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium">{ppdb.parentName}</TableCell>
                    <TableCell className="text-gray-600 font-medium">
                      {ppdb.phone}
                      <div className="text-xs text-gray-500 mt-0.5">{ppdb.email || "-"}</div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        color={
                          ppdb.status === "MENUNGGU" ? "amber" :
                          ppdb.status === "DITERIMA" ? "emerald" : "red"
                        }
                        className="capitalize px-3 py-1"
                      >
                        {ppdb.status === "MENUNGGU" ? "Menunggu Verifikasi" : ppdb.status.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/ppdb/${ppdb.id}`}
                          className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200 shadow-sm"
                          title="Lihat Detail"
                        >
                          <RiEyeLine className="w-4 h-4" />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/30">
            <div className="text-sm text-gray-500 font-medium">
              Menampilkan <span className="font-bold text-gray-900">{skip + 1}</span> hingga <span className="font-bold text-gray-900">{Math.min(skip + take, totalCount)}</span> dari <span className="font-bold text-gray-900">{totalCount}</span> pendaftar
            </div>
            <div className="flex items-center gap-2">
              {page > 1 ? (
                <Link href={`/admin/ppdb?page=${page - 1}`} className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-600">
                  <RiArrowLeftSLine className="w-5 h-5" />
                </Link>
              ) : (
                <button disabled className="p-2 rounded-lg text-gray-300 cursor-not-allowed">
                  <RiArrowLeftSLine className="w-5 h-5" />
                </button>
              )}
              
              {page < totalPages ? (
                <Link href={`/admin/ppdb?page=${page + 1}`} className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-600">
                  <RiArrowRightSLine className="w-5 h-5" />
                </Link>
              ) : (
                <button disabled className="p-2 rounded-lg text-gray-300 cursor-not-allowed">
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
