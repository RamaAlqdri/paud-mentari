"use client";

import { TextInput, Select, SelectItem, DatePicker } from "@tremor/react";
import { RiSearchLine, RiAddLine } from "@remixicon/react";
import Link from "next/link";

export default function ArticleFilters() {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full justify-between items-center">
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <div className="relative w-full sm:w-64">
          <TextInput 
            icon={RiSearchLine} 
            placeholder="Cari judul artikel..." 
            className="w-full" 
          />
        </div>
        <Select className="w-full sm:w-40" placeholder="Semua Kategori">
          <SelectItem value="umum">Umum</SelectItem>
          <SelectItem value="akademik">Akademik</SelectItem>
          <SelectItem value="kegiatan">Kegiatan</SelectItem>
          <SelectItem value="pengumuman">Pengumuman</SelectItem>
        </Select>
        <div className="w-full sm:w-48">
          <DatePicker className="w-full" placeholder="Tanggal Publish" />
        </div>
      </div>
      
      <Link 
        href="/admin/artikel/create"
        className="w-full md:w-auto px-4 py-2 rounded-lg bg-brand-orange text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-brand-orange/90 transition-all shadow-sm whitespace-nowrap"
      >
        <RiAddLine className="w-4 h-4" />
        Tambah Artikel
      </Link>
    </div>
  );
}
