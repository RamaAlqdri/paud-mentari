import { prisma } from "@/lib/prisma";
import { Card, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import ProgramFilters from "./program-filters";
import ProgramActions from "./program-actions";
export default async function AdminProgramPage(props: { searchParams: Promise<{ search?: string, category?: string, status?: string }> }) {
  const searchParams = await props.searchParams;
  const search = searchParams.search || "";
  const category = searchParams.category || "";
  const status = searchParams.status || "";

  const whereClause: any = {};
  
  if (search) {
    whereClause.title = { contains: search, mode: "insensitive" };
  }
  
  if (category && category !== "all") {
    whereClause.category = category;
  }
  
  if (status && status !== "all") {
    whereClause.isActive = status === "active";
  }

  const data = await prisma.program.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Manajemen Program</h1>
          <p className="text-gray-600 font-medium">Kelola data program unggulan, ekstrakurikuler, dan kegiatan pengembangan diri.</p>
        </div>
      </div>

      {/* Filters & Actions */}
      <ProgramFilters />

      {/* Main Table Card */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-0 rounded-2xl overflow-hidden ring-1 ring-gray-200">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[800px]">
            <TableHead className="bg-gray-50/80 border-b border-gray-200">
              <TableRow>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Nama Program</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm">Kategori</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-sm text-center">Status</TableHeaderCell>
                <TableHeaderCell className="text-gray-900 font-bold py-4 px-6 text-right text-sm">Aksi</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500 py-12">
                    Belum ada data program yang sesuai dengan filter.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id} className={`hover:bg-gray-50/50 transition-colors ${!item.isActive ? 'bg-gray-50/30' : ''}`}>
                    <TableCell className="py-4 px-6">
                      <div>
                        <p className={`font-bold text-base ${!item.isActive ? 'text-gray-500 line-through decoration-gray-400' : 'text-gray-900'}`}>
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5 max-w-xs truncate">{item.description}</p>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize ${
                        item.category === "Intrakurikuler" ? "bg-blue-100 text-blue-800" :
                        item.category === "Ekstrakurikuler" ? "bg-purple-100 text-purple-800" :
                        item.category === "Pengembangan Diri" ? "bg-emerald-100 text-emerald-800" :
                        "bg-amber-100 text-amber-800"
                      } ${!item.isActive ? 'opacity-60 grayscale' : ''}`}>
                        {item.category}
                      </span>
                    </TableCell>
                    
                    <TableCell className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                        item.isActive 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}>
                        {item.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </TableCell>
                    
                    <TableCell className="py-4 px-6 text-right">
                      <ProgramActions id={item.id} isActive={item.isActive} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
