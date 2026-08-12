"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitPPDB } from "@/actions/ppdb";
import { Button, Card, TextInput } from "@tremor/react";
import { RiSendPlaneFill, RiArrowDownSLine } from "@remixicon/react";
import { StatusModal } from "@/components/status-modal";

const ppdbSchema = z.object({
  childName: z.string().min(2, "Nama Anak minimal 2 karakter"),
  nik: z.string().min(16, "NIK harus 16 digit").max(16, "NIK harus 16 digit"),
  birthPlace: z.string().min(2, "Tempat Lahir wajib diisi"),
  birthDate: z.string().min(1, "Tanggal lahir wajib diisi"),
  gender: z.string().min(1, "Jenis Kelamin wajib dipilih"),
  parentName: z.string().min(2, "Nama Orang Tua minimal 2 karakter"),
  phone: z.string().min(10, "Nomor HP minimal 10 digit"),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
});

type PPDBFormValues = z.infer<typeof ppdbSchema>;

export default function PPDBFormClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PPDBFormValues>({
    resolver: zodResolver(ppdbSchema),
  });

  const onSubmit = async (data: PPDBFormValues) => {
    setIsSubmitting(true);
    setResultMessage(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || "");
    });

    try {
      const result = await submitPPDB(null, formData);

      if (result.success) {
        setResultMessage({ type: "success", text: result.message || "Pendaftaran berhasil" });
        reset();
      } else {
        setResultMessage({ type: "error", text: result.message || "Pendaftaran gagal" });
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
    <Card className="w-full max-w-3xl bg-white rounded-[2rem] p-8 md:p-12 border border-gray-200 shadow-sm relative overflow-hidden mx-auto">
      {/* Status Modal */}
      {resultMessage && (
        <StatusModal 
          isOpen={!!resultMessage}
          type={resultMessage.type}
          title={resultMessage.type === "success" ? "Pendaftaran Berhasil!" : "Gagal"}
          message={
            resultMessage.type === "success" 
              ? `${resultMessage.text}. Tim kami akan segera menghubungi Anda untuk proses selanjutnya.` 
              : resultMessage.text
          }
          primaryAction={{
            label: resultMessage.type === "success" ? "Daftar Siswa Lain" : "Tutup",
            onClick: resetForm
          }}
        />
      )}

      {/* Form Content */}
      <div className={resultMessage?.type === "success" ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-orange mb-3">Formulir Pendaftaran Siswa Baru</h1>
          <p className="text-gray-600">Silakan lengkapi data diri calon siswa dan orang tua di bawah ini.</p>
        </div>        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Data Anak */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Data Calon Siswa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="childName" className="text-sm font-semibold text-gray-900">Nama Lengkap Anak</label>
                <TextInput id="childName" placeholder="Masukkan nama lengkap" {...register("childName")} />
                {errors.childName && <p className="text-red-500 text-xs">{errors.childName.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="nik" className="text-sm font-semibold text-gray-900">NIK Anak (16 Digit)</label>
                <TextInput id="nik" type="number" placeholder="Sesuai Kartu Keluarga" {...register("nik")} />
                {errors.nik && <p className="text-red-500 text-xs">{errors.nik.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="birthPlace" className="text-sm font-semibold text-gray-900">Tempat Lahir</label>
                <TextInput id="birthPlace" placeholder="Kota Kelahiran" {...register("birthPlace")} />
                {errors.birthPlace && <p className="text-red-500 text-xs">{errors.birthPlace.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="birthDate" className="text-sm font-semibold text-gray-900">Tanggal Lahir</label>
                <input 
                  id="birthDate" 
                  type="date" 
                  {...register("birthDate")} 
                  className="flex h-10 w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted" 
                />
                {errors.birthDate && <p className="text-red-500 text-xs">{errors.birthDate.message}</p>}
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="gender" className="text-sm font-semibold text-gray-900">Jenis Kelamin</label>
                <div className="relative">
                  <select 
                    id="gender" 
                    className="flex h-10 w-full rounded-tremor-default border border-tremor-border bg-tremor-background pl-3 pr-10 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted appearance-none"
                    {...register("gender")}
                  >
                    <option value="">Pilih Jenis Kelamin...</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                  <RiArrowDownSLine className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
              </div>
            </div>
          </div>

          {/* Data Orang Tua */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Data Orang Tua / Wali</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="parentName" className="text-sm font-semibold text-gray-900">Nama Orang Tua</label>
                <TextInput id="parentName" placeholder="Nama Ayah / Ibu" {...register("parentName")} />
                {errors.parentName && <p className="text-red-500 text-xs">{errors.parentName.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-semibold text-gray-900">Nomor WhatsApp Aktif</label>
                <TextInput id="phone" type="tel" placeholder="0812-XXXX-XXXX" {...register("phone")} />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-900">Email (Opsional)</label>
                <TextInput id="email" type="email" placeholder="contoh@email.com" {...register("email")} />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="address" className="text-sm font-semibold text-gray-900">Alamat Lengkap</label>
                <textarea 
                  id="address" 
                  rows={3}
                  className="flex w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted"
                  placeholder="Masukkan alamat lengkap sesuai domisili..."
                  {...register("address")}
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-2xl px-8 py-4 font-semibold text-base shadow-sm hover:shadow transition-all border-none"
            >
              <span className="flex items-center gap-2">
                {isSubmitting ? "Memproses..." : "Kirim Pendaftaran"}
                {!isSubmitting && <RiSendPlaneFill className="w-5 h-5" />}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
