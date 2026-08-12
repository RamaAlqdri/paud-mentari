import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@mentari.com' },
    update: {},
    create: {
      email: 'admin@mentari.com',
      name: 'Administrator',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  })

  // Seed PPDB
  const ppdbData = [
    {
      childName: 'Ahmad Fauzi',
      nik: '1234567890123451',
      birthPlace: 'Jakarta',
      birthDate: new Date('2019-05-12'),
      gender: 'L',
      parentName: 'Budi Santoso',
      phone: '081234567890',
      email: 'budi@example.com',
      address: 'Jl. Merdeka No. 1, Jakarta',
      status: 'MENUNGGU' as const
    },
    {
      childName: 'Siti Aminah',
      nik: '1234567890123452',
      birthPlace: 'Bandung',
      birthDate: new Date('2020-02-20'),
      gender: 'P',
      parentName: 'Andi Setiawan',
      phone: '081298765432',
      address: 'Jl. Sudirman No. 10, Bandung',
      status: 'DITERIMA' as const
    },
    {
      childName: 'Bima Sakti',
      nik: '1234567890123453',
      birthPlace: 'Surabaya',
      birthDate: new Date('2018-11-05'),
      gender: 'L',
      parentName: 'Citra Kirana',
      phone: '081234598765',
      address: 'Jl. Pahlawan No. 45, Surabaya',
      status: 'MENUNGGU' as const
    },
    {
      childName: 'Putri Lestari',
      nik: '1234567890123454',
      birthPlace: 'Yogyakarta',
      birthDate: new Date('2019-08-17'),
      gender: 'P',
      parentName: 'Dewi Sartika',
      phone: '085678901234',
      address: 'Jl. Malioboro No. 99, Yogyakarta',
      status: 'DITOLAK' as const
    },
    {
      childName: 'Rizky Febian',
      nik: '1234567890123455',
      birthPlace: 'Semarang',
      birthDate: new Date('2020-01-30'),
      gender: 'L',
      parentName: 'Eko Patrio',
      phone: '087654321098',
      address: 'Jl. Pemuda No. 12, Semarang',
      status: 'DITERIMA' as const
    },
    ...Array.from({ length: 15 }).map((_, i) => ({
      childName: `Calon Siswa ${i + 6}`,
      nik: `12345678901234${56 + i}`,
      birthPlace: 'Kota Fiktif',
      birthDate: new Date(`2019-0${(i % 9) + 1}-1${(i % 8) + 1}`),
      gender: i % 2 === 0 ? 'L' : 'P',
      parentName: `Orang Tua ${i + 6}`,
      phone: `081200000${i + 10}`,
      address: `Jl. Fiktif No. ${i + 6}, Kota Fiktif`,
      status: i % 3 === 0 ? 'DITERIMA' as const : (i % 5 === 0 ? 'DITOLAK' as const : 'MENUNGGU' as const)
    }))
  ];

  for (const data of ppdbData) {
    await prisma.pPDB.upsert({
      where: { nik: data.nik },
      update: {},
      create: data,
    });
  }
  
  console.log('PPDB data seeded successfully');
  console.log({ admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
