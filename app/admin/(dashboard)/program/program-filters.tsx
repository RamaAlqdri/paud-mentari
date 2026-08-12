"use client";

import { TextInput, Select, SelectItem } from "@tremor/react";
import { RiSearchLine, RiAddLine } from "@remixicon/react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function ProgramFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category && category !== "all") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status && status !== "all") {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full justify-between items-center">
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <div className="relative w-full sm:w-64">
          <TextInput 
            icon={RiSearchLine} 
            placeholder="Cari nama program..." 
            className="w-full" 
            defaultValue={searchParams.get("search")?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Select 
          className="w-full sm:w-48" 
          placeholder="Semua Kategori"
          value={searchParams.get("category")?.toString() || "all"}
          onValueChange={handleCategoryChange}
        >
          <SelectItem value="all">Semua Kategori</SelectItem>
          <SelectItem value="Intrakurikuler">Intrakurikuler</SelectItem>
          <SelectItem value="Ekstrakurikuler">Ekstrakurikuler</SelectItem>
          <SelectItem value="Pengembangan Diri">Pengembangan Diri</SelectItem>
          <SelectItem value="Layanan Khusus">Layanan Khusus</SelectItem>
        </Select>
        <Select 
          className="w-full sm:w-40" 
          placeholder="Semua Status"
          value={searchParams.get("status")?.toString() || "all"}
          onValueChange={handleStatusChange}
        >
          <SelectItem value="all">Semua Status</SelectItem>
          <SelectItem value="active">Aktif</SelectItem>
          <SelectItem value="inactive">Nonaktif</SelectItem>
        </Select>
      </div>
      
      <Link 
        href="/admin/program/create"
        className="w-full md:w-auto px-4 py-2 rounded-lg bg-brand-orange text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-brand-orange/90 transition-all shadow-sm whitespace-nowrap"
      >
        <RiAddLine className="w-4 h-4" />
        Tambah Program
      </Link>
    </div>
  );
}
