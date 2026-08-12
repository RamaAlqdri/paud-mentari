import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RiArrowLeftSLine, RiUser3Line, RiParentLine, RiUser3Fill } from "@remixicon/react";
import Image from "next/image";
import StudentDetailClient from "./student-detail-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Siswa | Admin PAUD Mentari",
};

export default async function StudentDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const data = await prisma.student.findUnique({
    where: { id }
  });

  if (!data) {
    notFound();
  }

  const formattedDate = data.birthDate 
    ? new Date(data.birthDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : "-";

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb / Back Navigation */}
      <div>
        <Link 
          href="/admin/siswa"
          className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-brand-orange transition-colors"
        >
          <RiArrowLeftSLine className="w-5 h-5 mr-1" />
          Kembali ke Manajemen Siswa
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
                    alt={`Foto ${data.childName}`}
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
                  <h2 className={`text-3xl font-extrabold capitalize ${data.isActive ? 'text-gray-900' : 'text-gray-500 line-through'}`}>
                    {data.childName}
                  </h2>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    data.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {data.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </div>
                <p className="text-lg text-gray-600 font-medium">Tahun Masuk: {new Date(data.createdAt).getFullYear()}</p>
                <p className="text-sm text-gray-500 mt-1">Nomer Induk Kependudukan: {data.nik}</p>
              </div>
            </div>
            
            {/* Action Buttons via Client Component */}
            <StudentDetailClient studentId={data.id} isActive={data.isActive} />
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Informasi Pribadi */}
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-200 overflow-hidden h-fit">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <RiUser3Line className="text-brand-orange w-5 h-5" />
                  Informasi Pribadi Anak
                </h3>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Tempat, Tanggal Lahir</p>
                  <p className="text-base text-gray-900 font-medium">{data.birthPlace}, {formattedDate}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Jenis Kelamin</p>
                  <p className="text-base text-gray-900 font-medium">
                    {data.gender === 'L' ? 'Laki-laki' : data.gender === 'P' ? 'Perempuan' : data.gender}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">NIK Anak</p>
                  <p className="text-base text-gray-900 font-medium">{data.nik || "-"}</p>
                </div>
              </div>
            </div>

            {/* Riwayat Pendidikan */}
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-200 overflow-hidden h-fit">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <RiParentLine className="text-brand-orange w-5 h-5" />
                  Informasi Orang Tua / Wali
                </h3>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Nama Lengkap</p>
                  <p className="text-base text-gray-900 font-medium">{data.parentName || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Nomor HP / WhatsApp</p>
                  <p className="text-base text-gray-900 font-medium">{data.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Email</p>
                  <p className="text-base text-gray-900 font-medium">{data.email || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Alamat Lengkap</p>
                  <p className="text-base text-gray-900 font-medium leading-relaxed">{data.address || "-"}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
