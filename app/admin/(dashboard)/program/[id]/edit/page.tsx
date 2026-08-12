import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProgramForm from "./edit-program-form";
import Link from "next/link";
import { RiArrowLeftSLine } from "@remixicon/react";

export default async function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const program = await prisma.program.findUnique({
    where: { id }
  });

  if (!program) {
    notFound();
  }

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
        <EditProgramForm initialData={program} />
      </div>
    </div>
  );
}
