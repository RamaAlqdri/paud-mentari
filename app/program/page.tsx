import { Metadata } from "next";
import { Card, Badge } from "@tremor/react";
import { RiBearSmileLine, RiRocketLine, RiBookOpenLine, RiGraduationCapLine, RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Program Kami | PAUD Mentari",
  description: "Program dan kurikulum di PAUD Mentari",
};

export default function ProgramPage() {
  const programs = [
    {
      title: "Daycare",
      age: "Usia 1-3 Tahun",
      desc: "Layanan pengasuhan anak yang aman, nyaman, dan edukatif. Kami memastikan kebutuhan dasar, nutrisi, dan stimulasi awal anak terpenuhi selagi Anda bekerja.",
      icon: RiBearSmileLine,
      color: "text-brand-orange",
      bgColor: "bg-brand-yellow/20",
      hoverBg: "group-hover:bg-brand-orange",
      hoverText: "group-hover:text-white"
    },
    {
      title: "Playgroup",
      age: "Usia 3-4 Tahun",
      desc: "Program bermain sambil belajar untuk mengembangkan keterampilan sosial, emosional, dan motorik anak melalui kegiatan interaktif dan menyenangkan.",
      icon: RiRocketLine,
      color: "text-brand-blue",
      bgColor: "bg-brand-blue/10",
      hoverBg: "group-hover:bg-brand-blue",
      hoverText: "group-hover:text-white"
    },
    {
      title: "TK A",
      age: "Usia 4-5 Tahun",
      desc: "Fokus pada pengenalan dasar literasi, numerasi, dan pembentukan karakter. Anak-anak mulai diajak berpikir kritis melalui metode eksplorasi.",
      icon: RiBookOpenLine,
      color: "text-brand-pink",
      bgColor: "bg-brand-pink/10",
      hoverBg: "group-hover:bg-brand-pink",
      hoverText: "group-hover:text-white"
    },
    {
      title: "TK B",
      age: "Usia 5-6 Tahun",
      desc: "Persiapan matang menuju sekolah dasar. Menekankan pada kemandirian, kepercayaan diri, dan penguatan keterampilan akademik dasar secara seimbang.",
      icon: RiGraduationCapLine,
      color: "text-brand-yellow",
      bgColor: "bg-brand-yellow/20",
      hoverBg: "group-hover:bg-brand-yellow",
      hoverText: "group-hover:text-white"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pt-24">
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8 md:py-16">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-orange mb-4">Program Kami</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Kami menawarkan berbagai program pendidikan usia dini yang dirancang khusus untuk mendukung perkembangan optimal anak Anda, dari pengasuhan penuh cinta hingga persiapan masuk sekolah dasar.
          </p>
        </div>

        {/* Program Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((prog, idx) => (
            <Card key={idx} className="p-8 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full group">
              <div className="flex items-start justify-between mb-8">
                <div className={`w-16 h-16 rounded-2xl ${prog.bgColor} ${prog.color} flex items-center justify-center ${prog.hoverBg} ${prog.hoverText} transition-colors`}>
                  <prog.icon className="w-8 h-8" />
                </div>
                <Badge className="bg-gray-100 text-gray-600 font-semibold text-xs px-3 py-1 rounded-full border-none">
                  {prog.age}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{prog.title}</h3>
              <p className="text-gray-600 mb-8 flex-grow">
                {prog.desc}
              </p>
              <Link href="/ppdb" className="inline-flex items-center font-semibold text-brand-orange hover:text-brand-orange/80 transition-colors mt-auto">
                Pelajari lebih lanjut <RiArrowRightLine className="ml-1 w-4 h-4" />
              </Link>
            </Card>
          ))}
        </div>

        {/* Image Section */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-sm relative h-96">
          <div 
            className="bg-cover bg-center w-full h-full" 
            style={{ backgroundImage: "url('/program-supportfacilities.jpeg')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex flex-col justify-end p-8">
            <h2 className="text-3xl font-bold text-white mb-2">Fasilitas Mendukung</h2>
            <p className="text-white/90 max-w-xl">
              Lingkungan belajar yang dirancang khusus untuk memicu kreativitas dan kenyamanan anak-anak.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
