import { Metadata } from "next";
import PPDBFormClient from "./form-client";

export const metadata: Metadata = {
  title: "Pendaftaran PPDB | PAUD Mentari",
  description: "Formulir Pendaftaran Peserta Didik Baru (PPDB) PAUD Mentari",
};

export default function PPDBPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-24">
      <main className="flex-grow w-full px-4 py-8 md:py-16 flex items-center justify-center">
        <PPDBFormClient />
      </main>
    </div>
  );
}
