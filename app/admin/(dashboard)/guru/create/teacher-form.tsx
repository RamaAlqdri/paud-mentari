"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createGuru } from "@/actions/admin-crud";
import { Button, Card, TextInput } from "@tremor/react";
import { RiCheckboxCircleFill, RiSendPlaneFill, RiArrowDownSLine } from "@remixicon/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const teacherSchema = z.object({
  firstName: z.string().min(2, "Nama depan minimal 2 karakter"),
  lastName: z.string().optional(),
  nik: z.string().min(16, "NIK harus 16 digit").max(16, "NIK harus 16 digit"),
  nip: z.string().optional(),
  nuptk: z.string().optional(),
  phone: z.string().optional(),
  employmentStatus: z.string().min(1, "Status kepegawaian wajib dipilih"),
  lastEducation: z.string().min(2, "Pendidikan terakhir wajib diisi"),
  bio: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

type TeacherFormValues = z.infer<typeof teacherSchema>;

export default function TeacherForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      employmentStatus: "Tetap",
    }
  });

  const onSubmit = async (data: TeacherFormValues) => {
    setIsSubmitting(true);
    setResultMessage(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || "");
    });

    const formElement = document.getElementById("createTeacherForm") as HTMLFormElement;
    if (formElement) {
      const fileInput = formElement.elements.namedItem("image") as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
      }
    }

    try {
      const result = await createGuru(formData);

      if (result.success) {
        setResultMessage({ type: "success", text: "Data tenaga pendidik berhasil ditambahkan." });
        reset();
      } else {
        setResultMessage({ type: "error", text: result.message || "Gagal menambahkan guru." });
      }
    } catch (err) {
      setResultMessage({ type: "error", text: "Terjadi kesalahan internal." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setResultMessage(null);
  };

  return (
    <Card className="w-full max-w-5xl bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm relative overflow-hidden mx-auto">
      {/* Success State Overlay */}
      {resultMessage?.type === "success" && (
        <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-8 text-center animate-[fadeIn_0.5s_ease-out]">
          <div className="w-20 h-20 bg-brand-yellow/20 rounded-full flex items-center justify-center mb-6">
            <RiCheckboxCircleFill className="w-10 h-10 text-brand-orange" />
          </div>
          <h2 className="text-3xl font-extrabold text-brand-orange mb-4">Berhasil!</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            {resultMessage.text} Profil guru kini sudah terdaftar di sistem sekolah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={resetForm} className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-2xl px-8 py-4 font-semibold text-base shadow-sm border-none transition-all">
              Tambah Guru Lain
            </Button>
            <Button 
              variant="secondary"
              onClick={() => router.push("/admin/guru")} 
              className="bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-2xl px-8 py-4 font-semibold text-base border border-gray-200 transition-all"
            >
              Kembali ke Daftar
            </Button>
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className={resultMessage?.type === "success" ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-orange mb-3">Tambah Tenaga Pendidik</h1>
          <p className="text-gray-600">Lengkapi profil guru atau staf baru PAUD Mentari.</p>
        </div>
        
        {resultMessage?.type === "error" && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 text-sm border border-red-200">
            {resultMessage.text}
          </div>
        )}

        <form id="createTeacherForm" onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Identitas Diri */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Identitas Diri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-sm font-semibold text-gray-900">Nama Depan *</label>
                <TextInput id="firstName" placeholder="Contoh: Siti" {...register("firstName")} />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="text-sm font-semibold text-gray-900">Nama Belakang</label>
                <TextInput id="lastName" placeholder="Contoh: Aminah" {...register("lastName")} />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="nik" className="text-sm font-semibold text-gray-900">NIK (16 Digit) *</label>
                <TextInput id="nik" placeholder="3201..." {...register("nik")} />
                {errors.nik && <p className="text-red-500 text-xs">{errors.nik.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="dateOfBirth" className="text-sm font-semibold text-gray-900">Tanggal Lahir</label>
                <input 
                  type="date"
                  id="dateOfBirth" 
                  className="flex h-10 w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted"
                  {...register("dateOfBirth")} 
                />
              </div>
            </div>
          </div>

          {/* Kepegawaian & Kontak */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Data Kepegawaian & Kontak</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="nip" className="text-sm font-semibold text-gray-900">NIP (Opsional)</label>
                <TextInput id="nip" placeholder="Nomor Induk Pegawai..." {...register("nip")} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="nuptk" className="text-sm font-semibold text-gray-900">NUPTK (Opsional)</label>
                <TextInput id="nuptk" placeholder="Nomor Unik Pendidik..." {...register("nuptk")} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="employmentStatus" className="text-sm font-semibold text-gray-900">Status Kepegawaian *</label>
                <div className="relative">
                  <select 
                    id="employmentStatus" 
                    className="flex h-10 w-full rounded-tremor-default border border-tremor-border bg-tremor-background pl-3 pr-10 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted appearance-none"
                    {...register("employmentStatus")}
                  >
                    <option value="Tetap">Guru Tetap</option>
                    <option value="Honor">Guru Honor</option>
                    <option value="Kontrak">Guru Kontrak</option>
                    <option value="Asisten">Asisten Guru</option>
                  </select>
                  <RiArrowDownSLine className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.employmentStatus && <p className="text-red-500 text-xs">{errors.employmentStatus.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="lastEducation" className="text-sm font-semibold text-gray-900">Pendidikan Terakhir *</label>
                <TextInput id="lastEducation" placeholder="Contoh: S1 PGPAUD Universitas..." {...register("lastEducation")} />
                {errors.lastEducation && <p className="text-red-500 text-xs">{errors.lastEducation.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-semibold text-gray-900">Nomor Telepon/WA</label>
                <TextInput id="phone" placeholder="081234567890" {...register("phone")} />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="image" className="text-sm font-semibold text-gray-900">Pasfoto (Opsional)</label>
                <input 
                  id="image" 
                  name="image"
                  type="file" 
                  accept="image/*"
                  className="flex h-10 w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-1.5 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted file:border-0 file:bg-gray-100 file:px-3 file:py-1 file:rounded-md file:text-xs file:font-semibold file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Profil Singkat</h3>
            <div className="flex flex-col gap-2">
              <label htmlFor="bio" className="text-sm font-semibold text-gray-900">Bio / Deskripsi</label>
              <textarea 
                id="bio" 
                rows={3}
                className="flex w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted"
                placeholder="Tuliskan pengalaman atau keahlian khusus guru..."
                {...register("bio")}
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="/admin/guru"
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
                {isSubmitting ? "Menyimpan..." : "Simpan Data Guru"}
                {!isSubmitting && <RiSendPlaneFill className="w-5 h-5" />}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
