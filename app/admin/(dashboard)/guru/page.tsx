import { prisma } from "@/lib/prisma";
import { Card, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import TeacherFilters from "./teacher-filters";
import { RiEdit2Line, RiEyeLine, RiUser3Fill } from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";

export default async function AdminGuruPage(props: { searchParams: Promise<{ search?: string }> }) {
  const searchParams = await props.searchParams;
  const search = searchParams.search || "";

  const whereClause: any = {};
  if (search) {
    whereClause.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
      { nik: { contains: search } },
    ];
  }

  const data = await prisma.teacher.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Manajemen Tenaga Pendidik</h1>
          <p className="text-gray-600 font-medium">Kelola profil, riwayat pendidikan, dan kontak guru PAUD Mentari.</p>
        </div>
      </div>

      {/* Filters & Actions */}
      <TeacherFilters />

      {/* Main Table Card */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-0 rounded-2xl overflow-hidden ring-1 ring-gray-200">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[800px]">
            <TableHead className="bg-gray-50/80 border-b border-gray-200">
              <TableRow>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Nama Guru</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Nomor Identitas</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Pendidikan Terakhir</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Nomor Telepon</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-right text-sm">Aksi</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-12">
                    Belum ada data guru yang sesuai.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* 1. Nama Guru (Foto Kecil + Nama Depan) */}
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center border border-gray-200">
                          {item.image ? (
                            <Image 
                              src={item.image} 
                              alt={`Foto ${item.firstName}`} 
                              width={40} 
                              height={40} 
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <RiUser3Fill className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-gray-900 font-bold text-base capitalize">{item.firstName}</p>
                          <span className="text-xs text-gray-500">{item.employmentStatus}</span>
                        </div>
                      </div>
                    </TableCell>
                    
                    {/* 2. NIP/NIK/NUPTK */}
                    <TableCell className="py-4 px-6">
                      <div className="flex flex-col gap-0.5">
                        {item.nip && <span className="text-sm font-medium text-gray-900">NIP: {item.nip}</span>}
                        {item.nuptk && <span className="text-xs text-gray-600">NUPTK: {item.nuptk}</span>}
                        <span className="text-xs text-gray-500">NIK: {item.nik}</span>
                      </div>
                    </TableCell>

                    {/* 3. Pendidikan Terakhir */}
                    <TableCell className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        {item.lastEducation || "-"}
                      </span>
                    </TableCell>

                    {/* 4. Nomor Telepon */}
                    <TableCell className="py-4 px-6 text-gray-700 font-medium">
                      {item.phone || "-"}
                    </TableCell>

                    {/* 5. Aksi: Edit & Detail */}
                    <TableCell className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/guru/${item.id}`}
                          className="p-2 text-gray-400 hover:text-brand-orange hover:bg-brand-orange/10 rounded-lg transition-colors"
                          title="Lihat Detail"
                        >
                          <RiEyeLine className="w-5 h-5" />
                        </Link>
                        <Link 
                          href={`/admin/guru/${item.id}/edit`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Guru"
                        >
                          <RiEdit2Line className="w-5 h-5" />
                        </Link>
                      </div>
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
