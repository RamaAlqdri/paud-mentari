"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePPDBStatus(id: string, newStatus: "MENUNGGU" | "DITERIMA" | "DITOLAK") {
  try {
    await prisma.pPDB.update({
      where: { id },
      data: { status: newStatus },
    });
    
    revalidatePath("/admin/ppdb");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Gagal update status PPDB:", error);
    return { success: false, message: "Gagal memperbarui status." };
  }
}
