import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RiArrowRightSLine, RiFileList3Line, RiImage2Line, RiEyeLine } from "@remixicon/react";
import PPDBDetailActions from "./ppdb-detail-actions";

export default async function PPDBDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const pendaftar = await prisma.pPDB.findUnique({
    where: { id: params.id }
  });

  if (!pendaftar) {
    notFound();
  }

  // Format ID
  const shortId = pendaftar.id.split('-')[0].toUpperCase();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex text-gray-500 text-sm font-semibold">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/admin/ppdb" className="hover:text-brand-orange transition-colors">
              Data Pendaftar PPDB
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <RiArrowRightSLine className="w-4 h-4 mx-1" />
              <span className="text-brand-orange font-bold">Detail Pendaftar</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Detail Pendaftar: {pendaftar.childName}
          </h2>
          <p className="text-gray-500 mt-1 font-medium">ID Pendaftaran: #PDB-2026-{shortId}</p>
        </div>
        
        <PPDBDetailActions id={pendaftar.id} currentStatus={pendaftar.status} />
      </div>

      {/* Content Grid - Single Column (No Catatan/Riwayat) */}
      <div className="space-y-8">
        
        {/* Card: Informasi Siswa & Orang Tua */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-gray-900">Informasi Siswa & Orang Tua</h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize ${
              pendaftar.status === "MENUNGGU" ? "bg-amber-100 text-amber-800" :
              pendaftar.status === "DITERIMA" ? "bg-emerald-100 text-emerald-800" :
              "bg-red-100 text-red-800"
            }`}>
              {pendaftar.status === "MENUNGGU" ? "Menunggu Verifikasi" : pendaftar.status.toLowerCase()}
            </span>
          </div>

          {/* Grid 1: Data Siswa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Nama Lengkap Siswa</p>
              <p className="text-base font-medium text-gray-900">{pendaftar.childName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Nomor Induk Kependudukan (NIK)</p>
              <p className="text-base font-medium text-gray-900">{pendaftar.nik}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Tempat, Tanggal Lahir</p>
              <p className="text-base font-medium text-gray-900">
                {pendaftar.birthPlace}, {new Date(pendaftar.birthDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Jenis Kelamin</p>
              <p className="text-base font-medium text-gray-900">
                {pendaftar.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100 my-8"></div>

          {/* Grid 2: Data Orang Tua */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Nama Wali</p>
              <p className="text-base font-medium text-gray-900">{pendaftar.parentName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Nomor WhatsApp</p>
              <p className="text-base font-medium text-gray-900">{pendaftar.phone}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Alamat Email</p>
              <p className="text-base font-medium text-gray-900">{pendaftar.email || "-"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-gray-500 mb-1">Alamat Lengkap</p>
              <p className="text-base font-medium text-gray-900">{pendaftar.address}</p>
            </div>
          </div>
        </div>

        {/* Card: Dokumen Terlampir (Static Dummy for Now) */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Dokumen Terlampir</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-brand-orange">
                  <RiFileList3Line className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Akta Kelahiran</p>
                  <p className="text-sm text-gray-500">PDF • 1.2 MB</p>
                </div>
              </div>
              <button className="text-brand-orange hover:text-brand-orange/80 font-bold text-sm flex items-center gap-1 transition-colors">
                <RiEyeLine className="w-4 h-4" />
                Preview
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-brand-orange">
                  <RiFileList3Line className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Kartu Keluarga</p>
                  <p className="text-sm text-gray-500">PDF • 2.5 MB</p>
                </div>
              </div>
              <button className="text-brand-orange hover:text-brand-orange/80 font-bold text-sm flex items-center gap-1 transition-colors">
                <RiEyeLine className="w-4 h-4" />
                Preview
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-brand-orange">
                  <RiImage2Line className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Pas Foto</p>
                  <p className="text-sm text-gray-500">JPG • 800 KB</p>
                </div>
              </div>
              <button className="text-brand-orange hover:text-brand-orange/80 font-bold text-sm flex items-center gap-1 transition-colors">
                <RiEyeLine className="w-4 h-4" />
                Preview
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
