import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProgramForm from "./edit-program-form";
import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";

export default async function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const program = await prisma.program.findUnique({
    where: { id }
  });

  if (!program) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/admin/program" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-orange transition-colors">
        <RiArrowLeftLine className="mr-2 h-4 w-4" /> Kembali ke Manajemen Program
      </Link>
      <EditProgramForm initialData={program} />
    </div>
  );
}
