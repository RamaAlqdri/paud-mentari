import { Metadata } from "next";
import { Card, Badge } from "@tremor/react";
import { RiAwardFill, RiHeart3Fill, RiPaletteFill, RiBookOpenFill } from "@remixicon/react";

export const metadata: Metadata = {
  title: "Pendidik Kami | PAUD Mentari",
  description: "Profil tenaga pendidik di PAUD Mentari",
};

import { prisma } from "@/lib/prisma";

export default async function GuruPage() {
  const dbTeachers = await prisma.teacher.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" }
  });

  const teachers = dbTeachers.map((teacher, index) => {
    const badgeColors = [
      "bg-brand-yellow/20 text-brand-orange",
      "bg-brand-blue/20 text-brand-blue",
      "bg-brand-pink/20 text-brand-pink"
    ];
    
    return {
      id: teacher.id,
      name: `${teacher.firstName} ${teacher.lastName || ""}`.trim(),
      position: teacher.employmentStatus,
      bio: teacher.bio || "Berdedikasi untuk pendidikan anak usia dini.",
      image: teacher.image || "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badgeColor: badgeColors[index % 3]
    };
  });

  const values = [
    {
      title: "Berpengalaman",
      desc: "Tim pendidik bersertifikasi dengan jam terbang tinggi.",
      icon: RiAwardFill,
      iconColor: "text-brand-orange",
      iconBg: "bg-brand-yellow/20"
    },
    {
      title: "Sabar & Penyayang",
      desc: "Pendekatan yang penuh kasih sayang untuk setiap anak.",
      icon: RiHeart3Fill,
      iconColor: "text-brand-pink",
      iconBg: "bg-brand-pink/20"
    },
    {
      title: "Kreatif Inovatif",
      desc: "Metode belajar yang selalu diperbarui dan menyenangkan.",
      icon: RiPaletteFill,
      iconColor: "text-brand-blue",
      iconBg: "bg-brand-blue/20"
    },
    {
      title: "Pembelajar Sepanjang Hayat",
      desc: "Terus mengembangkan diri melalui pelatihan berkala.",
      icon: RiBookOpenFill,
      iconColor: "text-gray-700",
      iconBg: "bg-gray-100"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pt-24">
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8 md:py-16">
        
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-orange mb-6 max-w-4xl mx-auto">
            Mengenal Lebih Dekat Pendidik PAUD Mentari
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tim pendidik kami berdedikasi penuh untuk menciptakan lingkungan belajar yang hangat, aman, dan merangsang kreativitas anak usia dini. Kenali mereka lebih dekat.
          </p>
        </section>

        {/* Main Team Grid */}
        <section className="bg-gray-50 rounded-[2rem] p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((guru) => (
              <Card key={guru.id} className="p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={guru.image} alt={guru.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={`font-semibold text-xs px-3 py-1 rounded-full border-none ${guru.badgeColor}`}>
                    {guru.position}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{guru.name}</h3>
                <p className="text-gray-600 leading-relaxed">{guru.bio}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-orange mb-12">
            Mengapa Memilih Kami?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <Card key={idx} className="p-6 rounded-2xl flex flex-col items-center text-center border border-gray-200 hover:border-brand-orange/30 transition-colors">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${val.iconBg} ${val.iconColor}`}>
                  <val.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{val.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{val.desc}</p>
              </Card>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
