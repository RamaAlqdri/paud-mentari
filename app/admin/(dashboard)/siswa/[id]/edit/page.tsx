import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RiArrowLeftSLine } from "@remixicon/react";
import EditStudentForm from "./edit-student-form";

export const metadata: Metadata = {
  title: "Edit Siswa | Admin PAUD Mentari",
  description: "Edit data siswa",
};

export default async function EditSiswaPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const data = await prisma.student.findUnique({
    where: { id }
  });

  if (!data) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb / Back Navigation */}
      <div>
        <Link 
          href="/admin/siswa"
          className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
        >
          <RiArrowLeftSLine className="w-5 h-5 mr-1" />
          Kembali ke Manajemen Siswa
        </Link>
      </div>

      <div className="py-4">
        <EditStudentForm initialData={data} />
      </div>
    </div>
  );
}
