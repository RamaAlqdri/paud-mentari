import { prisma } from "@/lib/prisma";
import { Card, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import StudentFilters from "./student-filters";
import { RiEdit2Line, RiEyeLine, RiUser3Fill } from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";

export default async function AdminSiswaPage(props: { searchParams: Promise<{ search?: string, status?: string, gender?: string, year?: string }> }) {
  const searchParams = await props.searchParams;
  const search = searchParams.search || "";
  const status = searchParams.status || "";
  const gender = searchParams.gender || "";
  const year = searchParams.year || "";

  const whereClause: any = {};
  
  if (search) {
    whereClause.OR = [
      { childName: { contains: search, mode: "insensitive" } },
      { nik: { contains: search } },
      { parentName: { contains: search, mode: "insensitive" } },
    ];
  }
  
  if (status === "aktif") {
    whereClause.isActive = true;
  } else if (status === "nonaktif") {
    whereClause.isActive = false;
  }

  if (gender === "Laki-laki") {
    whereClause.gender = "L";
  } else if (gender === "Perempuan") {
    whereClause.gender = "P";
  }

  if (year) {
    const yearInt = parseInt(year);
    whereClause.createdAt = {
      gte: new Date(`${yearInt}-01-01T00:00:00.000Z`),
      lt: new Date(`${yearInt + 1}-01-01T00:00:00.000Z`)
    };
  }

  const data = await prisma.student.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Manajemen Siswa</h1>
          <p className="text-gray-600 font-medium">Daftar siswa yang telah diterima melalui PPDB.</p>
        </div>
      </div>

      {/* Filters */}
      <StudentFilters />

      {/* Main Table Card */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-0 rounded-2xl overflow-hidden ring-1 ring-gray-200">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1000px]">
            <TableHead className="bg-gray-50/80 border-b border-gray-200">
              <TableRow>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Nama Siswa</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">NIK</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Nama Orang Tua</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Nomor Telepon</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Tahun Masuk</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Status</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-right text-sm">Aksi</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-12">
                    Belum ada data siswa yang sesuai.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* 1. Nama (Foto + Nama) */}
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center border border-gray-200">
                          {item.image ? (
                            <Image 
                              src={item.image} 
                              alt={`Foto ${item.childName}`} 
                              width={40} 
                              height={40} 
                              className={`object-cover w-full h-full ${!item.isActive ? 'grayscale opacity-75' : ''}`}
                            />
                          ) : (
                            <RiUser3Fill className={`w-5 h-5 text-gray-400 ${!item.isActive ? 'opacity-50' : ''}`} />
                          )}
                        </div>
                        <div>
                          <p className={`font-bold text-base capitalize ${item.isActive ? 'text-gray-900' : 'text-gray-500 line-through'}`}>
                            {item.childName}
                          </p>
                          <span className="text-xs text-gray-500">{item.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* 2. NIK */}
                    <TableCell className="py-4 px-6 text-sm text-gray-700">
                      {item.nik}
                    </TableCell>

                    {/* 3. Nama Orang Tua */}
                    <TableCell className="py-4 px-6 text-sm text-gray-700">
                      {item.parentName}
                    </TableCell>

                    {/* 4. Nomor Telepon */}
                    <TableCell className="py-4 px-6 text-sm text-gray-700">
                      {item.phone}
                    </TableCell>

                    {/* 5. Tahun Masuk */}
                    <TableCell className="py-4 px-6 text-sm font-medium text-gray-900">
                      {new Date(item.createdAt).getFullYear()}
                    </TableCell>

                    {/* 6. Status Aktif/Nonaktif */}
                    <TableCell className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        item.isActive ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {item.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </TableCell>

                    {/* 7. Aksi (Edit & Detail) */}
                    <TableCell className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/siswa/${item.id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Lihat Detail"
                        >
                          <RiEyeLine className="w-5 h-5" />
                        </Link>
                        <Link 
                          href={`/admin/siswa/${item.id}/edit`}
                          className="p-2 text-gray-400 hover:text-brand-orange hover:bg-orange-50 rounded-lg transition-colors"
                          title="Edit Data"
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
