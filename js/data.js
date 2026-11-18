/**
 * SAPA SEKOLAH - Mock Database & Data State
 * Berisi data in-memory untuk pengujian aplikasi tanpa backend aktif.
 */

const AppData = {
  // Informasi Peran
  roles: {
    siswa: {
      id: 'siswa',
      name: 'Andi Saputra',
      label: 'Siswa - XII RPL 3',
      sub: 'Semangat belajar hari ini!',
      icon: '🎒',
      nis: '20241001'
    },
    guru: {
      id: 'guru',
      name: 'Bu Rini, S.Pd',
      label: 'Guru B. Indonesia',
      sub: 'Guru Pengajar',
      icon: '👩‍🏫',
      nip: '198503122010012001'
    },
    wali: {
      id: 'wali',
      name: 'Pak Ahmad, M.Pd',
      label: 'Wali Kelas XII RPL 3',
      sub: 'Wali Kelas & Guru Produktif',
      icon: '📋',
      nip: '198001052006041002'
    },
    kepsek: {
      id: 'kepsek',
      name: 'Drs. H. Mulyadi, M.M',
      label: 'Kepala Sekolah',
      sub: 'Pimpinan Satuan Pendidikan',
      icon: '🏅',
      nip: '197204151998021001'
    },
    admin: {
      id: 'admin',
      name: 'Admin Sekolah',
      label: 'Administrator Sistem',
      sub: 'Pengelola Data & Pengguna',
      icon: '⚙️',
      nip: 'ADMIN-001'
    }
  },

  // Agenda Pembiasaan Mingguan
  kegiatanMingguan: [
    { hari: 'Senin', kegiatan: 'Upacara Bendera & Perwalian', waktu: '07.00 - 08.00', lokasi: 'Lapangan Utama', petugas: 'Petugas Upacara Kelas XII RPL 1', status: 'Selesai' },
    { hari: 'Selasa', kegiatan: 'Senam Pagi Bersama', waktu: '07.00 - 07.45', lokasi: 'Lapangan Sekolah', petugas: 'Pemandu: Kelas XII RPL 3', status: 'Aktif' },
    { hari: 'Rabu', kegiatan: 'Bersih-bersih & Opsih Lingkungan', waktu: '06.45 - 07.30', lokasi: 'Area Kelas & Taman', petugas: 'Semua Angkatan & Wali Kelas', status: 'Terjadwal' },
    { hari: 'Kamis', kegiatan: 'Bahasa dan Literasi (Pojok Baca)', waktu: '07.00 - 07.45', lokasi: 'Ruang Kelas Masing-masing', petugas: 'Tim Literasi Sekolah', status: 'Terjadwal' },
    { hari: 'Jumat', kegiatan: 'Dhuha Bersama & Pembinaan Rohani', waktu: '07.00 - 08.00', lokasi: 'Masjid Al-Ikhlas Sekolah', petugas: 'Rohis & Guru Agama', status: 'Terjadwal' }
  ],

  // Pengumuman & Informasi
  informasiList: [
    {
      id: 1,
      judul: 'Jadwal Senam Pagi Minggu Ini',
      kategori: 'Kegiatan',
      ringkasan: 'Besok ada kegiatan senam pagi. Kelas XII RPL 3 sebagai pemandu senam di lapangan utama.',
      isi: 'Diberitahukan kepada seluruh siswa-siswi dan dewan guru, kegiatan senam pagi akan diadakan besok Selasa mulai pukul 07.00 WIB. Pakaian wajib memakai seragam olahraga lengkap. Untuk Kelas XII RPL 3 diharapkan sudah siap di depan podium 15 menit sebelum kegiatan dimulai.',
      pengirim: 'Bu Rini, S.Pd',
      peran: 'Koordinator Olahraga',
      tanggal: '18 Nov 2026',
      waktu: '07.00 WIB',
      isPenting: true,
      lampiran: 'Panduan_Senam_Pagi.pdf'
    },
    {
      id: 2,
      judul: 'Pengumpulan Portofolio Akhir Semester',
      kategori: 'Akademik',
      ringkasan: 'Batas akhir pengumpulan portofolio project mata pelajaran produktif diperpanjang hingga Jumat.',
      isi: 'Seluruh siswa kelas XII RPL diwajibkan mengumpulkan laporan project PKL & Portofolio dalam format PDF melalui Google Drive kelas masing-masing paling lambat hari Jumat pukul 23.59 WIB.',
      pengirim: 'Pak Ahmad, M.Pd',
      peran: 'Ketua Jurusan RPL',
      tanggal: '17 Nov 2026',
      waktu: '10.30 WIB',
      isPenting: false,
      lampiran: 'Rubrik_Penilaian_2026.docx'
    },
    {
      id: 3,
      judul: 'Pembaruan Jadwal Kebersihan Area Sekolah',
      kategori: 'Jadwal',
      ringkasan: 'Pembagian zona kebersihan baru untuk pekan literasi dan lingkungan sehat.',
      isi: 'Mulai Rabu esok, zona taman belakang dialokasikan untuk kelas XI, sedangkan koridor laboratorium menjadi tanggung jawab kelas XII. Peralatan kebersihan dapat diambil di ruang sarpras.',
      pengirim: 'Admin Sekolah',
      peran: 'Staff Kesiswaan',
      tanggal: '16 Nov 2026',
      waktu: '13.15 WIB',
      isPenting: false,
      lampiran: null
    }
  ],

  // Daftar Notifikasi
  notifikasiList: [
    { id: 1, judul: 'Informasi Baru Diterbitkan', pesan: 'Jadwal Senam Pagi telah disetujui dan dipublikasikan.', tipe: 'info', waktu: 'Baru saja', unread: true },
    { id: 2, judul: 'Perubahan Jadwal', pesan: 'Upacara hari Senin diundur 15 menit karena pengarahan Kepala Sekolah.', tipe: 'jadwal', waktu: '2 jam lalu', unread: true },
    { id: 3, judul: 'Pengingat Tugas Kelas', pesan: 'Kelas XII RPL 3 bertugas sebagai pemandu senam besok.', tipe: 'tugas', waktu: '5 jam lalu', unread: true },
    { id: 4, judul: 'Persetujuan Disetujui', pesan: 'Usulan revisi modul praktikum telah diverifikasi kurikulum.', tipe: 'persetujuan', waktu: 'Kemarin', unread: false }
  ],

  // Antrean Persetujuan (Approval)
  pengajuanList: [
    {
      id: 'REQ-01',
      judul: 'Pengajuan Jadwal Ekstrakurikuler Robotik',
      pengusul: 'Pak Dian, S.Kom',
      peran: 'Pembina Robotik',
      waktu: 'Hari Sabtu, 09.00 - 12.00 WIB',
      tanggal: '18 Nov 2026',
      status: 'Menunggu'
    },
    {
      id: 'REQ-02',
      judul: 'Permohonan Publikasi Informasi Pekan Seni Budaya',
      pengusul: 'Bu Siti Rahma',
      peran: 'Guru Kesenian',
      waktu: '25-27 Nov 2026',
      tanggal: '17 Nov 2026',
      status: 'Menunggu'
    }
  ],

  // Daftar Pengajuan Informasi (dari Guru/Wali, menunggu persetujuan Admin)
  pendingInfoList: [
    {
      id: 'INFO-REQ-01',
      judul: 'Jadwal Remedial UAS Bahasa Indonesia',
      kategori: 'Akademik',
      ringkasan: 'Jadwal remedial untuk siswa yang belum tuntas pada UAS Bahasa Indonesia semester ganjil.',
      isi: 'Diberitahukan kepada seluruh siswa kelas X, XI, dan XII yang belum mencapai KKM pada UAS Bahasa Indonesia, remedial akan dilaksanakan pada hari Sabtu, 28 November 2026 pukul 08.00-10.00 WIB di ruang kelas masing-masing. Harap membawa alat tulis dan kartu ujian.',
      pengirim: 'Bu Rini, S.Pd',
      peran: 'Guru B. Indonesia',
      roleKey: 'guru',
      tanggal: '18 Nov 2026',
      waktu: '08.00 WIB',
      status: 'pending',
      catatan: null,
      lampiran: null
    },
    {
      id: 'INFO-REQ-02',
      judul: 'Pengumuman Rapat Orang Tua Kelas XII RPL 3',
      kategori: 'Kegiatan',
      ringkasan: 'Undangan rapat orang tua/wali murid untuk persiapan ujian akhir dan kelulusan.',
      isi: 'Dengan hormat, kami mengundang Bapak/Ibu orang tua/wali murid kelas XII RPL 3 untuk menghadiri rapat yang akan dilaksanakan pada Senin, 23 November 2026 pukul 09.00 WIB di Aula Sekolah. Agenda: pembahasan persiapan ujian akhir, jadwal kelulusan, dan perpisahan.',
      pengirim: 'Pak Ahmad, M.Pd',
      peran: 'Wali Kelas XII RPL 3',
      roleKey: 'wali',
      tanggal: '17 Nov 2026',
      waktu: '09.00 WIB',
      status: 'pending',
      catatan: null,
      lampiran: 'Undangan_Rapat_Ortu.pdf'
    }
  ],

  // Riwayat Arsip Kegiatan
  arsipKegiatan: [
    { tanggal: '17', hari: 'SEL', nama: 'Senam Pagi Bersama', lokasi: 'Lapangan', status: 'Selesai' },
    { tanggal: '16', hari: 'SEN', nama: 'Upacara Bendera', lokasi: 'Lapangan', status: 'Selesai' },
    { tanggal: '14', hari: 'SAB', nama: 'Sabtu Bersih & Penanaman Pohon', lokasi: 'Area Hijau', status: 'Selesai' },
    { tanggal: '13', hari: 'JUM', nama: 'Kajian Rohani Pagi', lokasi: 'Masjid', status: 'Selesai' }
  ]
};
