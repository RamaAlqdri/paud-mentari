"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateArtikel } from "@/actions/admin-crud";
import { Button, Card, TextInput } from "@tremor/react";
import { RiSave3Fill, RiArrowDownSLine } from "@remixicon/react";
import Link from "next/link";
import { StatusModal } from "@/components/status-modal";
import { useRouter } from "next/navigation";

const articleSchema = z.object({
  title: z.string().min(5, "Judul artikel minimal 5 karakter"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  excerpt: z.string().min(10, "Ringkasan minimal 10 karakter"),
  content: z.string().min(20, "Isi konten artikel minimal 20 karakter"),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

interface EditArticleFormProps {
  id: string;
  initialData: {
    title: string;
    category: string;
    excerpt: string;
    content: string;
    thumbnail: string | null;
  };
}

export default function EditArticleForm({ id, initialData }: EditArticleFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: initialData.title,
      category: initialData.category,
      excerpt: initialData.excerpt,
      content: initialData.content,
    }
  });

  const onSubmit = async (data: ArticleFormValues) => {
    setIsSubmitting(true);
    setResultMessage(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || "");
    });
    
    // thumbnail file input is handled separately if needed, but since it's unregistered from z.object
    // we get it from the native form element via the submit event if we wanted, or we can just let register handle it
    // Wait, the Zod schema doesn't have thumbnail, but we registered it in the form.
    // To ensure thumbnail is passed, we can intercept the form element.
    const formElement = document.getElementById("editArticleForm") as HTMLFormElement;
    if (formElement) {
      const fileInput = formElement.elements.namedItem("thumbnail") as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append("thumbnail", fileInput.files[0]);
      }
    }

    try {
      const result = await updateArtikel(id, formData);

      if (result.success) {
        setResultMessage({ type: "success", text: "Perubahan artikel berhasil disimpan." });
      } else {
        setResultMessage({ type: "error", text: result.message || "Gagal menyimpan perubahan." });
      }
    } catch (err) {
      setResultMessage({ type: "error", text: "Terjadi kesalahan internal." });
    } finally {
      setIsSubmitting(false);
    }
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
            label: "Kembali ke Daftar Artikel",
            onClick: () => router.push("/admin/artikel")
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
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-orange mb-3">Edit Artikel</h1>
          <p className="text-gray-600">Perbarui informasi, isi konten, atau gambar cover artikel ini.</p>
        </div>        <form id="editArticleForm" onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Informasi Dasar */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Informasi Dasar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="title" className="text-sm font-semibold text-gray-900">Judul Artikel</label>
                <TextInput id="title" placeholder="Contoh: Kegiatan Porseni PAUD 2026" {...register("title")} />
                {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-sm font-semibold text-gray-900">Kategori Publikasi</label>
                <div className="relative">
                  <select 
                    id="category" 
                    className="flex h-10 w-full rounded-tremor-default border border-tremor-border bg-tremor-background pl-3 pr-10 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted appearance-none"
                    {...register("category")}
                  >
                    <option value="">Pilih Kategori...</option>
                    <option value="Umum">Umum</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Akademik">Akademik</option>
                  </select>
                  <RiArrowDownSLine className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="thumbnail" className="text-sm font-semibold text-gray-900">Gambar Cover (Opsional)</label>
                <input 
                  id="thumbnail" 
                  name="thumbnail"
                  type="file" 
                  accept="image/*"
                  className="flex h-10 w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-1.5 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted file:border-0 file:bg-gray-100 file:px-3 file:py-1 file:rounded-md file:text-xs file:font-semibold file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                />
                {initialData.thumbnail && (
                  <p className="text-xs text-gray-500 mt-1">
                    Saat ini: <a href={initialData.thumbnail} target="_blank" className="text-brand-orange hover:underline">Lihat Gambar Lama</a>
                    <br/>(Biarkan kosong jika tidak ingin mengubah gambar)
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Konten Utama */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Isi Konten</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="excerpt" className="text-sm font-semibold text-gray-900">Ringkasan (Excerpt)</label>
                <textarea 
                  id="excerpt" 
                  rows={2}
                  className="flex w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted"
                  placeholder="Satu atau dua kalimat pemancing minat pembaca..."
                  {...register("excerpt")}
                />
                {errors.excerpt && <p className="text-red-500 text-xs">{errors.excerpt.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="content" className="text-sm font-semibold text-gray-900">Konten Penuh</label>
                <textarea 
                  id="content" 
                  rows={12}
                  className="flex w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted"
                  placeholder="Tuliskan isi artikel Anda di sini..."
                  {...register("content")}
                />
                {errors.content && <p className="text-red-500 text-xs">{errors.content.message}</p>}
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="/admin/artikel"
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
