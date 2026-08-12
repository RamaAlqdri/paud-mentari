"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateProgram } from "@/actions/admin-crud";
import { Button, Card, TextInput } from "@tremor/react";
import { RiSave3Fill, RiArrowDownSLine } from "@remixicon/react";
import Link from "next/link";
import { StatusModal } from "@/components/status-modal";
import { useRouter } from "next/navigation";

const programSchema = z.object({
  title: z.string().min(3, "Judul program minimal 3 karakter"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
});

type ProgramFormValues = z.infer<typeof programSchema>;

export default function EditProgramForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      title: initialData.title,
      category: initialData.category,
      description: initialData.description
    }
  });

  const onSubmit = async (data: ProgramFormValues) => {
    setIsSubmitting(true);
    setResultMessage(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || "");
    });

    try {
      const result = await updateProgram(initialData.id, formData);

      if (result.success) {
        setResultMessage({ type: "success", text: "Perubahan program berhasil disimpan." });
      } else {
        setResultMessage({ type: "error", text: result.message || "Gagal menyimpan perubahan." });
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
      {/* Status Modal */}
      {resultMessage && (
        <StatusModal 
          isOpen={!!resultMessage}
          type={resultMessage.type}
          title={resultMessage.type === "success" ? "Tersimpan!" : "Gagal"}
          message={resultMessage.text}
          primaryAction={{
            label: "Kembali ke Daftar Program",
            onClick: () => router.push("/admin/program")
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
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-orange mb-3">Edit Program</h1>
          <p className="text-gray-600">Perbarui informasi, kategori, atau deskripsi program ini.</p>
        </div>        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Informasi Dasar */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Informasi Program</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="title" className="text-sm font-semibold text-gray-900">Nama Program *</label>
                <TextInput id="title" placeholder="Contoh: Menggambar Ceria" {...register("title")} />
                {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-sm font-semibold text-gray-900">Kategori Program *</label>
                <div className="relative">
                  <select 
                    id="category" 
                    className="flex h-10 w-full rounded-tremor-default border border-tremor-border bg-tremor-background pl-3 pr-10 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted appearance-none"
                    {...register("category")}
                  >
                    <option value="">Pilih Kategori...</option>
                    <option value="Intrakurikuler">Intrakurikuler</option>
                    <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                    <option value="Pengembangan Diri">Pengembangan Diri</option>
                    <option value="Layanan Khusus">Layanan Khusus</option>
                  </select>
                  <RiArrowDownSLine className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
              </div>
            </div>
          </div>

          {/* Konten Utama */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Deskripsi Detail</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-semibold text-gray-900">Deskripsi Program *</label>
                <textarea 
                  id="description" 
                  rows={6}
                  className="flex w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted"
                  placeholder="Tuliskan penjelasan lengkap mengenai program, tujuan, dan kegiatannya..."
                  {...register("description")}
                />
                {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="/admin/program"
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
