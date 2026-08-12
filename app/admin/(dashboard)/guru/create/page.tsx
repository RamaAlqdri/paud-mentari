import { Metadata } from "next";
import TeacherForm from "./teacher-form";
import Link from "next/link";
import { RiArrowLeftSLine } from "@remixicon/react";

export const metadata: Metadata = {
  title: "Tambah Guru | Admin PAUD Mentari",
  description: "Formulir penambahan tenaga pendidik baru",
};

export default function CreateTeacherPage() {
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

      <div className="py-4">
        <TeacherForm />
      </div>
    </div>
  );
}
