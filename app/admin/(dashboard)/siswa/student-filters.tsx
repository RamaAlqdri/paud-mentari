"use client";

import { TextInput, Select, SelectItem } from "@tremor/react";
import { RiSearchLine } from "@remixicon/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { startTransition } from "react";

export default function StudentFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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

  const handleGenderChange = (gender: string) => {
    const params = new URLSearchParams(searchParams);
    if (gender && gender !== "all") {
      params.set("gender", gender);
    } else {
      params.delete("gender");
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
            placeholder="Cari nama anak atau NIK..." 
            className="w-full" 
            defaultValue={searchParams.get("search")?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        <Select 
          className="w-full sm:w-40" 
          placeholder="Jenis Kelamin"
          value={searchParams.get("gender")?.toString() || "all"}
          onValueChange={handleGenderChange}
        >
          <SelectItem value="all">Semua Kelamin</SelectItem>
          <SelectItem value="Laki-laki">Laki-laki</SelectItem>
          <SelectItem value="Perempuan">Perempuan</SelectItem>
        </Select>

        <Select 
          className="w-full sm:w-40" 
          placeholder="Status"
          value={searchParams.get("status")?.toString() || "all"}
          onValueChange={handleStatusChange}
        >
          <SelectItem value="all">Semua Status</SelectItem>
          <SelectItem value="aktif">Aktif</SelectItem>
          <SelectItem value="nonaktif">Nonaktif</SelectItem>
        </Select>
      </div>
    </div>
  );
}
