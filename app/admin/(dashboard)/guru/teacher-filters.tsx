"use client";

import { TextInput, Select, SelectItem } from "@tremor/react";
import { RiSearchLine, RiAddLine } from "@remixicon/react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function TeacherFilters() {
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
        <div className="relative w-full sm:w-80">
          <TextInput 
            icon={RiSearchLine} 
            placeholder="Cari nama atau NIK guru..." 
            className="w-full" 
            defaultValue={searchParams.get("search")?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Select 
          className="w-full sm:w-40" 
          placeholder="Semua Status"
          value={searchParams.get("status")?.toString() || "all"}
          onValueChange={handleStatusChange}
        >
          <SelectItem value="all">Semua</SelectItem>
          <SelectItem value="aktif">Aktif</SelectItem>
          <SelectItem value="nonaktif">Nonaktif</SelectItem>
        </Select>
      </div>
      
      <Link 
        href="/admin/guru/create"
        className="w-full md:w-auto px-4 py-2 rounded-lg bg-brand-orange text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-brand-orange/90 transition-all shadow-sm whitespace-nowrap"
      >
        <RiAddLine className="w-4 h-4" />
        Tambah Guru
      </Link>
    </div>
  );
}
