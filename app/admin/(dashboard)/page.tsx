import { Card, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge, Button } from "@tremor/react";
import { RiTeamLine, RiBookOpenLine, RiTimeLine, RiCheckboxCircleLine, RiArrowRightLine, RiEyeLine } from "@remixicon/react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  // Ambil stat dari database
  const ppdbMenunggu = await prisma.pPDB.count({ where: { status: "MENUNGGU" } });
  const ppdbDiterima = await prisma.pPDB.count({ where: { status: "DITERIMA" } });
  const totalGuru = await prisma.teacher.count();
  const totalProgram = await prisma.program.count();
  
  const recentPPDB = await prisma.pPDB.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  const stats = [
    { title: "Pendaftar Baru", value: ppdbMenunggu.toString(), icon: RiTimeLine, color: "text-amber-500", bg: "bg-amber-100", subtext: `${ppdbMenunggu} menunggu verifikasi` },
    { title: "Siswa Diterima", value: ppdbDiterima.toString(), icon: RiCheckboxCircleLine, color: "text-emerald-500", bg: "bg-emerald-100", subtext: "Telah diverifikasi" },
    { title: "Tenaga Pendidik", value: totalGuru.toString(), icon: RiTeamLine, color: "text-blue-500", bg: "bg-blue-100", subtext: "Guru & Staff" },
    { title: "Program Tersedia", value: totalProgram.toString(), icon: RiBookOpenLine, color: "text-purple-500", bg: "bg-purple-100", subtext: "Kelas Aktif" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <Card className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden flex items-center justify-between">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Selamat Datang di Dashboard Admin</h2>
          <p className="text-gray-600 text-base font-medium">Kelola data pendaftaran PPDB, artikel terbaru, dan pantau aktivitas sistem PAUD Mentari dari satu tempat.</p>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      </Card>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">{stat.title}</span>
              <div className={`w-10 h-10 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-4xl font-extrabold text-gray-900">{stat.value}</div>
            <div className="text-xs font-semibold text-gray-500 flex items-center gap-1">
              {stat.subtext}
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section */}
      <Card className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-0">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-gray-900">Pendaftar PPDB Terbaru</h3>
          <Link href="/admin/ppdb" className="text-sm font-bold text-brand-orange hover:underline flex items-center gap-1">
            Lihat Semua
            <RiArrowRightLine className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50/50">
                <TableHeaderCell className="font-bold text-gray-700">Nama Anak</TableHeaderCell>
                <TableHeaderCell className="font-bold text-gray-700">Tanggal Daftar</TableHeaderCell>
                <TableHeaderCell className="font-bold text-gray-700">Orang Tua</TableHeaderCell>
                <TableHeaderCell className="font-bold text-gray-700">Status</TableHeaderCell>
                <TableHeaderCell className="font-bold text-gray-700 text-right">Aksi</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPPDB.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-8 font-medium">
                    Belum ada data pendaftar.
                  </TableCell>
                </TableRow>
              ) : (
                recentPPDB.map((ppdb) => (
                  <TableRow key={ppdb.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-semibold text-gray-900">{ppdb.childName}</TableCell>
                    <TableCell className="text-gray-600 font-medium">
                      {new Date(ppdb.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium">{ppdb.parentName}</TableCell>
                    <TableCell>
                      <Badge 
                        color={
                          ppdb.status === "MENUNGGU" ? "amber" :
                          ppdb.status === "DITERIMA" ? "emerald" : "red"
                        }
                      >
                        {ppdb.status === "MENUNGGU" ? "Menunggu Verifikasi" : ppdb.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/ppdb`}>
                        <button className="text-brand-orange hover:text-brand-orange/80 p-2 rounded-lg hover:bg-orange-50 transition-colors">
                          <RiEyeLine className="w-5 h-5" />
                        </button>
                      </Link>
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
