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
    const ppdb = await prisma.pPDB.upsert({
      where: { nik: data.nik },
      update: {},
      create: data,
    });

    if (ppdb.status === 'DITERIMA') {
      await prisma.student.upsert({
        where: { nik: ppdb.nik },
        update: {},
        create: {
          nik: ppdb.nik,
          childName: ppdb.childName,
          birthPlace: ppdb.birthPlace,
          birthDate: ppdb.birthDate,
          gender: ppdb.gender,
          parentName: ppdb.parentName,
          phone: ppdb.phone,
          email: ppdb.email,
          address: ppdb.address,
          isActive: true,
        },
      });
    }
  }
  
  console.log('PPDB and Student data seeded successfully');
  
  // Seed Artikel
  const articleData = [
    {
      title: 'Penerimaan Siswa Baru Tahun Ajaran 2026/2027',
      slug: 'penerimaan-siswa-baru-2026',
      excerpt: 'PAUD Mentari membuka pendaftaran siswa baru untuk tahun ajaran 2026/2027.',
      content: 'PAUD Mentari kini membuka pendaftaran... (konten panjang di sini)',
      category: 'Pengumuman',
      publishedAt: new Date('2026-01-10'),
    },
    {
      title: 'Lomba Mewarnai Tingkat Kecamatan',
      slug: 'lomba-mewarnai-kecamatan',
      excerpt: 'Siswa-siswi PAUD Mentari akan mengikuti lomba mewarnai tingkat kecamatan.',
      content: 'Dalam rangka memperingati Hari Anak Nasional...',
      category: 'Kegiatan',
      publishedAt: new Date('2026-03-15'),
    },
    {
      title: 'Perubahan Jadwal Belajar Selama Bulan Ramadhan',
      slug: 'jadwal-belajar-ramadhan-2026',
      excerpt: 'Penyesuaian jam belajar mengajar selama bulan suci Ramadhan.',
      content: 'Diinformasikan kepada seluruh orang tua/wali murid...',
      category: 'Akademik',
      publishedAt: new Date('2026-02-25'),
    },
    {
      title: 'Pentingnya Sarapan Pagi Bagi Tumbuh Kembang Anak',
      slug: 'pentingnya-sarapan-pagi',
      excerpt: 'Tips dari ahli gizi mengenai pentingnya sarapan untuk anak usia dini.',
      content: 'Sarapan sering disebut sebagai waktu makan paling penting...',
      category: 'Umum',
      publishedAt: new Date('2026-04-05'),
    },
    {
      title: 'Kunjungan Edukasi ke Kebun Binatang Ragunan',
      slug: 'kunjungan-edukasi-ragunan',
      excerpt: 'Dokumentasi keseruan anak-anak belajar mengenal satwa.',
      content: 'Pada hari Kamis lalu, seluruh siswa TKB melakukan kunjungan...',
      category: 'Kegiatan',
      publishedAt: new Date('2026-05-12'),
    }
  ];

  for (const data of articleData) {
    await prisma.article.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });
  }
  console.log('Article data seeded successfully');

  // Seed Guru
  const teacherData = [
    {
      firstName: 'Dewi',
      lastName: 'Sartika',
      dateOfBirth: new Date('1990-04-21'),
      nik: '3201012104900001',
      nip: '199004212015032001',
      nuptk: '1234567890123456',
      phone: '081234567890',
      employmentStatus: 'Tetap',
      lastEducation: 'S1 PGPAUD',
      bio: 'Lulusan terbaik Universitas Pendidikan Indonesia. Memiliki pengalaman mengajar lebih dari 8 tahun di PAUD.',
    },
    {
      firstName: 'Budi',
      lastName: 'Santoso',
      dateOfBirth: new Date('1985-08-15'),
      nik: '3201011508850002',
      nip: null,
      nuptk: '0987654321098765',
      phone: '085678901234',
      employmentStatus: 'Tetap',
      lastEducation: 'S1 Psikologi',
      bio: 'Fokus pada perkembangan kognitif anak usia dini. Bersertifikat psikologi anak.',
    },
    {
      firstName: 'Siti',
      lastName: 'Aminah',
      dateOfBirth: new Date('1995-12-10'),
      nik: '3201011012950003',
      nip: null,
      nuptk: null,
      phone: '089876543210',
      employmentStatus: 'Honor',
      lastEducation: 'S1 PGPAUD',
      bio: 'Guru muda yang kreatif dan energik, sangat disukai oleh anak-anak Kelompok Bermain.',
    }
  ];

  for (const data of teacherData) {
    await prisma.teacher.upsert({
      where: { nik: data.nik },
      update: {},
      create: data,
    });
  }
  console.log('Teacher data seeded successfully');

  // Seed Program
  const programData = [
    {
      title: 'Bermain Sambil Belajar',
      slug: 'bermain-sambil-belajar',
      description: 'Program kurikulum inti yang menekankan pada pendekatan bermain untuk merangsang kognitif, motorik, dan sosial emosional anak secara terpadu.',
      category: 'Intrakurikuler',
      isActive: true,
    },
    {
      title: 'Seni Tari Tradisional',
      slug: 'seni-tari-tradisional',
      description: 'Kegiatan ekstrakurikuler mingguan untuk mengenalkan kekayaan budaya nusantara sejak dini melalui gerakan tari sederhana.',
      category: 'Ekstrakurikuler',
      isActive: true,
    },
    {
      title: 'Kemandirian Usia Dini',
      slug: 'kemandirian-usia-dini',
      description: 'Program pembiasaan harian yang mengajarkan anak-anak untuk mandiri dalam hal-hal dasar seperti memakai sepatu, merapikan mainan, dan makan sendiri.',
      category: 'Pengembangan Diri',
      isActive: true,
    },
    {
      title: 'Konsultasi Psikologi Tumbuh Kembang',
      slug: 'konsultasi-psikologi',
      description: 'Layanan konsultasi bulanan bagi orang tua bersama psikolog profesional untuk memantau perkembangan dan psikologi anak.',
      category: 'Layanan Khusus',
      isActive: true,
    },
    {
      title: 'Mewarnai dan Menggambar Ceria',
      slug: 'mewarnai-menggambar-ceria',
      description: 'Eksplorasi kreativitas menggunakan berbagai media seni untuk melatih motorik halus dan pengenalan warna.',
      category: 'Ekstrakurikuler',
      isActive: true,
    }
  ];

  for (const data of programData) {
    await prisma.program.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });
  }
  console.log('Program data seeded successfully');

  console.log('All data seeded successfully');
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
