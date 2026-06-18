"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()

  // Sembunyikan footer di area admin
  if (pathname?.startsWith("/admin")) return null

  return (
    <footer className="border-t bg-secondary">
      <div className="container px-4 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-brand-yellow flex items-center justify-center font-bold text-foreground">
                M
              </div>
              <span className="font-bold text-lg">PAUD Mentari</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Menumbuhkan generasi cerdas, kreatif, dan berakhlak mulia dengan lingkungan belajar yang menyenangkan dan edukatif.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tentang" className="hover:text-brand-orange transition-colors">Tentang Kami</Link></li>
              <li><Link href="/program" className="hover:text-brand-orange transition-colors">Program Unggulan</Link></li>
              <li><Link href="/fasilitas" className="hover:text-brand-orange transition-colors">Fasilitas</Link></li>
              <li><Link href="/ppdb" className="hover:text-brand-orange transition-colors">Informasi Pendaftaran</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Kontak Kami</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Jl. Pendidikan No. 123, Kota Cerdas</li>
              <li>Telp: (021) 1234567</li>
              <li>Email: info@paudmentari.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PAUD Mentari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
