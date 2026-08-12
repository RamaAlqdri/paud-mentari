"use server";

import fs from "fs/promises";
import path from "path";
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
  const category = formData.get("category") as string || "Intrakurikuler";
  
  if (!title || !description) return { success: false, message: "Judul dan deskripsi wajib diisi." };

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  try {
    await prisma.program.create({ data: { title, slug, description, category } });
    revalidatePath("/admin/program");
    revalidatePath("/program");
    return { success: true };
  } catch (err) {
    return { success: false, message: "Terjadi kesalahan atau slug duplikat." };
  }
}

export async function updateProgram(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string || "Intrakurikuler";

  if (!title || !description) return { success: false, message: "Judul dan deskripsi wajib diisi." };

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  try {
    await prisma.program.update({
      where: { id },
      data: { title, slug, description, category }
    });
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

export async function toggleProgramStatus(id: string, currentStatus: boolean) {
  try {
    await prisma.program.update({
      where: { id },
      data: { isActive: !currentStatus }
    });
    revalidatePath("/admin/program");
    revalidatePath("/program");
    return { success: true };
  } catch (err) {
    return { success: false, message: "Gagal memperbarui status program." };
  }
}

// ==================== GURU ====================
export async function createGuru(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const nik = formData.get("nik") as string;
  const nip = formData.get("nip") as string;
  const nuptk = formData.get("nuptk") as string;
  const phone = formData.get("phone") as string;
  const employmentStatus = formData.get("employmentStatus") as string || "Tetap";
  const lastEducation = formData.get("lastEducation") as string;
  const bio = formData.get("bio") as string;
  const dateOfBirthStr = formData.get("dateOfBirth") as string;
  const imageFile = formData.get("image") as File | null;
  
  if (!firstName || !nik) return { success: false, message: "Nama depan dan NIK wajib diisi." };

  let imagePath = null;
  if (imageFile && imageFile.size > 0) {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    
    const ext = path.extname(imageFile.name) || ".jpg";
    const filename = `guru-${nik}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, filename);
    
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    imagePath = `/uploads/${filename}`;
  }

  try {
    await prisma.teacher.create({ 
      data: { 
        firstName, 
        lastName: lastName || null, 
        nik, 
        nip: nip || null, 
        nuptk: nuptk || null, 
        phone: phone || null, 
        employmentStatus, 
        lastEducation: lastEducation || null, 
        bio: bio || null, 
        dateOfBirth: dateOfBirthStr ? new Date(dateOfBirthStr) : null,
        image: imagePath,
      } 
    });
    revalidatePath("/admin/guru");
    revalidatePath("/guru");
    return { success: true };
  } catch (err: any) {
    // Unique constraint failed on the constraint: `Teacher_nik_key`
    if (err.code === 'P2002') {
      return { success: false, message: "NIK sudah terdaftar di sistem." };
    }
    return { success: false, message: "Terjadi kesalahan internal server." };
  }
}

export async function updateGuru(id: string, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const nik = formData.get("nik") as string;
  const nip = formData.get("nip") as string;
  const nuptk = formData.get("nuptk") as string;
  const phone = formData.get("phone") as string;
  const employmentStatus = formData.get("employmentStatus") as string || "Tetap";
  const lastEducation = formData.get("lastEducation") as string;
  const bio = formData.get("bio") as string;
  const dateOfBirthStr = formData.get("dateOfBirth") as string;
  const imageFile = formData.get("image") as File | null;
  
  if (!firstName || !nik) return { success: false, message: "Nama depan dan NIK wajib diisi." };

  let imagePath = undefined;
  if (imageFile && imageFile.size > 0) {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    
    const ext = path.extname(imageFile.name) || ".jpg";
    const filename = `guru-${nik}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, filename);
    
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    imagePath = `/uploads/${filename}`;
  }

  try {
    const updateData: any = { 
      firstName, 
      lastName: lastName || null, 
      nik, 
      nip: nip || null, 
      nuptk: nuptk || null, 
      phone: phone || null, 
      employmentStatus, 
      lastEducation: lastEducation || null, 
      bio: bio || null, 
      dateOfBirth: dateOfBirthStr ? new Date(dateOfBirthStr) : null,
    };

    if (imagePath) {
      updateData.image = imagePath;
    }

    await prisma.teacher.update({ 
      where: { id },
      data: updateData
    });
    
    revalidatePath("/admin/guru");
    revalidatePath("/guru");
    return { success: true };
  } catch (err: any) {
    if (err.code === 'P2002') {
      return { success: false, message: "NIK sudah terdaftar pada pengguna lain." };
    }
    return { success: false, message: "Terjadi kesalahan saat memperbarui data." };
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

export async function toggleGuruStatus(id: string, currentStatus: boolean) {
  try {
    await prisma.teacher.update({
      where: { id },
      data: { isActive: !currentStatus }
    });
    revalidatePath("/admin/guru");
    revalidatePath("/guru");
    revalidatePath(`/admin/guru/${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: "Gagal mengubah status." };
  }
}

// ==================== ARTIKEL ====================
export async function createArtikel(formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string || "Umum";
  const thumbnailFile = formData.get("thumbnail") as File | null;
  
  if (!title || !excerpt || !content) return { success: false, message: "Judul, ringkasan, dan konten wajib diisi." };

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  let thumbnailPath = null;

  if (thumbnailFile && thumbnailFile.size > 0) {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    
    const ext = path.extname(thumbnailFile.name) || ".jpg";
    const filename = `${slug}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, filename);
    
    const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    thumbnailPath = `/uploads/${filename}`;
  }

  try {
    await prisma.article.create({ 
      data: { 
        title, 
        slug, 
        excerpt, 
        content,
        category,
        thumbnail: thumbnailPath,
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

export async function updateArtikel(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string || "Umum";
  const thumbnailFile = formData.get("thumbnail") as File | null;
  
  if (!title || !excerpt || !content) return { success: false, message: "Judul, ringkasan, dan konten wajib diisi." };

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  let thumbnailPath = undefined;

  if (thumbnailFile && thumbnailFile.size > 0) {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    
    const ext = path.extname(thumbnailFile.name) || ".jpg";
    const filename = `${slug}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, filename);
    
    const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    thumbnailPath = `/uploads/${filename}`;
  }

  try {
    const updateData: any = { 
      title, 
      slug, 
      excerpt, 
      content,
      category,
    };
    
    if (thumbnailPath) {
      updateData.thumbnail = thumbnailPath;
    }

    await prisma.article.update({ 
      where: { id },
      data: updateData
    });
    
    revalidatePath("/admin/artikel");
    revalidatePath("/artikel");
    revalidatePath(`/artikel/${slug}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: "Terjadi kesalahan saat memperbarui artikel." };
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

// ==================== SISWA ====================
export async function updateSiswa(id: string, formData: FormData) {
  const childName = formData.get("childName") as string;
  const nik = formData.get("nik") as string;
  const birthPlace = formData.get("birthPlace") as string;
  const birthDateStr = formData.get("birthDate") as string;
  const gender = formData.get("gender") as string;
  const parentName = formData.get("parentName") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const address = formData.get("address") as string;
  const imageFile = formData.get("image") as File | null;
  
  if (!childName || !nik || !parentName) return { success: false, message: "Nama anak, NIK, dan Nama Orang Tua wajib diisi." };

  let imagePath = undefined;
  if (imageFile && imageFile.size > 0) {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    
    const ext = path.extname(imageFile.name) || ".jpg";
    const filename = `siswa-${nik}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, filename);
    
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    imagePath = `/uploads/${filename}`;
  }

  try {
    const updateData: any = { 
      childName, 
      nik, 
      birthPlace,
      gender,
      parentName,
      phone,
      email: email || null,
      address,
      birthDate: birthDateStr ? new Date(birthDateStr) : undefined,
    };

    if (imagePath) {
      updateData.image = imagePath;
    }

    await prisma.student.update({ 
      where: { id },
      data: updateData
    });
    
    revalidatePath("/admin/siswa");
    revalidatePath(`/admin/siswa/${id}`);
    return { success: true };
  } catch (err: any) {
    if (err.code === 'P2002') {
      return { success: false, message: "NIK sudah terdaftar pada siswa lain." };
    }
    return { success: false, message: "Terjadi kesalahan saat memperbarui data siswa." };
  }
}

export async function toggleSiswaStatus(id: string, currentStatus: boolean) {
  try {
    await prisma.student.update({
      where: { id },
      data: { isActive: !currentStatus }
    });
    revalidatePath("/admin/siswa");
    revalidatePath(`/admin/siswa/${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: "Gagal mengubah status." };
  }
}
