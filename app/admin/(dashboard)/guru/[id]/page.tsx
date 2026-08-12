import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RiArrowLeftSLine, RiUser3Line, RiGraduationCapLine, RiUser3Fill } from "@remixicon/react";
import Image from "next/image";
import TeacherDetailClient from "./teacher-detail-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Pendidik | Admin PAUD Mentari",
};

export default async function TeacherDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const data = await prisma.teacher.findUnique({
    where: { id }
  });

  if (!data) {
    notFound();
  }

  const fullName = `${data.firstName} ${data.lastName || ""}`.trim();
  const formattedDate = data.dateOfBirth 
    ? new Date(data.dateOfBirth).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : "-";

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb / Back Navigation */}
      <div>
        <Link 
          href="/admin/guru"
          className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-brand-orange transition-colors"
        >
          <RiArrowLeftSLine className="w-5 h-5 mr-1" />
          Kembali ke Manajemen Guru
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="py-4">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Profile Header */}
          <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm flex-shrink-0 bg-gray-50 flex items-center justify-center">
                {data.image ? (
                  <Image 
                    src={data.image} 
                    alt={`Foto ${fullName}`}
                    width={96}
                    height={96}
                    className={`object-cover w-full h-full ${!data.isActive ? 'grayscale opacity-75' : ''}`}
                  />
                ) : (
                  <RiUser3Fill className={`w-12 h-12 text-gray-400 ${!data.isActive ? 'opacity-50' : ''}`} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className={`text-3xl font-extrabold ${data.isActive ? 'text-gray-900' : 'text-gray-500 line-through'}`}>
                    {fullName}
                  </h2>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    data.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {data.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </div>
                <p className="text-lg text-gray-600 font-medium">{data.employmentStatus}</p>
                {data.bio && (
                  <p className="text-sm text-gray-500 mt-2 max-w-lg leading-relaxed">{data.bio}</p>
                )}
              </div>
            </div>
            
            {/* Action Buttons via Client Component */}
            <TeacherDetailClient teacherId={data.id} isActive={data.isActive} />
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Informasi Pribadi */}
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <RiUser3Line className="text-brand-orange w-5 h-5" />
                  Informasi Pribadi
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">NIP</p>
                  <p className="text-base text-gray-900 font-medium">{data.nip || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">NIK</p>
                  <p className="text-base text-gray-900 font-medium">{data.nik || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">NUPTK</p>
                  <p className="text-base text-gray-900 font-medium">{data.nuptk || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">No. WhatsApp / Telepon</p>
                  <p className="text-base text-gray-900 font-medium">{data.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Tanggal Lahir</p>
                  <p className="text-base text-gray-900 font-medium">{formattedDate}</p>
                </div>
              </div>
            </div>

            {/* Riwayat Pendidikan */}
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-200 overflow-hidden h-fit">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <RiGraduationCapLine className="text-brand-orange w-5 h-5" />
                  Riwayat Pendidikan
                </h3>
              </div>
              <div className="p-6">
                <div className="relative pl-4 border-l-2 border-gray-200 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-orange ring-4 ring-white"></div>
                    <h4 className="text-sm font-bold text-gray-900">{data.lastEducation || "Data pendidikan belum diisi"}</h4>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
