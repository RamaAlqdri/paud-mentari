# Product Requirements Document (PRD) - PAUD Mentari Website

## 1. Pendahuluan
Dokumen ini mendefinisikan persyaratan untuk pengembangan sistem informasi dan website profil untuk "PAUD Mentari". Sistem ini dirancang untuk memberikan informasi yang jelas, menarik, dan terpercaya bagi orang tua calon siswa, serta menyediakan platform pendaftaran online yang efisien.

## 2. Tujuan dan Sasaran
*   **Membangun Kepercayaan:** Menampilkan profil, fasilitas, dan program PAUD Mentari dengan desain yang profesional dan ramah anak.
*   **Informasi Operasional:** Menyediakan informasi yang akurat dan mudah diakses mengenai kurikulum, jadwal, dan kegiatan sekolah.
*   **Digitalisasi Pendaftaran:** Memfasilitasi proses Penerimaan Peserta Didik Baru (PPDB) secara *online*.
*   **Performa dan SEO:** Memastikan website cepat dimuat dan terindeks dengan baik oleh mesin pencari.

## 3. Arsitektur Sistem
Aplikasi ini mengadopsi arsitektur *multi-container* untuk memisahkan *frontend*, *backend API*, dan *database*.

### 3.1. Frontend
*   **Framework:** Next.js (App Router).
*   **Mode Output:** Static Export (`output: 'export'`).
*   **Styling:** Tailwind CSS (dengan palet warna kustom).
*   **Data Fetching:** Client-Side Rendering (CSR) untuk data dinamis (PPDB, detail artikel).
*   **Routing Dinamis:** Menggunakan *Optional Catch-all Routes* atau *Query Parameters* yang kompatibel dengan *static export*.

### 3.2. Backend API
*   **Platform:** Node.js (misalnya Express.js atau Hono).
*   **Fungsi:** Menyediakan REST API endpoints untuk melayani permintaan dari *frontend*.
*   **ORM:** Prisma ORM.

### 3.3. Database
*   **Database:** PostgreSQL.

## 4. Spesifikasi Desain (UI/UX)
*   **Gaya Desain:** Ramah anak, hangat, bersih, banyak *whitespace*, dan responsif (*mobile-first*).
*   **Elemen Visual:** Menggunakan sudut melengkung (*rounded corners*) pada komponen kartu dan tombol.
*   **Palet Warna:**
    *   Primary Yellow: `#FACC15`
    *   Secondary Orange: `#F97316`
    *   Accent Pink: `#EC4899`
    *   Accent Blue: `#0EA5E9`
    *   Accent Green: `#84CC16`

## 5. Fitur Utama

### 5.1. Beranda (Frontpage)
*   *Hero Banner* dengan *Call-to-Action* (CTA) Pendaftaran.
*   Ringkasan keunggulan program.
*   Tampilan singkat fasilitas (opsional: *slider* atau *grid*).

### 5.2. Profil Sekolah
*   Halaman "Tentang Kami" (visi, misi, sejarah).
*   Profil tenaga pendidik.
*   Informasi legalitas dan akreditasi.

### 5.3. Program Pembelajaran & Fasilitas
*   Deskripsi kategori kelas (misalnya: Daycare, Playgroup, TK).
*   Penjelasan metode dan kurikulum pembelajaran.
*   Galeri foto fasilitas dan kegiatan.

### 5.4. Penerimaan Peserta Didik Baru (PPDB)
*   Informasi alur pendaftaran.
*   Formulir pendaftaran *online* (dikirim ke Backend API via CSR).
*   Informasi transparansi biaya.

### 5.5. Blog dan Pengumuman
*   Daftar artikel parenting dan informasi kegiatan sekolah.
*   Halaman detail artikel (dimuat secara dinamis via CSR).

### 5.6. Kontak
*   Informasi alamat dan peta lokasi.
*   Integrasi *chat* WhatsApp.
*   Tautan media sosial.

## 6. Infrastruktur dan Deployment
*   **Containerization:** Aplikasi akan di-*deploy* menggunakan Docker.
*   **Frontend Container:** Multi-stage build (Next.js *static build* dilayani oleh Nginx/Caddy).
*   **Backend Container:** Menjalankan *Node.js API server* dan *Prisma client*.
*   **Database Container:** Menjalankan layanan PostgreSQL.
*   **Orchestration:** Menggunakan `docker-compose.yml` untuk pengelolaan dan *deployment* *container*.
