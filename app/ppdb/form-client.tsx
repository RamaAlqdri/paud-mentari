"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitPPDB } from "@/actions/ppdb";
import { Button, Card, TextInput } from "@tremor/react";

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
      // Panggil Server Action
      const result = await submitPPDB(null, formData);

      if (result.success) {
        setResultMessage({ type: "success", text: result.message || "Pendaftaran berhasil" });
        reset(); // Kosongkan form
      } else {
        setResultMessage({ type: "error", text: result.message || "Pendaftaran gagal" });
      }
    } catch (err) {
      setResultMessage({ type: "error", text: "Terjadi kesalahan internal." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (resultMessage?.type === "success") {
    return (
      <Card className="border-green-200 bg-green-50">
        <div className="pt-6 text-center text-green-800">
          <h3 className="text-xl font-bold mb-2">Pendaftaran Berhasil!</h3>
          <p>{resultMessage.text}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-md">
      <div className="pt-6">
        {resultMessage?.type === "error" && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 text-sm">
            {resultMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Data Anak</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="childName" className="text-sm font-medium">Nama Lengkap Anak</label>
                <TextInput id="childName" placeholder="Contoh: Budi Santoso" {...register("childName")} />
                {errors.childName && <p className="text-red-500 text-xs">{errors.childName.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="nik" className="text-sm font-medium">NIK Anak (Sesuai KK)</label>
                <TextInput id="nik" type="number" placeholder="16 digit NIK" {...register("nik")} />
                {errors.nik && <p className="text-red-500 text-xs">{errors.nik.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="birthPlace" className="text-sm font-medium">Tempat Lahir</label>
                <TextInput id="birthPlace" placeholder="Contoh: Jakarta" {...register("birthPlace")} />
                {errors.birthPlace && <p className="text-red-500 text-xs">{errors.birthPlace.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="birthDate" className="text-sm font-medium">Tanggal Lahir</label>
                <input id="birthDate" type="date" {...register("birthDate")} className="flex h-10 w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted" />
                {errors.birthDate && <p className="text-red-500 text-xs">{errors.birthDate.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="gender" className="text-sm font-medium">Jenis Kelamin</label>
                <select 
                  id="gender" 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  {...register("gender")}
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-semibold text-lg border-b pb-2">Data Orang Tua / Wali</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="parentName" className="text-sm font-medium">Nama Orang Tua</label>
                <TextInput id="parentName" placeholder="Contoh: Anton Santoso" {...register("parentName")} />
                {errors.parentName && <p className="text-red-500 text-xs">{errors.parentName.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Nomor HP (WhatsApp)</label>
                <TextInput id="phone" type="tel" placeholder="Contoh: 081234567890" {...register("phone")} />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="email" className="text-sm font-medium">Email (Opsional)</label>
                <TextInput id="email" type="email" placeholder="Contoh: anton@email.com" {...register("email")} />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="address" className="text-sm font-medium">Alamat Lengkap Domisili</label>
                <textarea 
                  id="address" 
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Masukkan alamat lengkap..."
                  {...register("address")}
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold shadow-md py-3 mt-4">
            {isSubmitting ? "Memproses..." : "Kirim Formulir Pendaftaran"}
          </Button>
        </form>
      </div>
    </Card>
  );
}
