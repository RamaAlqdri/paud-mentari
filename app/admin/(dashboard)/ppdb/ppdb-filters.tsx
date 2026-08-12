"use client";

import { TextInput, Select, SelectItem } from "@tremor/react";
import { RiSearchLine } from "@remixicon/react";

export default function PPDBFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
      <div className="relative w-full sm:w-64">
        <TextInput 
          icon={RiSearchLine} 
          placeholder="Cari nama..." 
          className="w-full [&_input]:rounded-2xl [&>div]:rounded-2xl" 
        />
      </div>
      <Select className="w-full sm:w-40 [&_button]:rounded-2xl [&>div]:rounded-2xl" placeholder="Semua Status">
        <SelectItem value="menunggu">Menunggu</SelectItem>
        <SelectItem value="diterima">Diterima</SelectItem>
        <SelectItem value="ditolak">Ditolak</SelectItem>
      </Select>
    </div>
  );
}
