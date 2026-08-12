import Link from "next/link";
import { Button, Card } from "@tremor/react";
import { RiShieldCrossLine, RiEmotionHappyLine, RiPaletteLine } from "@remixicon/react";
import HeroCarousel from "@/components/hero-carousel";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Ambil 3 data guru terbaru untuk ditampilkan di Beranda
  const teachers = await prisma.teacher.findMany({
    where: { isActive: true },
    take: 3,
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow mt-24">
        {/* Hero Section */}
        <section className="px-6 py-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 flex flex-col gap-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-orange leading-tight">
              Bermain, Belajar, dan Tumbuh Bersama PAUD Mentari
            </h1>
            <p className="text-lg text-gray-700">
              Lingkungan yang aman, hangat, dan menyenangkan bagi si kecil untuk mengeksplorasi potensi terbaik mereka melalui metode pembelajaran yang interaktif.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/ppdb">
                <Button size="xl" className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white rounded-2xl px-8 py-4 font-semibold shadow-sm transition-all">
                  Mulai Sekarang
                </Button>
              </Link>
              <Link href="/program">
                <Button size="xl" variant="secondary" className="w-full sm:w-auto bg-gray-50 text-brand-orange border-2 border-brand-yellow px-8 py-4 rounded-2xl font-semibold hover:bg-brand-yellow/20 transition-all">
                  Lihat Program
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 bg-brand-yellow rounded-3xl transform rotate-3 opacity-20"></div>
            <HeroCarousel />
          </div>
        </section>

        {/* Feature Section */}
        <section className="bg-gray-50 py-16">
          <div className="px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-orange mb-4">Mengapa Memilih Kami?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Kami berdedikasi memberikan pengalaman terbaik untuk awal kehidupan anak Anda.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <Card className="p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-brand-yellow/20 text-brand-orange rounded-full flex items-center justify-center mb-6">
                  <RiShieldCrossLine className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fasilitas Aman</h3>
                <p className="text-gray-600">
                  Lingkungan belajar yang didesain khusus mengutamakan keamanan dan kenyamanan anak dalam setiap aktivitas fisik maupun kognitif.
                </p>
              </Card>
              {/* Card 2 */}
              <Card className="p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-brand-blue/20 text-brand-blue rounded-full flex items-center justify-center mb-6">
                  <RiEmotionHappyLine className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Pendidik Ramah</h3>
                <p className="text-gray-600">
                  Guru-guru yang berpengalaman, penuh kasih sayang, dan terlatih untuk mendampingi masa emas perkembangan anak Anda.
                </p>
              </Card>
              {/* Card 3 */}
              <Card className="p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-brand-pink/20 text-brand-pink rounded-full flex items-center justify-center mb-6">
                  <RiPaletteLine className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Kurikulum Kreatif</h3>
                <p className="text-gray-600">
                  Metode pembelajaran inovatif yang merangsang kreativitas, imajinasi, dan keterampilan sosial melalui bermain sambil belajar.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Teachers Section */}
        <section className="bg-white py-16">
          <div className="px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-orange mb-4">Pendidik Kami</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Mengenal Tim Pengajar Kami yang berdedikasi dalam membimbing tumbuh kembang buah hati Anda.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teachers.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">Belum ada data pendidik.</p>
              ) : (
                teachers.map((teacher) => (
                  <Card key={teacher.id} className="p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                    <div className="w-full h-64 overflow-hidden rounded-xl mb-4 bg-gray-100">
                      <img 
                        src={teacher.image || "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} 
                        alt={teacher.firstName} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{teacher.firstName} {teacher.lastName}</h3>
                    <p className="text-gray-600">{teacher.employmentStatus}</p>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CTA Section (Pindah dari halaman Guru) */}
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <Card className="text-center bg-brand-yellow/20 border-none rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ingin Bertemu Langsung?</h2>
              <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
                Kami mengundang Ayah dan Bunda untuk mengunjungi fasilitas kami atau berdiskusi langsung mengenai program pendidikan yang kami tawarkan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="xl" className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-2xl px-8 py-4 font-semibold shadow-sm border-none w-full sm:w-auto">
                  Kunjungi Kami
                </Button>
                <Button size="xl" variant="secondary" className="bg-white hover:bg-gray-50 text-brand-orange border-brand-orange/20 rounded-2xl px-8 py-4 font-semibold w-full sm:w-auto">
                  Hubungi via WhatsApp
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
