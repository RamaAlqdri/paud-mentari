import Link from "next/link";
import { Button, Card } from "@tremor/react";
import { RiBookOpenLine, RiTeamLine, RiHeartLine, RiStarLine, RiArrowRightLine } from "@remixicon/react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-yellow/10 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-brand-orange text-white hover:bg-brand-orange/80 mb-6">
            Pendaftaran 2026/2027 Telah Dibuka
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Membangun Karakter, <br className="hidden md:block" />
            <span className="text-brand-orange">Mencerahkan Masa Depan</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            PAUD Mentari hadir dengan pendekatan belajar yang menyenangkan, interaktif, dan penuh kasih sayang untuk pertumbuhan optimal anak Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ppdb">
              <Button size="xl" className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full shadow-sm">
                Daftar Sekarang <RiArrowRightLine className="inline-block ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/tentang">
              <Button size="xl" variant="secondary" className="w-full sm:w-auto rounded-full px-8 border-gray-300">
                Kenali Kami Lebih Dekat
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nilai Utama */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Mengapa Memilih PAUD Mentari?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Kami mengedepankan pendidikan berbasis karakter dan kebahagiaan anak.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: RiBookOpenLine, title: "Kurikulum Modern", desc: "Menggabungkan kurikulum nasional dengan metode montessori.", color: "text-brand-blue" },
              { icon: RiHeartLine, title: "Penuh Kasih", desc: "Lingkungan belajar yang aman, nyaman, dan mendukung mental anak.", color: "text-brand-pink" },
              { icon: RiTeamLine, title: "Guru Profesional", desc: "Dididik oleh pendidik berpengalaman dan bersertifikasi.", color: "text-brand-orange" },
              { icon: RiStarLine, title: "Fasilitas Lengkap", desc: "Area bermain indoor dan outdoor yang memadai.", color: "text-brand-yellow" },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow group">
                <div className="pt-2 text-center flex flex-col items-center">
                  <div className={`p-4 rounded-full bg-slate-50 mb-4 group-hover:scale-110 transition-transform ${item.color}`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-blue/10 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Bergabung dengan Keluarga Mentari?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Jangan lewatkan kesempatan untuk memberikan awal yang terbaik bagi pendidikan anak Anda. Kuota terbatas!
          </p>
          <Link href="/ppdb">
            <Button size="xl" className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-full px-10 shadow-md">
              Mulai Pendaftaran Online
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
