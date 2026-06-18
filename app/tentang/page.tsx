import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami | PAUD Mentari",
  description: "Sejarah, Visi, dan Misi PAUD Mentari",
};

export default function TentangPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Tentang PAUD Mentari</h1>
        
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-brand-orange border-b pb-2">Sejarah Kami</h2>
            <p className="text-muted-foreground leading-relaxed">
              PAUD Mentari didirikan pada tahun 2010 dengan tujuan sederhana: memberikan lingkungan pendidikan usia dini yang paling optimal di kota ini. Dimulai dengan hanya 15 anak didik, kini kami telah berkembang menjadi salah satu PAUD terkemuka yang dipercaya oleh ratusan orang tua setiap tahunnya.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-8 rounded-2xl">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-brand-blue">Visi</h2>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi lembaga pendidikan anak usia dini yang unggul dalam membentuk karakter, mencerdaskan secara holistik, dan berwawasan global berlandaskan nilai-nilai akhlak mulia.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-brand-pink">Misi</h2>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                <li>Menyediakan lingkungan belajar yang aman dan menyenangkan.</li>
                <li>Menerapkan pembelajaran aktif, inovatif, kreatif, dan menyenangkan.</li>
                <li>Membangun kerja sama yang baik dengan orang tua dan masyarakat.</li>
                <li>Menanamkan nilai-nilai kejujuran, disiplin, dan empati.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
