"use client";

import { TextInput, Select, SelectItem } from "@tremor/react";
import { RiSearchLine } from "@remixicon/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function PPDBFilters() {
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
    params.set("page", "1");
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
    params.set("page", "1");
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
      <div className="relative w-full sm:w-64">
        <TextInput 
          icon={RiSearchLine} 
          placeholder="Cari nama atau NIK..." 
          className="w-full" 
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => {
            // Simple debounce can be implemented, but direct onChange is fine for small DBs
            handleSearch(e.target.value);
          }}
        />
      </div>
      <Select 
        className="w-full sm:w-40" 
        placeholder="Semua Status"
        value={searchParams.get("status")?.toString() || "all"}
        onValueChange={handleStatusChange}
      >
        <SelectItem value="all">Semua</SelectItem>
        <SelectItem value="menunggu">Menunggu</SelectItem>
        <SelectItem value="diterima">Diterima</SelectItem>
        <SelectItem value="ditolak">Ditolak</SelectItem>
      </Select>
    </div>
  );
}
