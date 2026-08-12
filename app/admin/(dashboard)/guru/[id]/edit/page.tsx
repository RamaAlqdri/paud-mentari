import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RiArrowLeftSLine } from "@remixicon/react";
import EditTeacherForm from "./edit-teacher-form";

export const metadata: Metadata = {
  title: "Edit Tenaga Pendidik | Admin PAUD Mentari",
  description: "Edit data guru dan tenaga pendidik",
};

export default async function EditGuruPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const data = await prisma.teacher.findUnique({
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
          href="/admin/guru"
          className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
        >
          <RiArrowLeftSLine className="w-5 h-5 mr-1" />
          Kembali ke Manajemen Guru
        </Link>
      </div>

      <div className="py-4">
        <EditTeacherForm initialData={data} />
      </div>
    </div>
  );
}
