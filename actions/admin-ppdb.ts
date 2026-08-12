"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePPDBStatus(id: string, newStatus: "MENUNGGU" | "DITERIMA" | "DITOLAK") {
  try {
    const updated = await prisma.pPDB.update({
      where: { id },
      data: { status: newStatus },
    });
    
    // Auto-create Student if accepted
    if (newStatus === "DITERIMA") {
      const existingStudent = await prisma.student.findUnique({
        where: { nik: updated.nik }
      });
      
      if (!existingStudent) {
        await prisma.student.create({
          data: {
            nik: updated.nik,
            childName: updated.childName,
            birthPlace: updated.birthPlace,
            birthDate: updated.birthDate,
            gender: updated.gender,
            parentName: updated.parentName,
            phone: updated.phone,
            email: updated.email,
            address: updated.address,
            isActive: true,
          }
        });
      }
    }
    
    revalidatePath("/admin/ppdb");
    revalidatePath("/admin/siswa");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Gagal update status PPDB:", error);
    return { success: false, message: "Gagal memperbarui status." };
  }
}
