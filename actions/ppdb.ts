"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Skema validasi Zod sesuai Prisma schema
const ppdbSchema = z.object({
  childName: z.string().min(2, "Nama Anak minimal 2 karakter"),
  nik: z.string().min(16, "NIK harus 16 digit").max(16, "NIK harus 16 digit"),
  birthPlace: z.string().min(2, "Tempat Lahir wajib diisi"),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Format tanggal tidak valid",
  }),
  gender: z.string().min(1, "Jenis Kelamin wajib dipilih"),
  parentName: z.string().min(2, "Nama Orang Tua minimal 2 karakter"),
  phone: z.string().min(10, "Nomor HP minimal 10 digit"),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
});

export async function submitPPDB(prevState: any, formData: FormData) {
  try {
    const rawData = {
      childName: formData.get("childName") as string,
      nik: formData.get("nik") as string,
      birthPlace: formData.get("birthPlace") as string,
      birthDate: formData.get("birthDate") as string,
      gender: formData.get("gender") as string,
      parentName: formData.get("parentName") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
    };

    // Validasi data menggunakan Zod
    const validatedData = ppdbSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Periksa kembali input Anda.",
      };
    }

    // Cek duplikasi NIK
    const existing = await prisma.pPDB.findUnique({
      where: { nik: validatedData.data.nik },
    });

    if (existing) {
      return {
        success: false,
        message: "Pendaftaran gagal: NIK tersebut sudah terdaftar sebelumnya.",
      };
    }

    // Simpan ke database
    await prisma.pPDB.create({
      data: {
        ...validatedData.data,
        birthDate: new Date(validatedData.data.birthDate),
      },
    });

    revalidatePath("/admin/ppdb"); // Revalidate admin page jika nanti dibuat

    return {
      success: true,
      message: "Pendaftaran berhasil disubmit! Silakan tunggu informasi lebih lanjut.",
    };
  } catch (error) {
    console.error("PPDB Submit Error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan internal. Silakan coba beberapa saat lagi.",
    };
  }
}
