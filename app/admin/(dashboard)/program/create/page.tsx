import { Metadata } from "next";
import CreateProgramForm from "./create-program-form";
import Link from "next/link";
import { RiArrowLeftSLine } from "@remixicon/react";

export const metadata: Metadata = {
  title: "Tambah Program | Admin PAUD Mentari",
  description: "Formulir penambahan program sekolah baru",
};

export default function CreateProgramPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb / Back Navigation */}
      <div>
        <Link 
          href="/admin/program"
          className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-brand-orange transition-colors"
        >
          <RiArrowLeftSLine className="w-5 h-5 mr-1" />
          Kembali ke Manajemen Program
        </Link>
      </div>

      <div className="py-4">
        <CreateProgramForm />
      </div>
    </div>
  );
}
