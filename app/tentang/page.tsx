import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@tremor/react";
import { 
  RiStarSmileFill, 
  RiEyeLine, 
  RiShieldCheckLine, 
  RiGamepadLine, 
  RiBrainLine,
  RiPuzzleLine,
  RiPaletteLine,
  RiHeart3Fill,
  RiLightbulbFlashFill,
  RiShieldStarFill,
  RiArrowRightLine
} from "@remixicon/react";

export const metadata: Metadata = {
  title: "Tentang Kami | PAUD Mentari",
  description: "Sejarah, Visi, Misi, dan Nilai-nilai PAUD Mentari",
};

export default function TentangPage() {
  return (
    <main className="flex-grow pt-8 pb-16">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-200 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-brand-orange font-bold text-sm px-4 py-2 rounded-full w-max mb-2">
              <RiStarSmileFill className="w-5 h-5" />
              <span>Mengenal Kami Lebih Dekat</span>
            </div>
            <div className="relative w-64 h-24 md:w-80 md:h-28">
              <Image 
                src="/logo-landscape.png" 
                alt="Logo PAUD Mentari" 
                fill 
                className="object-contain object-left"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Membangun Masa Depan Cerah Sejak Dini
            </h1>
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Kami percaya bahwa setiap anak adalah bintang yang siap bersinar. PAUD Mentari hadir untuk memberikan lingkungan yang hangat, aman, dan penuh inspirasi bagi tumbuh kembang optimal buah hati Anda.
            </p>
          </div>
          <div className="relative h-[400px] lg:h-[500px] w-full rounded-[2rem] overflow-hidden shadow-xl group">
            <div className="absolute inset-0 bg-brand-orange/10 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
            <Image 
              alt="Anak-anak belajar dan bermain di PAUD Mentari" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="/aboutus-1.jpeg"
              fill
              sizes="(max-w-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Visi & Misi (Bento Grid) */}
      <section className="py-16 md:py-24 px-4 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Visi & Misi Kami</h2>
            <p className="text-gray-600">Kompas yang menuntun setiap langkah kami dalam mendidik generasi penerus.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Visi Card */}
            <Card className="md:col-span-1 p-8 rounded-3xl flex flex-col gap-6 shadow-sm border border-gray-200 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-brand-orange shadow-sm">
                <RiEyeLine className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Visi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi lembaga pendidikan anak usia dini terkemuka yang melahirkan generasi cerdas, ceria, dan berkarakter.
                </p>
              </div>
            </Card>
            
            {/* Misi Cards Container */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Misi 1 */}
              <Card className="p-8 rounded-3xl flex flex-col gap-4 shadow-sm border border-gray-200 hover:border-brand-orange/50 transition-colors">
                <div className="flex items-center gap-3">
                  <RiShieldCheckLine className="text-emerald-500 w-8 h-8 shrink-0" />
                  <h4 className="font-bold text-gray-900 uppercase tracking-wider text-sm">Lingkungan Aman</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Menyediakan lingkungan belajar yang aman, nyaman, dan menstimulasi eksplorasi anak secara positif.
                </p>
              </Card>
              
              {/* Misi 2 */}
              <Card className="p-8 rounded-3xl flex flex-col gap-4 shadow-sm border border-gray-200 hover:border-brand-orange/50 transition-colors">
                <div className="flex items-center gap-3">
                  <RiGamepadLine className="text-brand-orange w-8 h-8 shrink-0" />
                  <h4 className="font-bold text-gray-900 uppercase tracking-wider text-sm">Belajar Interaktif</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Menerapkan metode pembelajaran berbasis bermain yang interaktif, menyenangkan, dan berpusat pada anak.
                </p>
              </Card>
              
              {/* Misi 3 */}
              <Card className="p-8 rounded-3xl flex flex-col gap-4 shadow-sm border border-gray-200 hover:border-brand-orange/50 transition-colors sm:col-span-2">
                <div className="flex items-center gap-3">
                  <RiBrainLine className="text-blue-500 w-8 h-8 shrink-0" />
                  <h4 className="font-bold text-gray-900 uppercase tracking-wider text-sm">Pembangunan Karakter</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Menanamkan nilai-nilai moral, kemandirian, dan budi pekerti luhur sebagai pondasi karakter yang kuat sejak usia dini.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah Kami (Asymmetric Image/Text) */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 w-full order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden h-64 mt-12 shadow-md relative">
                <Image 
                  alt="Sejarah awal mula" 
                  className="w-full h-full object-cover" 
                  src="/aboutus-2.jpeg"
                  fill sizes="(max-w-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="rounded-3xl overflow-hidden h-80 shadow-md relative">
                <Image 
                  alt="Perkembangan sekolah" 
                  className="w-full h-full object-cover" 
                  src="/aboutus-3.jpeg"
                  fill sizes="(max-w-width: 768px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col gap-6 order-1 lg:order-2 lg:pl-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Kisah Singkat Kami</h2>
            <div className="text-gray-600 flex flex-col gap-4 leading-relaxed">
              <p>
                Berawal dari sebuah mimpi kecil di tahun 2015, sekelompok pendidik dan orang tua di lingkungan kami menyadari kebutuhan akan ruang bermain sekaligus belajar yang aman dan berkualitas. Ruang di mana anak-anak tidak sekadar dijaga, tetapi dibimbing dengan penuh cinta.
              </p>
              <p>
                PAUD Mentari bermula di sebuah rumah sederhana yang disulap menjadi taman bermain penuh warna. Dengan semangat kebersamaan dan dedikasi untuk masa depan, kami mulai menyusun kurikulum awal yang berfokus pada kebahagiaan anak saat mengeksplorasi dunia di sekitarnya.
              </p>
              <p>
                Kini, PAUD Mentari telah berkembang menjadi fasilitas pendidikan modern yang dipercaya oleh ratusan keluarga. Meski gedung dan fasilitas kami bertumbuh, nilai inti kami tetap sama: setiap anak berhak mendapatkan awalan yang hangat dan cerah dalam perjalanan hidup mereka.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metode Pembelajaran (Radiant Simplicity Style) */}
      <section className="py-16 md:py-24 px-4 bg-gray-50 relative overflow-hidden border-y border-gray-100">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Metode Radiant Simplicity</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pendekatan belajar kami dirancang untuk meminimalkan beban kognitif anak, memberikan ruang luas untuk imajinasi, dan menstimulasi rasa ingin tahu alami mereka.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {/* Method 1 */}
          <Card className="p-8 rounded-[2rem] flex flex-col sm:flex-row items-start gap-6 hover:bg-white transition-colors shadow-sm border border-gray-200/60 bg-white/60 backdrop-blur-md">
            <div className="w-16 h-16 shrink-0 rounded-full bg-orange-50 flex items-center justify-center text-brand-orange border-2 border-orange-100">
              <RiPuzzleLine className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Belajar Melalui Bermain</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Bermain adalah &apos;pekerjaan&apos; utama anak. Kami merancang aktivitas bermain yang terstruktur ringan untuk mengajarkan konsep dasar berhitung, bahasa, dan sosial.</p>
            </div>
          </Card>
          
          {/* Method 2 */}
          <Card className="p-8 rounded-[2rem] flex flex-col sm:flex-row items-start gap-6 hover:bg-white transition-colors shadow-sm border border-gray-200/60 bg-white/60 backdrop-blur-md">
            <div className="w-16 h-16 shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border-2 border-blue-100">
              <RiPaletteLine className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Eksplorasi Kreatif</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Anak-anak diberikan kebebasan mengekspresikan diri melalui seni, musik, dan gerak dalam lingkungan fisik yang lapang dan tidak membatasi ruang gerak.</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Nilai Utama */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-16">Nilai-Nilai Utama</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-12 md:gap-24 items-center">
            {/* Value 1 */}
            <div className="flex flex-col items-center text-center gap-4 group cursor-default">
              <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center shadow-sm border border-gray-100 group-hover:bg-red-50 transition-all duration-300 group-hover:scale-110">
                <RiHeart3Fill className="w-12 h-12 text-red-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Kasih Sayang</h3>
            </div>
            
            {/* Value 2 */}
            <div className="flex flex-col items-center text-center gap-4 group cursor-default">
              <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center shadow-sm border border-gray-100 group-hover:bg-yellow-50 transition-all duration-300 group-hover:scale-110">
                <RiLightbulbFlashFill className="w-12 h-12 text-yellow-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Kreativitas</h3>
            </div>
            
            {/* Value 3 */}
            <div className="flex flex-col items-center text-center gap-4 group cursor-default">
              <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center shadow-sm border border-gray-100 group-hover:bg-emerald-50 transition-all duration-300 group-hover:scale-110">
                <RiShieldStarFill className="w-12 h-12 text-emerald-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Integritas</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-brand-orange text-white rounded-[2.5rem] p-8 md:p-16 text-center shadow-lg shadow-brand-orange/20 flex flex-col items-center gap-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>
          <h2 className="text-3xl md:text-5xl font-extrabold relative z-10">Mari Bergabung Bersama Kami</h2>
          <p className="text-lg md:text-xl max-w-2xl relative z-10 opacity-90">
            Daftarkan putra-putri Anda sekarang dan jadilah bagian dari keluarga besar PAUD Mentari untuk mengawali langkah cerah mereka.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 relative z-10">
            <Link 
              href="/ppdb" 
              className="bg-white text-brand-orange font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-all shadow-sm flex items-center justify-center gap-2 group"
            >
              Daftar Sekarang
              <RiArrowRightLine className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="https://wa.me/6281234567890" 
              target="_blank"
              className="bg-brand-orange border-2 border-white/80 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
