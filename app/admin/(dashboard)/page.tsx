import { Card } from "@tremor/react";
import { RiTeamLine, RiBookOpenLine, RiTimeLine, RiCheckboxCircleLine } from "@remixicon/react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  // Ambil stat dari database
  const ppdbMenunggu = await prisma.pPDB.count({ where: { status: "MENUNGGU" } });
  const ppdbDiterima = await prisma.pPDB.count({ where: { status: "DITERIMA" } });
  const totalGuru = await prisma.teacher.count();
  const totalProgram = await prisma.program.count();

  const stats = [
    { title: "Pendaftar Baru", value: ppdbMenunggu.toString(), icon: RiTimeLine, color: "text-amber-500", bg: "bg-amber-100" },
    { title: "Siswa Diterima", value: ppdbDiterima.toString(), icon: RiCheckboxCircleLine, color: "text-emerald-500", bg: "bg-emerald-100" },
    { title: "Tenaga Pendidik", value: totalGuru.toString(), icon: RiTeamLine, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "Program Tersedia", value: totalProgram.toString(), icon: RiBookOpenLine, color: "text-purple-500", bg: "bg-purple-100" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Ikhtisar</h1>
        <p className="text-muted-foreground">Selamat datang di Panel Admin PAUD Mentari.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <div className="mb-4 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-xl font-semibold text-sm font-medium text-slate-600">
                {stat.title}
              </h3>
              <div className={`p-2 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm col-span-4">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Pemberitahuan</h3>
        </div>
        <div>
          <div className="text-sm text-slate-600">
            {ppdbMenunggu > 0 ? (
              <p>Ada <strong className="text-brand-orange">{ppdbMenunggu} pendaftaran PPDB</strong> yang menunggu peninjauan Anda. Silakan periksa menu "Pendaftar PPDB".</p>
            ) : (
              <p>Tidak ada pendaftaran baru yang perlu ditinjau saat ini.</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
