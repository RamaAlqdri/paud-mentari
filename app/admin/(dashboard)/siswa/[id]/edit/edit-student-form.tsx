"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateSiswa } from "@/actions/admin-crud";
import { Button, Card, TextInput } from "@tremor/react";
import { RiSave3Fill, RiArrowDownSLine } from "@remixicon/react";
import Link from "next/link";
import { StatusModal } from "@/components/status-modal";
import { useRouter } from "next/navigation";
import Image from "next/image";

const studentSchema = z.object({
  childName: z.string().min(2, "Nama depan minimal 2 karakter"),
  nik: z.string().min(16, "NIK harus 16 digit").max(16, "NIK harus 16 digit"),
  birthPlace: z.string().min(2, "Tempat lahir wajib diisi"),
  birthDate: z.string().min(1, "Tanggal lahir wajib diisi"),
  gender: z.string().min(1, "Jenis kelamin wajib dipilih"),
  parentName: z.string().min(2, "Nama orang tua wajib diisi"),
  phone: z.string().min(10, "Nomor telepon minimal 10 digit"),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export default function EditStudentForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Parse tanggal ke format yyyy-MM-dd agar bisa di pre-fill di input date
  const defaultDate = initialData.birthDate 
    ? new Date(initialData.birthDate).toISOString().split('T')[0]
    : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      childName: initialData.childName,
      nik: initialData.nik,
      birthPlace: initialData.birthPlace,
      birthDate: defaultDate,
      gender: initialData.gender,
      parentName: initialData.parentName,
      phone: initialData.phone,
      email: initialData.email || "",
      address: initialData.address,
    }
  });


  const onSubmit = async (data: StudentFormValues) => {
    setIsSubmitting(true);
    setResultMessage(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value !== undefined && value !== null ? value.toString() : "");
    });

    const formElement = document.getElementById("editStudentForm") as HTMLFormElement;
    if (formElement) {
      const fileInput = formElement.elements.namedItem("image") as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
      }
    }

    try {
      const result = await updateSiswa(initialData.id, formData);

      if (result.success) {
        setResultMessage({ type: "success", text: "Perubahan data siswa berhasil disimpan." });
      } else {
        setResultMessage({ type: "error", text: result.message || "Gagal memperbarui data siswa." });
      }
    } catch (err) {
      setResultMessage({ type: "error", text: "Terjadi kesalahan internal." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-5xl bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm relative mx-auto">
      {/* Status Modal */}
      {resultMessage && (
        <StatusModal 
          isOpen={!!resultMessage}
          type={resultMessage.type}
          title={resultMessage.type === "success" ? "Tersimpan!" : "Gagal"}
          message={resultMessage.text}
          primaryAction={{
            label: "Kembali ke Daftar Siswa",
            onClick: () => router.push("/admin/siswa")
          }}
          secondaryAction={resultMessage.type === "success" ? {
            label: "Lanjut Mengedit",
            onClick: () => setResultMessage(null)
          } : {
            label: "Tutup",
            onClick: () => setResultMessage(null)
          }}
        />
      )}
      <div className={resultMessage?.type === "success" ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-orange mb-3">Edit Data Siswa</h1>
          <p className="text-gray-600">Perbarui profil siswa dan informasi orang tua/wali.</p>
        </div>
        <form id="editStudentForm" onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Identitas Diri */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Identitas Anak</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="childName" className="text-sm font-semibold text-gray-900">Nama Lengkap Anak *</label>
                <TextInput id="childName" placeholder="Contoh: Budi Santoso" {...register("childName")} />
                {errors.childName && <p className="text-red-500 text-xs">{errors.childName.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="nik" className="text-sm font-semibold text-gray-900">NIK (16 Digit) *</label>
                <TextInput id="nik" placeholder="3201..." {...register("nik")} />
                {errors.nik && <p className="text-red-500 text-xs">{errors.nik.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="birthPlace" className="text-sm font-semibold text-gray-900">Tempat Lahir *</label>
                <TextInput id="birthPlace" placeholder="Contoh: Jakarta" {...register("birthPlace")} />
                {errors.birthPlace && <p className="text-red-500 text-xs">{errors.birthPlace.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="dateOfBirth" className="text-sm font-semibold text-gray-900">Tanggal Lahir *</label>
                <input 
                  type="date"
                  id="dateOfBirth" 
                  className="flex h-10 w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted"
                  {...register("birthDate")} 
                />
                {errors.birthDate && <p className="text-red-500 text-xs">{errors.birthDate.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="gender" className="text-sm font-semibold text-gray-900">Jenis Kelamin *</label>
                <div className="relative">
                  <select 
                    id="gender" 
                    className="flex h-10 w-full rounded-tremor-default border border-tremor-border bg-tremor-background pl-3 pr-10 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted appearance-none"
                    {...register("gender")}
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                  <RiArrowDownSLine className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
              </div>
            </div>
          </div>

          {/* Data Orang Tua & Kontak */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Data Orang Tua & Kontak</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="parentName" className="text-sm font-semibold text-gray-900">Nama Orang Tua/Wali *</label>
                <TextInput id="parentName" placeholder="Contoh: Andi Wijaya" {...register("parentName")} />
                {errors.parentName && <p className="text-red-500 text-xs">{errors.parentName.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-semibold text-gray-900">Nomor Telepon/WA *</label>
                <TextInput id="phone" placeholder="081234567890" {...register("phone")} />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-900">Email (Opsional)</label>
                <TextInput id="email" placeholder="contoh@gmail.com" {...register("email")} />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="address" className="text-sm font-semibold text-gray-900">Alamat Lengkap *</label>
                <textarea 
                  id="address" 
                  rows={3}
                  className="flex w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted"
                  placeholder="Nama jalan, RT/RW, kelurahan..."
                  {...register("address")}
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
              </div>
            </div>
          </div>

          {/* Pasfoto */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Pasfoto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="image" className="text-sm font-semibold text-gray-900">Ganti Pasfoto (Opsional)</label>
                <input 
                  id="image" 
                  name="image"
                  type="file" 
                  accept="image/*"
                  className="flex h-10 w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-1.5 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted file:border-0 file:bg-gray-100 file:px-3 file:py-1 file:rounded-md file:text-xs file:font-semibold file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                />
                {initialData.image && (
                  <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                    Saat ini: 
                    <a href={initialData.image} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                      Lihat Foto Lama
                    </a>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="/admin/siswa"
              className="text-gray-500 font-medium hover:text-gray-900 transition-colors"
            >
              Batal
            </Link>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-2xl px-8 py-4 font-semibold text-base shadow-sm hover:shadow transition-all border-none w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                {!isSubmitting && <RiSave3Fill className="w-5 h-5" />}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
