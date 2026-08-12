"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateProgram } from "@/actions/admin-crud";
import { Button, Card, TextInput, Select, SelectItem } from "@tremor/react";
import { RiCheckboxCircleFill, RiSave3Fill } from "@remixicon/react";
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
    setValue,
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
      formData.append(key, value);
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

  return (
    <Card className="w-full bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm relative">
      {resultMessage?.type === "success" && (
        <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-8 text-center rounded-2xl animate-[fadeIn_0.5s_ease-out]">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <RiCheckboxCircleFill className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-emerald-600 mb-4">Tersimpan!</h2>
          <p className="text-lg text-gray-600 mb-8">{resultMessage.text}</p>
          <div className="flex gap-4">
            <Button onClick={() => router.push("/admin/program")} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl px-8 py-3 border-none">
              Kembali ke Daftar
            </Button>
            <Button variant="secondary" onClick={() => setResultMessage(null)} className="bg-gray-50 text-gray-700 rounded-2xl px-8 py-3 border">
              Lanjut Mengedit
            </Button>
          </div>
        </div>
      )}

      <div className={resultMessage?.type === "success" ? "opacity-0" : "opacity-100"}>
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-brand-orange mb-2">Edit Program</h1>
          <p className="text-gray-600">Perbarui informasi program sekolah.</p>
        </div>
        
        {resultMessage?.type === "error" && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-200">
            {resultMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-900 block mb-2">Nama Program *</label>
              <TextInput placeholder="Contoh: Menggambar Ceria" {...register("title")} />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-900 block mb-2">Kategori *</label>
              <Select defaultValue={initialData.category} onValueChange={(val) => setValue("category", val)}>
                <SelectItem value="Intrakurikuler">Intrakurikuler</SelectItem>
                <SelectItem value="Ekstrakurikuler">Ekstrakurikuler</SelectItem>
                <SelectItem value="Pengembangan Diri">Pengembangan Diri</SelectItem>
                <SelectItem value="Layanan Khusus">Layanan Khusus</SelectItem>
              </Select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-900 block mb-2">Deskripsi Program *</label>
              <textarea 
                rows={5}
                className="flex w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted"
                placeholder="Tuliskan deskripsi atau penjelasan lengkap tentang program ini..."
                {...register("description")}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-4">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl px-8 py-3 border-none"
            >
              <span className="flex items-center gap-2">
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
