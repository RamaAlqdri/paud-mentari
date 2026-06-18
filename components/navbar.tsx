"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

const routes = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/program", label: "Program" },
  { href: "/guru", label: "Guru" },
  { href: "/fasilitas", label: "Fasilitas" },
  { href: "/artikel", label: "Artikel" },
  { href: "/ppdb", label: "PPDB" },
]

export function Navbar() {
  const pathname = usePathname()

  // Sembunyikan navbar di area admin
  if (pathname?.startsWith("/admin")) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-brand-yellow flex items-center justify-center font-bold text-foreground">
            M
          </div>
          <span className="hidden font-bold sm:inline-block">
            PAUD Mentari
          </span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-brand-orange",
                pathname === route.href
                  ? "text-foreground font-semibold"
                  : "text-foreground/60"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href="/ppdb">
              <Button className="hidden md:inline-flex bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold shadow-sm">
                Daftar Sekarang
              </Button>
            </Link>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
