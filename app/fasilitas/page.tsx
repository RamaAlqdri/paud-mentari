import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Fasilitas | PAUD Mentari",
  description: "Fasilitas yang tersedia di PAUD Mentari",
};

export default async function FasilitasPage() {
  const fasilitasData = await prisma.facility.findMany();
  
  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Fasilitas Kami</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            PAUD Mentari menyediakan fasilitas terbaik untuk menunjang tumbuh kembang anak didik.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {fasilitasData.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">Fasilitas sedang diperbarui.</p>
          ) : (
            fasilitasData.map((item) => (
              <Card key={item.id} className="border border-brand-blue/20 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                <div className="h-48 bg-slate-200 w-full relative overflow-hidden flex items-center justify-center">
                  <span className="text-muted-foreground">Foto {item.title}</span>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
