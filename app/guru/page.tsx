import { Metadata } from "next";
import { Card } from "@tremor/react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Guru & Staff | PAUD Mentari",
  description: "Profil tenaga pendidik di PAUD Mentari",
};

export default async function GuruPage() {
  const guruData = await prisma.teacher.findMany();

  return (
    <div className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tenaga Pendidik</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Berkenalan dengan guru-guru profesional yang berdedikasi tinggi membimbing putra-putri Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {guruData.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">Profil tenaga pendidik belum ditambahkan.</p>
          ) : (
            guruData.map((guru) => (
              <Card key={guru.id} className="border-none shadow-sm text-center">
                <div className="pt-8 pb-4 flex justify-center">
                  <div className="h-24 w-24 rounded-full bg-slate-200"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{guru.name}</h3>
                  <p className="text-sm text-brand-orange font-medium mb-3">{guru.position}</p>
                  <p className="text-xs text-muted-foreground">{guru.bio}</p>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
