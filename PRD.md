# Product Requirements Document (PRD) - PAUD Mentari Website

## 1. Pendahuluan
Dokumen ini mendefinisikan persyaratan untuk pengembangan sistem informasi dan website profil untuk "PAUD Mentari". Sistem ini dirancang untuk memberikan informasi yang jelas, menarik, dan terpercaya bagi orang tua calon siswa, serta menyediakan platform pendaftaran online (PPDB) dan manajemen konten yang efisien.

## 2. Tujuan dan Sasaran
*   **Membangun Kepercayaan:** Menampilkan profil, fasilitas, tenaga pendidik, dan program PAUD Mentari dengan desain yang profesional, responsif, dan ramah anak.
*   **Informasi Operasional & Publikasi:** Menyediakan informasi yang akurat mengenai kegiatan sekolah melalui fitur artikel/blog.
*   **Digitalisasi Pendaftaran (PPDB):** Memfasilitasi proses Penerimaan Peserta Didik Baru (PPDB) secara *online* agar lebih terstruktur dan transparan.
*   **Kemudahan Manajemen:** Menyediakan sistem otentikasi berbasis peran (*role-based*) agar administrator dapat mengelola data sekolah secara mandiri.

## 3. Arsitektur Sistem
Aplikasi ini mengadopsi arsitektur **Fullstack Web Application (Monolith)** menggunakan Next.js App Router, di mana sisi antarmuka (*frontend*) dan logika server (*backend*) terintegrasi dalam satu sistem yang efisien.

### 3.1. Framework & Teknologi Utama
*   **Core Framework:** Next.js (App Router, versi 16+).
*   **Bahasa Pemrograman:** TypeScript, React 19+.
*   **Styling & UI:** Tailwind CSS v4, dikombinasikan dengan Radix UI Primitives (menggunakan pendekatan *shadcn/ui*) untuk komponen antarmuka, serta `lucide-react` untuk ikon.
*   **Font:** Poppins (Google Fonts) diatur menggunakan `next/font`.
*   **Manajemen Form:** `react-hook-form` beserta `zod` untuk validasi skema form (khususnya untuk validasi pengisian data PPDB).

### 3.2. Server Logic & Database
*   **Komunikasi Data:** Menggunakan fitur *Server Components* dan *Server Actions* bawaan Next.js App Router untuk pengambilan dan mutasi data (menghindari pembuatan endpoint API manual secara terpisah).
*   **Database:** PostgreSQL.
*   **ORM:** Prisma ORM.
*   **Autentikasi:** NextAuth.js terintegrasi dengan `prisma-adapter` dan `bcryptjs` untuk pengelolaan kredensial *login* pengguna dan perlindungan rute berbasis peran (*Role-Based Access Control*).

## 4. Desain Database (Schema)
Sistem menggunakan *database relational* yang dipetakan oleh Prisma dengan struktur tabel utama berikut:
*   **User:** Sistem manajemen hak akses (ID, Nama, Email, Password Hash, Role: `USER` | `ADMIN`).
*   **Teacher:** Direktori profil tenaga pendidik (ID, Nama, Posisi/Jabatan, Foto, Biodata singkat).
*   **Program:** Daftar program pendidikan (ID, Judul, Slug unik, Deskripsi, Thumbnail/Foto).
*   **Facility:** Fasilitas penunjang pembelajaran (ID, Judul, Deskripsi, Gambar).
*   **Article:** Manajemen konten publikasi (ID, Judul, Slug, Excerpt, Konten lengkap, Thumbnail, Waktu publikasi).
*   **PPDB (Penerimaan Peserta Didik Baru):** Rekam data pendaftaran (ID, Nama Anak, NIK unik, Tempat & Tanggal Lahir, Jenis Kelamin, Nama Orang Tua, Kontak, Email, Alamat) dengan sistem *tracking* status ENUM: `MENUNGGU`, `DITERIMA`, `DITOLAK`.

## 5. Spesifikasi Desain (UI/UX)
*   **Gaya Desain:** Ramah anak, ceria, bersih, desain modern, banyak ruang kosong (*whitespace*), dan tata letak responsif (*mobile-first*).
*   **Elemen Visual:** Banyak menggunakan sudut melengkung (*rounded corners*, seperti `rounded-full`) pada tombol, elemen indikator, dan kartu informasi untuk memberi kesan *friendly*.
*   **Palet Warna Utama (Brand Colors):**
    *   **Primary Yellow & Orange (`brand-yellow`, `brand-orange`):** Warna hangat yang melambangkan keceriaan (*Mentari*).
    *   **Accent Pink & Blue (`brand-pink`, `brand-blue`):** Warna tambahan kontras penunjang kesan ramah anak.

## 6. Fitur Utama

### 6.1. Beranda (Frontpage)
*   *Hero Banner* dinamis dengan teks *Call-to-Action* (CTA) yang mengarahkan pengunjung ke halaman Pendaftaran PPDB.
*   Seksi "Nilai Utama" (Mengapa Memilih PAUD Mentari) dengan ilustrasi/ikon menarik.
*   Cuplikan ringkas fasilitas, artikel terbaru, atau program unggulan.

### 6.2. Profil & Akademik Sekolah
*   Halaman informasi visi, misi, dan latar belakang sekolah.
*   Direktori profil para guru dan staf.
*   Penjelasan detail mengenai program belajar dan fasilitas sarana prasarana.

### 6.3. Penerimaan Peserta Didik Baru (PPDB)
*   Halaman informasi syarat, ketentuan, dan prosedur alur pendaftaran.
*   Formulir pendaftaran interaktif yang divalidasi langsung oleh sistem.
*   Informasi pendaftaran tersimpan secara langsung di *database* dengan status *default* `MENUNGGU`.

### 6.4. Blog dan Publikasi
*   Halaman daftar artikel kegiatan sekolah, pengumuman, atau tips *parenting*.
*   Halaman baca artikel individual yang di-render secara dinamis menggunakan *slug*.

### 6.5. Admin Dashboard (Back-Office)
*   Autentikasi terpusat (Login) khusus untuk pengguna dengan akses (Role) `ADMIN`.
*   Hak mutasi data penuh (CRUD) untuk meninjau/mengubah status pendaftar PPDB, menerbitkan artikel baru, serta memperbarui data direktori guru, fasilitas, dan program.

## 7. Infrastruktur dan Deployment
*   **Containerization:** Aplikasi didistribusikan menggunakan ekosistem Docker.
*   **Docker Compose:** Konfigurasi `docker-compose.yml` terintegrasi yang mendefinisikan infrastruktur dalam dua (2) layanan utama:
    1.  **App Container (`paud_mentari_app`):** Menjalankan aplikasi Next.js penuh (*server-side rendering*, *API routes*, *server actions*) secara utuh di *port* `3000`.
    2.  **DB Container (`paud_mentari_db`):** Menjalankan *instance* PostgreSQL Alpine dengan fitur *persistent volumes* (`paud_mentari_pgdata`) untuk penyimpanan data permanen.
*   **Environment Variables:** Konfigurasi kredensial keamanan diatur melalui file `.env` (misal: `DATABASE_URL`, `NEXTAUTH_SECRET`, dan `NEXTAUTH_URL`).
