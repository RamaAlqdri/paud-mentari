"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ==================== FASILITAS ====================
export async function createFasilitas(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  if (!title || !description) return { success: false, message: "Judul dan deskripsi wajib diisi." };

  try {
    await prisma.facility.create({ data: { title, description } });
    revalidatePath("/admin/fasilitas");
    revalidatePath("/fasilitas");
    return { success: true };
  } catch (err) {
    return { success: false, message: "Terjadi kesalahan." };
  }
}

export async function deleteFasilitas(id: string) {
  try {
    await prisma.facility.delete({ where: { id } });
    revalidatePath("/admin/fasilitas");
    revalidatePath("/fasilitas");
    return { success: true };
  } catch (err) {
    return { success: false, message: "Gagal menghapus." };
  }
}

// ==================== PROGRAM ====================
export async function createProgram(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  if (!title || !description) return { success: false, message: "Judul dan deskripsi wajib diisi." };

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  try {
    await prisma.program.create({ data: { title, slug, description } });
    revalidatePath("/admin/program");
    revalidatePath("/program");
    return { success: true };
  } catch (err) {
    return { success: false, message: "Terjadi kesalahan atau slug duplikat." };
  }
}

export async function deleteProgram(id: string) {
  try {
    await prisma.program.delete({ where: { id } });
    revalidatePath("/admin/program");
    revalidatePath("/program");
    return { success: true };
  } catch (err) {
    return { success: false, message: "Gagal menghapus." };
  }
}

// ==================== GURU ====================
export async function createGuru(formData: FormData) {
  const name = formData.get("name") as string;
  const position = formData.get("position") as string;
  const bio = formData.get("bio") as string;
  if (!name || !position) return { success: false, message: "Nama dan jabatan wajib diisi." };

  try {
    await prisma.teacher.create({ data: { name, position, bio } });
    revalidatePath("/admin/guru");
    revalidatePath("/guru");
    return { success: true };
  } catch (err) {
    return { success: false, message: "Terjadi kesalahan." };
  }
}

export async function deleteGuru(id: string) {
  try {
    await prisma.teacher.delete({ where: { id } });
    revalidatePath("/admin/guru");
    revalidatePath("/guru");
    return { success: true };
  } catch (err) {
    return { success: false, message: "Gagal menghapus." };
  }
}

// ==================== ARTIKEL ====================
export async function createArtikel(formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  
  if (!title || !excerpt || !content) return { success: false, message: "Judul, ringkasan, dan konten wajib diisi." };

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  try {
    await prisma.article.create({ 
      data: { 
        title, 
        slug, 
        excerpt, 
        content,
        publishedAt: new Date(),
      } 
    });
    revalidatePath("/admin/artikel");
    revalidatePath("/artikel");
    return { success: true };
  } catch (err) {
    return { success: false, message: "Terjadi kesalahan atau judul/slug duplikat." };
  }
}

export async function deleteArtikel(id: string) {
  try {
    await prisma.article.delete({ where: { id } });
    revalidatePath("/admin/artikel");
    revalidatePath("/artikel");
    return { success: true };
  } catch (err) {
    return { success: false, message: "Gagal menghapus." };
  }
}
