"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@tremor/react"
import { RiMenuLine } from "@remixicon/react"

const routes = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/program", label: "Program" },
  { href: "/guru", label: "Guru" },
  { href: "/artikel", label: "Artikel" },
  { href: "/ppdb", label: "PPDB" },
]

import Image from "next/image"
import { useState } from "react"
import { RiCloseLine } from "@remixicon/react"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Sembunyikan navbar di area admin
  if (pathname?.startsWith("/admin")) return null

  return (
    <header className="bg-white shadow-sm fixed top-0 w-full z-50">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
          <Image src="/logo-landscape.png" alt="Logo PAUD Mentari" width={180} height={40} className="object-contain" priority />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "px-3 py-2 rounded-lg text-sm transition-all",
                pathname === route.href
                  ? "text-brand-orange font-bold border-b-2 border-brand-orange pb-1 rounded-none"
                  : "text-gray-600 hover:text-brand-orange hover:bg-gray-50 font-medium"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/ppdb" className="hidden md:block">
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-2xl px-6 py-3 font-semibold transition-all hover:scale-95 duration-200">
              Daftar Sekarang
            </Button>
          </Link>
          <Button 
            variant="light" 
            className="md:hidden text-brand-orange"
            onClick={() => setIsOpen(!isOpen)}
          >
             {isOpen ? <RiCloseLine className="h-6 w-6" /> : <RiMenuLine className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full shadow-lg">
          <nav className="flex flex-col p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 text-base transition-all rounded-xl",
                  pathname === route.href
                    ? "text-brand-orange font-bold bg-orange-50"
                    : "text-gray-600 font-medium hover:bg-gray-50 hover:text-brand-orange"
                )}
              >
                {route.label}
              </Link>
            ))}
            <Link href="/ppdb" onClick={() => setIsOpen(false)} className="mt-4 px-4">
              <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl py-3 font-semibold transition-all">
                Daftar Sekarang
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
