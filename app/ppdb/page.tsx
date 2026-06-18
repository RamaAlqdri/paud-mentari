import { Metadata } from "next";
import PPDBFormClient from "./form-client";

export const metadata: Metadata = {
  title: "Pendaftaran PPDB | PAUD Mentari",
  description: "Formulir Pendaftaran Peserta Didik Baru (PPDB) PAUD Mentari",
};

export default function PPDBPage() {
  return (
    <div className="py-16 md:py-24 bg-slate-50 min-h-screen">
      <div className="container px-4 md:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-brand-orange text-white mb-6">
            Pendaftaran 2026/2027
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Formulir PPDB Online</h1>
          <p className="text-muted-foreground">
            Lengkapi data diri anak dan orang tua dengan benar. Pastikan NIK anak sesuai dengan Kartu Keluarga.
          </p>
        </div>

        <PPDBFormClient />
      </div>
    </div>
  );
}
