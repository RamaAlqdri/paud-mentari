import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Program Unggulan | PAUD Mentari",
  description: "Program dan kurikulum di PAUD Mentari",
};

export default async function ProgramPage() {
  const programData = await prisma.program.findMany();

  return (
    <div className="py-16 md:py-24 bg-slate-50 min-h-screen">
      <div className="container px-4 md:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Program Unggulan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kurikulum kami didesain khusus untuk menstimulasi berbagai kecerdasan majemuk anak usia dini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {programData.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">Data program sedang diperbarui.</p>
          ) : (
            programData.map((program) => (
              <Card key={program.id} className="border-none shadow-sm hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 rounded-xl bg-white shadow-sm text-brand-orange">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle>{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{program.description}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
