import { Metadata } from "next";
import { RiMapPinLine, RiPhoneLine, RiMailLine, RiTimeLine } from "@remixicon/react";
import { Card } from "@tremor/react";

export const metadata: Metadata = {
  title: "Kontak | PAUD Mentari",
  description: "Hubungi PAUD Mentari",
};

export default function KontakPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hubungi Kami</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami siap menjawab semua pertanyaan Anda mengenai pendaftaran, program, maupun fasilitas PAUD Mentari.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-slate-50">
              <div className="flex items-start gap-4 p-6">
                <RiMapPinLine className="text-brand-orange h-6 w-6 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Alamat</h3>
                  <p className="text-muted-foreground mt-1">Jl. Pendidikan No. 123<br/>Kecamatan Ilmu, Kota Cerdas 12345</p>
                </div>
              </div>
            </Card>
            
            <Card className="border-none shadow-sm bg-slate-50">
              <div className="flex items-start gap-4 p-6">
                <RiPhoneLine className="text-brand-blue h-6 w-6 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">WhatsApp / Telepon</h3>
                  <p className="text-muted-foreground mt-1">+62 812 3456 7890<br/>(021) 1234567</p>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-sm bg-slate-50">
              <div className="flex items-start gap-4 p-6">
                <RiMailLine className="text-brand-pink h-6 w-6 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-muted-foreground mt-1">info@paudmentari.com</p>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-sm bg-slate-50">
              <div className="flex items-start gap-4 p-6">
                <RiTimeLine className="text-brand-green h-6 w-6 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Jam Operasional</h3>
                  <p className="text-muted-foreground mt-1">Senin - Jumat: 07.00 - 14.00 WIB<br/>Sabtu - Minggu: Tutup</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="h-full min-h-[400px] bg-slate-200 rounded-xl flex items-center justify-center">
            {/* Integrasi Google Maps embed bisa ditaruh di sini */}
            <p className="text-muted-foreground">Peta Google Maps</p>
          </div>
        </div>
      </div>
    </div>
  );
}
