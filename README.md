<<<<<<< HEAD
# Panduan Implementasi & Menjalankan "SAPA SEKOLAH" di Visual Studio Code

Aplikasi **SAPA SEKOLAH (Sistem Agenda Pembiasaan dan Informasi Sekolah)** dibangun menggunakan arsitektur web modern yang bersih (*HTML5, CSS3 kustom dengan CSS Variables, dan Vanilla JavaScript SPA/Single Page Application*).

---

## 📁 Struktur Direktori Project
File project sudah tersusun rapi di:
`C:\Users\ACER\.gemini\antigravity\scratch\sapa-sekolah`

```text
sapa-sekolah/
│
├── index.html         # Kerangka dasar, splash screen, login, dan bottom navigation
├── css/
│   └── style.css      # Desain responsif tema biru SAPA SEKOLAH & komponen UI
├── js/
│   ├── data.js        # Data mock agenda, pengumuman, notifikasi, dan hak akses
│   └── app.js         # Router halaman, logika autentikasi, & interaksi modul
├── img/               # Aset gambar & ikon pendukung
└── README.md          # Dokumentasi petunjuk penggunaan
```

---

## 🚀 Langkah Menjalankan di Visual Studio Code

### Langkah 1: Buka Folder Project di VS Code
1. Buka aplikasi **Visual Studio Code**.
2. Klik menu **File** > **Open Folder...** (atau tekan shortcut `Ctrl + K, Ctrl + O`).
3. Arahkan ke folder berikut lalu klik **Select Folder**:
   ```text
   C:\Users\ACER\.gemini\antigravity\scratch\sapa-sekolah
   ```

### Langkah 2: Install Ekstensi "Live Server" (Disarankan)
1. Pada menu samping kiri VS Code, klik ikon **Extensions** (atau tekan `Ctrl + Shift + X`).
2. Ketik `Live Server` pada kolom pencarian.
3. Klik tombol **Install** pada ekstensi buatan **Ritwick Dey**.

### Langkah 3: Menjalankan Aplikasi
1. Buka file [index.html](file:///C:/Users/ACER/.gemini/antigravity/scratch/sapa-sekolah/index.html) di panel editor.
2. Klik kanan di dalam file `index.html` lalu pilih **Open with Live Server** (atau klik tombol **Go Live** di pojok kanan bawah jendela VS Code).
3. Browser akan otomatis terbuka di alamat: `http://127.0.0.1:5500/index.html`.
*(Alternatif tanpa ekstensi: Anda juga bisa langsung klik dua kali file `index.html` melalui File Explorer).*

### Langkah 4: Mode Tampilan Smartphone (Mobile View)
Aplikasi dirancang dengan pendekatan *Mobile-First*:
1. Di browser (Google Chrome / Edge), tekan tombol **F12** untuk membuka **Developer Tools**.
2. Tekan tombol `Ctrl + Shift + M` (ikon ponsel/tablet) untuk mengaktifkan **Device Toolbar**.
3. Pilih perangkat simulasi seperti **iPhone 12/14 Pro** atau **Pixel 7** untuk pengalaman tampilan terbaik.

---

## 🎯 Panduan Uji Coba Fitur Sesuai Rancangan Sistem

1. **Splash Screen**: Layar pembuka beranimasi akan tampil selama 1.8 detik sebelum mengarah ke halaman login.
2. **Multi-Role Login (Demo Shortcut)**:
   - Di bagian bawah form login, tersedia tombol cepat peran:
     - 🎒 **Siswa**: Melihat agenda hari ini, tugas kelas, & notifikasi pribadi.
     - 👩‍🏫 **Guru**: Memiliki akses membuat pengumuman baru & melihat status persetujuan.
     - 📋 **Wali Kelas**: Memantau tugas dan usulan jadwal kelas bimbingan.
     - 🏅 **Kepala Sekolah**: Tinjau laporan dan status pengajuan.
     - ⚙️ **Admin**: Mengelola verifikasi akun dan jadwal otomatis.
3. **Pusat Informasi**: Coba fitur filter kategori (*Kegiatan, Akademik, Jadwal, Tugas*) dan kolom pencarian kata kunci.
4. **Alur Persetujuan (Approval Flow)**: Khusus peran Guru/Admin/Kepsek, buka menu **Persetujuan** untuk menguji aksi *Setujui* atau *Tolak*.
5. **Saran Siswa via WhatsApp**: Pada halaman Profil > Saran Siswa, pesan akan diformat otomatis dan diarahkan ke nomor WhatsApp tujuan.
=======
# sapa-sekolah
>>>>>>> 1c4fc6356481fb95cf0308de1a411bf69a83cdec
