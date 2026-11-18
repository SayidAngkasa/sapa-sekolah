/**
 * SAPA SEKOLAH - Application Logic & State Router
 */

// State Aplikasi
let currentRole = 'siswa';
let activePage = 'dashboard';
let selectedDetailId = 1;
let currentFilter = 'Semua';
let currentPengajuanFilter = 'semua';
let currentKelolaFilter = 'pending';

// Inisialisasi Saat Dokumen Siap
document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  setupNavigationEvents();
  setupLoginForm();
});

// 1. Splash Screen Transition
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  const loginPage = document.getElementById('login-page');

  setTimeout(() => {
    if (splash) {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.classList.add('hidden');
        if (loginPage) {
          loginPage.classList.remove('hidden');
          loginPage.classList.add('fade-in');
        }
      }, 500);
    }
  }, 1800);
}

// 2. Setup Login Form
function setupLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    loginUser('siswa');
  });
}

function togglePassword() {
  const pass = document.getElementById('password');
  if (pass) {
    pass.type = pass.type === 'password' ? 'text' : 'password';
  }
}

function demoLogin(roleKey) {
  loginUser(roleKey);
}

function loginUser(roleKey) {
  currentRole = roleKey || 'siswa';
  const loginPage = document.getElementById('login-page');
  const appShell = document.getElementById('app');

  if (loginPage) loginPage.classList.add('hidden');
  if (appShell) {
    appShell.classList.remove('hidden');
    appShell.classList.add('fade-in');
  }

  renderPage('dashboard');
}

function logoutUser() {
  const loginPage = document.getElementById('login-page');
  const appShell = document.getElementById('app');

  if (appShell) appShell.classList.add('hidden');
  if (loginPage) {
    loginPage.classList.remove('hidden');
    loginPage.classList.add('fade-in');
  }
}

// 3. Navigation Events
function setupNavigationEvents() {
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const page = btn.getAttribute('data-page');
      navItems.forEach((n) => n.classList.remove('active'));
      btn.classList.add('active');
      renderPage(page);
    });
  });
}

function setNavActive(pageKey) {
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  navItems.forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-page') === pageKey);
  });
}

// 4. Page Rendering Router
function renderPage(pageKey) {
  activePage = pageKey;
  const container = document.getElementById('page-content');
  if (!container) return;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  switch (pageKey) {
    case 'dashboard':
      container.innerHTML = getDashboardHTML();
      break;
    case 'kalender':
      container.innerHTML = getKalenderHTML();
      break;
    case 'informasi':
      container.innerHTML = getInformasiHTML();
      break;
    case 'notifikasi':
      container.innerHTML = getNotifikasiHTML();
      updateNotifBadge();
      break;
    case 'profil':
      container.innerHTML = getProfilHTML();
      break;
    case 'kegiatan':
      container.innerHTML = getKegiatanHTML();
      break;
    case 'tugas':
      container.innerHTML = getTugasHTML();
      break;
    case 'detail-info':
      container.innerHTML = getDetailInfoHTML(selectedDetailId);
      break;
    case 'buat-info':
      container.innerHTML = getBuatInfoHTML();
      break;
    case 'persetujuan':
      container.innerHTML = getPersetujuanHTML();
      break;
    case 'saran':
      container.innerHTML = getSaranHTML();
      break;
    case 'arsip':
      container.innerHTML = getArsipHTML();
      break;
    case 'pengajuan-saya':
      container.innerHTML = getPengajuanSayaHTML();
      break;
    case 'kelola-pengajuan-info':
      container.innerHTML = getKelolaPengajuanInfoHTML();
      break;
    default:
      container.innerHTML = getDashboardHTML();
  }
}

function navigateTo(page, paramId = null) {
  if (paramId !== null) selectedDetailId = paramId;
  renderPage(page);
  setNavActive(page);
}

function updateNotifBadge() {
  const badge = document.getElementById('notif-badge');
  if (!badge) return;
  const unreadCount = AppData.notifikasiList.filter((n) => n.unread).length;
  if (unreadCount > 0) {
    badge.textContent = unreadCount;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

// ============================================================
// TEMPLATE ENGINE / HTML BUILDERS
// ============================================================

function getDashboardHTML() {
  const role = AppData.roles[currentRole];
  const isSiswa = currentRole === 'siswa';
  const isAdmin = currentRole === 'admin';
  const isGuruOrWali = ['guru', 'wali'].includes(currentRole);

  const pendingAdminCount = AppData.pendingInfoList.filter(r => r.status === 'pending').length;
  const myPendingCount = AppData.pendingInfoList.filter(r => r.roleKey === currentRole && r.status === 'pending').length;

  return `
    <div class="fade-in">
      <header class="dashboard-header">
        <div class="dashboard-user-row">
          <div class="user-info">
            <div class="user-avatar">${role.icon}</div>
            <div>
              <h2 class="user-name">${isSiswa ? 'Halo, ' + role.name.split(' ')[0] : 'Selamat Datang,'}</h2>
              <p class="user-role">${role.label}</p>
            </div>
          </div>
          <button class="notif-btn" onclick="navigateTo('notifikasi')">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span class="badge">${AppData.notifikasiList.filter(n => n.unread).length || 3}</span>
          </button>
        </div>

        ${
          isAdmin
            ? `
          <div class="header-info-card" onclick="navigateTo('persetujuan')">
            <p class="label">⚡ PUSAT ACC / PERSETUJUAN APLIKASI</p>
            <div class="flex items-center justify-between">
              <div>
                <p class="value">${pendingAdminCount} <small>Pengajuan Menunggu ACC</small></p>
                <small style="color: rgba(255,255,255,0.8);">Dari Guru & Wali Kelas</small>
              </div>
              <span class="tag tag-penting">Buka Antrean ACC ➔</span>
            </div>
          </div>
        `
            : isGuruOrWali
            ? `
          <div class="header-info-card" onclick="navigateTo('buat-info')">
            <p class="label">📢 REQUEST INFORMASI SKALA SEKOLAH</p>
            <div class="flex items-center justify-between">
              <div>
                <p class="value">${myPendingCount} <small>Request Sedang Diproses</small></p>
                <small style="color: rgba(255,255,255,0.8);">Kirim data untuk di-ACC Admin</small>
              </div>
              <span class="tag tag-penting">+ Request Info ➔</span>
            </div>
          </div>
        `
            : `
          <div class="header-info-card" onclick="navigateTo('kegiatan')">
            <p class="label">JADWAL PEMBIASAAN HARI INI</p>
            <div class="flex items-center justify-between">
              <div>
                <p class="value">Senam Pagi Bersama</p>
                <small style="color: rgba(255,255,255,0.8);">07.00 - 07.45 • Lapangan Sekolah</small>
              </div>
              <span style="font-size: 28px;">🏃</span>
            </div>
          </div>
        `
        }
      </header>

      <section class="content-section">
        <!-- Quick Action Menu -->
        <div class="quick-actions">
          <div class="quick-action-item" onclick="navigateTo('kalender')">
            <div class="quick-action-icon" style="background: #E3F2FD;">📅</div>
            <span>Kalender</span>
          </div>
          <div class="quick-action-item" onclick="navigateTo('informasi')">
            <div class="quick-action-icon" style="background: #E8F5E9;">📢</div>
            <span>Informasi</span>
          </div>
          ${
            isAdmin
              ? `
            <div class="quick-action-item" onclick="navigateTo('persetujuan')">
              <div class="quick-action-icon" style="background: #FFF8E1; position: relative;">
                ⚡
                ${pendingAdminCount > 0 ? `<span class="header-badge" style="top:-2px;right:-2px;">${pendingAdminCount}</span>` : ''}
              </div>
              <span>Pusat ACC</span>
            </div>
            <div class="quick-action-item" onclick="navigateTo('buat-info')">
              <div class="quick-action-icon" style="background: #F3E5F5;">➕</div>
              <span>Buat Info</span>
            </div>
          `
              : isGuruOrWali
              ? `
            <div class="quick-action-item" onclick="navigateTo('buat-info')">
              <div class="quick-action-icon" style="background: #F3E5F5;">📝</div>
              <span>Request Info</span>
            </div>
            <div class="quick-action-item" onclick="navigateTo('pengajuan-saya')">
              <div class="quick-action-icon" style="background: #FFF8E1; position: relative;">
                📋
                ${myPendingCount > 0 ? `<span class="header-badge" style="top:-2px;right:-2px;">${myPendingCount}</span>` : ''}
              </div>
              <span>Status ACC</span>
            </div>
          `
              : `
            <div class="quick-action-item" onclick="navigateTo('kegiatan')">
              <div class="quick-action-icon" style="background: #F3E5F5;">📝</div>
              <span>Kegiatan</span>
            </div>
            <div class="quick-action-item" onclick="navigateTo('tugas')">
              <div class="quick-action-icon" style="background: #FFF8E1;">📚</div>
              <span>Tugas</span>
            </div>
          `
          }
        </div>

        <!-- Agenda Hari Ini -->
        <div class="section-title">
          <h3>Agenda Pembiasaan Terdekat</h3>
          <a href="javascript:void(0)" onclick="navigateTo('kegiatan')">Lihat Semua →</a>
        </div>

        <div class="card card-with-border" onclick="navigateTo('kegiatan')">
          <div class="card-row">
            <div class="card-icon" style="background: #E3F2FD;">🏃</div>
            <div class="card-body">
              <div class="flex items-center justify-between">
                <h4 class="card-title">Senam Pagi Bersama</h4>
                <span class="tag tag-green">Aktif</span>
              </div>
              <p class="card-desc">07.00 - 07.45 WIB • Lapangan Sekolah</p>
              <div class="card-meta">
                <span class="tag tag-blue">Pemandu: XII RPL 3</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card card-with-border purple" onclick="navigateTo('kegiatan')">
          <div class="card-row">
            <div class="card-icon" style="background: #F3E5F5;">📖</div>
            <div class="card-body">
              <div class="flex items-center justify-between">
                <h4 class="card-title">Literasi & Pojok Baca</h4>
                <span class="tag tag-gray">Berikutnya</span>
              </div>
              <p class="card-desc">Kamis, 07.00 WIB • Ruang Kelas</p>
            </div>
          </div>
        </div>

        <!-- Pengumuman Terbaru -->
        <div class="section-title mt-md">
          <h3>Pengumuman Sekolah</h3>
          <a href="javascript:void(0)" onclick="navigateTo('informasi')">Semua Info →</a>
        </div>

        <div class="featured-card" onclick="navigateTo('detail-info', 1)">
          <div class="featured-card-header">
            <div class="flex items-center gap-sm mb-sm">
              <span class="tag tag-penting">📌 Penting</span>
              <span class="tag tag-white">Kegiatan</span>
            </div>
            <h4 style="font-size: 15px; font-weight: 700;">Jadwal Senam Pagi Minggu Ini</h4>
            <p style="font-size: 12px; opacity: 0.9; margin-top: 4px;">Kelas XII RPL 3 sebagai pemandu senam di lapangan utama.</p>
          </div>
          <div class="featured-card-body">
            <span style="font-size: 12px; color: var(--text-secondary);">👤 Bu Rini, S.Pd</span>
            <span style="font-size: 11px; color: var(--text-light);">2 jam lalu</span>
          </div>
        </div>

        ${
          isSiswa
            ? `
          <div class="section-title mt-md">
            <h3>Tugas Kelas Anda</h3>
            <a href="javascript:void(0)" onclick="navigateTo('tugas')">Detail →</a>
          </div>
          <div class="card" onclick="navigateTo('tugas')">
            <div class="card-row items-center">
              <div class="card-icon" style="background: #E8F5E9;">🎯</div>
              <div class="card-body">
                <h4 class="card-title">Pemandu Senam Pagi</h4>
                <p class="card-desc">Besok, 07.00 WIB • Bertugas: 4 Siswa</p>
              </div>
              <span style="color: var(--text-light);">➔</span>
            </div>
          </div>
        `
            : ''
        }
      </section>
    </div>
  `;
}

function getKalenderHTML() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return `
    <div class="fade-in">
      <header class="page-header">
        <h2>Kalender Agenda Sekolah</h2>
        <p class="subtitle">Jadwal harian, mingguan, dan agenda khusus</p>
      </header>

      <section class="content-section">
        <div class="card">
          <div class="calendar-nav">
            <button>❮</button>
            <h3>November 2026</h3>
            <button>❯</button>
          </div>
          <div class="calendar-grid">
            <div class="calendar-day-label">Min</div>
            <div class="calendar-day-label">Sen</div>
            <div class="calendar-day-label">Sel</div>
            <div class="calendar-day-label">Rab</div>
            <div class="calendar-day-label">Kam</div>
            <div class="calendar-day-label">Jum</div>
            <div class="calendar-day-label">Sab</div>
            ${days
              .map(
                (d) => `
              <div class="calendar-day ${d === 18 ? 'today' : ''}" onclick="alert('Agenda tanggal ${d} November 2026')">
                ${d}
                ${[2, 5, 10, 18, 22, 25].includes(d) ? '<div class="event-dot"></div>' : ''}
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <p class="section-label">AGENDA HARI INI — RABU, 18 NOVEMBER</p>

        <div class="card card-with-border">
          <div class="event-card">
            <div class="event-time">
              <div class="hour">07</div>
              <div class="minute">:00</div>
            </div>
            <div class="event-divider"></div>
            <div class="flex-1">
              <h4 class="card-title">Upacara & Pengarahan Wali Kelas</h4>
              <p class="card-desc">📍 Lapangan Utama • Seluruh Siswa & Guru</p>
            </div>
          </div>
        </div>

        <div class="card card-with-border green">
          <div class="event-card">
            <div class="event-time">
              <div class="hour">07</div>
              <div class="minute">:45</div>
            </div>
            <div class="event-divider"></div>
            <div class="flex-1">
              <h4 class="card-title">Kegiatan Literasi Bersama</h4>
              <p class="card-desc">📍 Kelas Masing-masing • Membaca buku inspiratif</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function getInformasiHTML() {
  const canCreate = ['guru', 'wali', 'kepsek', 'admin'].includes(currentRole);

  return `
    <div class="fade-in">
      <header class="page-header">
        <div class="page-header-row">
          <div>
            <h2>Pusat Informasi</h2>
            <p class="subtitle">Pengumuman resmi dan edaran sekolah</p>
          </div>
          ${
            canCreate
              ? `
            <div class="flex items-center gap-sm">
              ${currentRole !== 'admin' ? `
                <button class="header-action-btn" onclick="navigateTo('pengajuan-saya')" title="Lihat Pengajuan Saya" style="position:relative;">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                  ${AppData.pendingInfoList.filter(r => r.roleKey === currentRole && r.status === 'pending').length > 0 ? `<span class="header-badge">${AppData.pendingInfoList.filter(r => r.roleKey === currentRole && r.status === 'pending').length}</span>` : ''}
                </button>
              ` : ''}
              <button class="header-action-btn" onclick="navigateTo('buat-info')" title="${currentRole === 'admin' ? 'Buat Informasi Baru' : 'Ajukan Informasi Baru'}">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              </button>
            </div>
          `
              : ''
          }
        </div>
      </header>

      <section class="content-section">
        ${
          ['guru', 'wali'].includes(currentRole)
            ? `
          <div class="card card-with-border mb-sm" style="background: linear-gradient(135deg, #EFF6FF, #DBEAFE); border-left-color: var(--primary); cursor: default;">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="card-title" style="font-size: 13px;">📢 Ingin Menambah Info Skala Sekolah?</h4>
                <p class="card-desc" style="font-size: 11px; margin-top: 2px;">Ajukan request di aplikasi. Setelah di-ACC Admin, info akan otomatis terbit.</p>
              </div>
              <button class="btn-primary" style="padding: 8px 14px; font-size: 11px; white-space: nowrap; margin-left: 8px;" onclick="navigateTo('buat-info')">+ Request Info</button>
            </div>
          </div>
        `
            : currentRole === 'admin'
            ? `
          <div class="card card-with-border amber mb-sm" style="background: #FFFBEB; cursor: default;">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="card-title" style="font-size: 13px;">⚡ Pusat ACC Pengajuan (${AppData.pendingInfoList.filter(r => r.status === 'pending').length} Menunggu)</h4>
                <p class="card-desc" style="font-size: 11px; margin-top: 2px;">Tinjau dan ACC pengajuan informasi dari guru & wali kelas.</p>
              </div>
              <button class="btn-success" style="padding: 8px 14px; font-size: 11px; white-space: nowrap; margin-left: 8px;" onclick="navigateTo('persetujuan')">Buka Antrean ACC</button>
            </div>
          </div>
        `
            : ''
        }

        <!-- Search -->
        <div class="search-bar">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input type="text" placeholder="Cari agenda atau informasi..." oninput="handleSearch(this.value)">
        </div>

        <!-- Filter Kategori -->
        <div class="filter-chips">
          ${['Semua', 'Kegiatan', 'Akademik', 'Jadwal', 'Tugas']
            .map(
              (kat) => `
            <button class="chip ${currentFilter === kat ? 'active' : ''}" onclick="filterInfo('${kat}')">${kat}</button>
          `
            )
            .join('')}
        </div>

        <!-- Daftar Informasi -->
        <div id="info-list-container">
          ${AppData.informasiList
            .filter((item) => currentFilter === 'Semua' || item.kategori === currentFilter)
            .map(
              (item) => `
            <div class="card" onclick="navigateTo('detail-info', ${item.id})">
              <div class="flex items-center justify-between mb-sm">
                <span class="tag ${item.kategori === 'Kegiatan' ? 'tag-blue' : item.kategori === 'Akademik' ? 'tag-green' : 'tag-orange'}">${item.kategori}</span>
                <span class="text-xxs text-muted">${item.tanggal}</span>
              </div>
              <h4 class="card-title">${item.judul}</h4>
              <p class="card-desc">${item.ringkasan}</p>
              <div class="flex items-center justify-between mt-sm">
                <span class="text-xs text-muted">✍️ ${item.pengirim}</span>
                ${item.lampiran ? '<span class="tag tag-amber">📎 Lampiran</span>' : ''}
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </section>
    </div>
  `;
}

function filterInfo(kategori) {
  currentFilter = kategori;
  renderPage('informasi');
}

function handleSearch(keyword) {
  const container = document.getElementById('info-list-container');
  if (!container) return;

  const filtered = AppData.informasiList.filter(
    (i) => i.judul.toLowerCase().includes(keyword.toLowerCase()) || i.ringkasan.toLowerCase().includes(keyword.toLowerCase())
  );

  container.innerHTML = filtered
    .map(
      (item) => `
    <div class="card" onclick="navigateTo('detail-info', ${item.id})">
      <div class="flex items-center justify-between mb-sm">
        <span class="tag tag-blue">${item.kategori}</span>
        <span class="text-xxs text-muted">${item.tanggal}</span>
      </div>
      <h4 class="card-title">${item.judul}</h4>
      <p class="card-desc">${item.ringkasan}</p>
      <div class="flex items-center justify-between mt-sm">
        <span class="text-xs text-muted">✍️ ${item.pengirim}</span>
      </div>
    </div>
  `
    )
    .join('');
}

function getNotifikasiHTML() {
  return `
    <div class="fade-in">
      <header class="page-header">
        <div class="page-header-row">
          <div>
            <h2>Notifikasi</h2>
            <p class="subtitle">Pemberitahuan agenda & update sistem</p>
          </div>
          <button class="btn-outline" style="border-color: white; color: white;" onclick="markAllNotificationsAsRead()">Tandai Dibaca</button>
        </div>
      </header>

      <section class="content-section">
        <p class="section-label">HARI INI</p>
        ${AppData.notifikasiList
          .map(
            (n) => `
          <div class="notif-card ${n.unread ? 'unread' : ''}" onclick="toggleNotifRead(${n.id})">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-sm">
                ${n.unread ? '<div class="notif-unread-dot"></div>' : ''}
                <h4 class="card-title">${n.judul}</h4>
              </div>
              <span class="text-xxs text-muted">${n.waktu}</span>
            </div>
            <p class="card-desc mt-sm">${n.pesan}</p>
          </div>
        `
          )
          .join('')}
      </section>
    </div>
  `;
}

function toggleNotifRead(id) {
  const notif = AppData.notifikasiList.find((n) => n.id === id);
  if (notif) notif.unread = false;
  renderPage('notifikasi');
}

function markAllNotificationsAsRead() {
  AppData.notifikasiList.forEach((n) => (n.unread = false));
  renderPage('notifikasi');
}

function getKegiatanHTML() {
  return `
    <div class="fade-in">
      <header class="page-header">
        <div class="flex items-center">
          <button class="back-btn" onclick="navigateTo('dashboard')">❮</button>
          <div>
            <h2>Jadwal Pembiasaan</h2>
            <p class="subtitle">Agenda pembiasaan rutin sekolah per hari</p>
          </div>
        </div>
      </header>

      <section class="content-section">
        <div class="card">
          <p class="form-label">PILIH HARI</p>
          <div class="week-selector">
            ${AppData.kegiatanMingguan
              .map(
                (k, idx) => `
              <div class="week-day ${idx === 1 ? 'active' : ''}">
                <div class="day-label">${k.hari.substring(0, 3)}</div>
                <div class="day-num">${16 + idx}</div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <p class="section-label">SUSUNAN KEGIATAN HARIAN</p>

        ${AppData.kegiatanMingguan
          .map(
            (k) => `
          <div class="card card-with-border ${k.status === 'Aktif' ? 'green' : ''}">
            <div class="flex items-center justify-between">
              <span class="tag tag-blue">${k.hari} • ${k.waktu}</span>
              <span class="tag ${k.status === 'Aktif' ? 'tag-green' : 'tag-gray'}">${k.status}</span>
            </div>
            <h4 class="card-title mt-sm">${k.kegiatan}</h4>
            <p class="card-desc">📍 ${k.lokasi}</p>
            <p class="text-xs text-muted mt-sm">Petugas: <strong>${k.petugas}</strong></p>
          </div>
        `
          )
          .join('')}

        ${
          ['guru', 'admin'].includes(currentRole)
            ? `
          <div class="admin-tools-box mt-md">
            <p class="font-bold text-sm text-center">⚙️ Pengaturan Jadwal Pembiasaan</p>
            <div class="admin-tools-grid">
              <div class="admin-tool-item" onclick="alert('Tambah kegiatan baru')">
                <span>➕</span>
                <p>Tambah Jadwal</p>
              </div>
              <div class="admin-tool-item" onclick="alert('Atur petugas giliran')">
                <span>👥</span>
                <p>Atur Petugas</p>
              </div>
            </div>
          </div>
        `
            : ''
        }
      </section>
    </div>
  `;
}

function getTugasHTML() {
  return `
    <div class="fade-in">
      <header class="page-header">
        <div class="flex items-center">
          <button class="back-btn" onclick="navigateTo('dashboard')">❮</button>
          <div>
            <h2>Tugas & Pembagian Peran</h2>
            <p class="subtitle">Daftar penugasan kelas dan pembiasaan</p>
          </div>
        </div>
      </header>

      <section class="content-section">
        <div class="card">
          <h4 class="card-title">Penugasan Pekan Ini</h4>
          <p class="card-desc">Setiap kelas memiliki tugas giliran yang telah disepakati.</p>

          <div class="mt-md">
            <div class="task-item blue">
              <span style="font-size: 20px;">🏃</span>
              <div class="flex-1">
                <div class="font-bold text-sm">Pemandu Senam Pagi</div>
                <div class="text-xs text-muted">Selasa • Lapangan Utama</div>
              </div>
              <div class="avatar-stack">
                <div class="avatar" style="background: #FFCDD2;">AS</div>
                <div class="avatar" style="background: #C8E6C9;">RN</div>
                <div class="avatar" style="background: #BBDEFB;">+2</div>
              </div>
            </div>

            <div class="task-item green">
              <span style="font-size: 20px;">📖</span>
              <div class="flex-1">
                <div class="font-bold text-sm">Petugas Bahasa & Literasi</div>
                <div class="text-xs text-muted">Kamis • Pojok Literasi</div>
              </div>
              <div class="avatar-stack">
                <div class="avatar" style="background: #FFE082;">DW</div>
                <div class="avatar" style="background: #E1BEE7;">FR</div>
              </div>
            </div>

            <div class="task-item purple">
              <span style="font-size: 20px;">🕌</span>
              <div class="flex-1">
                <div class="font-bold text-sm">Adzan & Pembaca Doa</div>
                <div class="text-xs text-muted">Jumat • Masjid Sekolah</div>
              </div>
              <div class="avatar-stack">
                <div class="avatar" style="background: #B2DFDB;">MR</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function getDetailInfoHTML(id) {
  const item = AppData.informasiList.find((i) => i.id === id) || AppData.informasiList[0];

  return `
    <div class="fade-in">
      <header class="page-header">
        <div class="flex items-center">
          <button class="back-btn" onclick="navigateTo('informasi')">❮</button>
          <div>
            <h2>Detail Informasi</h2>
            <p class="subtitle">${item.kategori}</p>
          </div>
        </div>
      </header>

      <section class="content-section">
        <div class="card" style="padding: 0; overflow: hidden;">
          <div class="info-detail-header">
            <span class="tag tag-penting mb-sm">${item.kategori}</span>
            <h3 style="font-size: 18px; font-weight: 800;">${item.judul}</h3>
          </div>
          <div class="info-detail-body">
            <div class="flex items-center gap-sm mb-md pb-sm" style="border-bottom: 1px solid var(--border);">
              <div class="user-avatar" style="background: #E3F2FD; color: var(--primary);">👤</div>
              <div>
                <div class="font-bold text-sm">${item.pengirim}</div>
                <div class="text-xs text-muted">${item.peran} • ${item.tanggal}</div>
              </div>
            </div>

            <p>${item.isi}</p>

            <div class="info-meta-box mt-md">
              <div class="info-meta-row">
                <span class="info-meta-label">Tanggal Pelaksanaan:</span>
                <span class="info-meta-value">${item.tanggal}</span>
              </div>
              <div class="info-meta-row">
                <span class="info-meta-label">Waktu:</span>
                <span class="info-meta-value">${item.waktu}</span>
              </div>
              <div class="info-meta-row">
                <span class="info-meta-label">Status Verifikasi:</span>
                <span class="info-meta-value text-success">✓ Disetujui Admin</span>
              </div>
            </div>

            ${
              item.lampiran
                ? `
              <div class="attachment-item mt-md">
                <span style="font-size: 24px;">📄</span>
                <div class="att-info">
                  <div class="att-name">${item.lampiran}</div>
                  <div class="att-size">PDF Document • 420 KB</div>
                </div>
                <button class="att-download" onclick="alert('Mengunduh lampiran...')">Unduh</button>
              </div>
            `
                : ''
            }
          </div>
        </div>
      </section>
    </div>
  `;
}

function getBuatInfoHTML() {
  const isAdmin = currentRole === 'admin';

  return `
    <div class="fade-in">
      <header class="page-header">
        <div class="flex items-center">
          <button class="back-btn" onclick="navigateTo('informasi')">❮</button>
          <div>
            <h2>${isAdmin ? 'Buat Informasi Sekolah' : 'Request Informasi Skala Sekolah'}</h2>
            <p class="subtitle">${isAdmin ? 'Publikasi resmi langsung skala sekolah' : 'Persetujuan internal aplikasi oleh Admin (Bukan WhatsApp)'}</p>
          </div>
        </div>
      </header>

      <section class="content-section">
        ${!isAdmin ? `
        <div class="request-info-banner">
          <div class="request-info-icon">📋</div>
          <div>
            <h4>Alur Persetujuan Aplikasi (Bukan WhatsApp)</h4>
            <p>Data yang Anda masukkan berskala sekolah. Permintaan ini langsung terkirim ke panel <strong>Pusat ACC Admin</strong> di aplikasi ini. Setelah Admin menekan tombol <strong>ACC</strong>, informasi akan langsung terbit secara otomatis untuk seluruh sekolah.</p>
          </div>
        </div>
        ` : ''}

        <div class="form-card">
          <form onsubmit="handleCreateNotice(event)">
            <div class="form-group">
              <label class="form-label">KATEGORI PENGUMUMAN *</label>
              <select class="form-input" id="new-kategori" required>
                <option value="Kegiatan">Kegiatan</option>
                <option value="Akademik">Akademik</option>
                <option value="Jadwal">Jadwal</option>
                <option value="Tugas">Tugas</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">JUDUL PENGUMUMAN *</label>
              <input type="text" class="form-input" id="new-judul" placeholder="Contoh: Pembiasaan Shalat Berjamaah" required>
            </div>

            <div class="form-group">
              <label class="form-label">RINGKASAN SINGKAT *</label>
              <input type="text" class="form-input" id="new-ringkasan" placeholder="Deskripsi singkat yang tampil di beranda" required>
            </div>

            <div class="form-group">
              <label class="form-label">ISI INFORMASI LENGKAP *</label>
              <textarea class="form-input" id="new-isi" rows="4" placeholder="Tulis instruksi atau informasi lengkap di sini..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">LAMPIRAN DOKUMEN / FOTO</label>
              <div class="upload-zone" onclick="alert('Pilih file lampiran PDF/Gambar')">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                <p>Klik untuk unggah lampiran</p>
                <div class="upload-hint">Format PDF, PNG, JPG maks 5MB</div>
              </div>
            </div>

            <div class="flex gap-sm mt-md">
              <button type="button" class="btn-secondary flex-1" onclick="navigateTo('informasi')">Batal</button>
              <button type="submit" class="btn-primary flex-1">${isAdmin ? '📢 Terbitkan Sekarang' : '📨 Kirim Request ke Admin (Tunggu ACC)'}</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  `;
}

function handleCreateNotice(e) {
  e.preventDefault();
  const judul = document.getElementById('new-judul').value;
  const kategori = document.getElementById('new-kategori').value;
  const ringkasan = document.getElementById('new-ringkasan').value;
  const isi = document.getElementById('new-isi').value;
  const isAdmin = currentRole === 'admin';

  if (isAdmin) {
    const newNotice = {
      id: Date.now(),
      judul,
      kategori,
      ringkasan,
      isi,
      pengirim: AppData.roles[currentRole].name,
      peran: AppData.roles[currentRole].label,
      tanggal: 'Hari Ini',
      waktu: '10.00 WIB',
      isPenting: true,
      lampiran: null
    };
    AppData.informasiList.unshift(newNotice);
    showToast('✅ Informasi berhasil diterbitkan langsung!', 'success');
    navigateTo('informasi');
  } else {
    const newRequest = {
      id: 'INFO-REQ-' + Date.now(),
      judul,
      kategori,
      ringkasan,
      isi,
      pengirim: AppData.roles[currentRole].name,
      peran: AppData.roles[currentRole].label,
      roleKey: currentRole,
      tanggal: 'Hari Ini',
      waktu: '10.00 WIB',
      status: 'pending',
      catatan: null,
      lampiran: null
    };
    AppData.pendingInfoList.unshift(newRequest);

    AppData.notifikasiList.unshift({
      id: Date.now(),
      judul: 'Request Informasi Baru Menunggu ACC ⏳',
      pesan: `${AppData.roles[currentRole].name} mengajukan: "${judul}". Masuk ke Pusat ACC untuk menyetujui.`,
      tipe: 'persetujuan',
      waktu: 'Baru saja',
      unread: true
    });

    showToast('📨 Request berhasil dikirim ke antrean ACC Admin di aplikasi!', 'info');
    navigateTo('pengajuan-saya');
  }
}

function showToast(message, type) {
  type = type || 'info';
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification toast-' + type;
  toast.innerHTML = '<span>' + message + '</span>';
  document.body.appendChild(toast);

  requestAnimationFrame(function() { toast.classList.add('show'); });
  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() { toast.remove(); }, 300);
  }, 3000);
}

function getPengajuanSayaHTML() {
  const allMyRequests = AppData.pendingInfoList.filter(function(r) { return r.roleKey === currentRole; });
  const filteredRequests = allMyRequests.filter(function(r) {
    if (currentPengajuanFilter === 'semua') return true;
    return r.status === currentPengajuanFilter;
  });

  return `
    <div class="fade-in">
      <header class="page-header">
        <div class="flex items-center">
          <button class="back-btn" onclick="navigateTo('informasi')">❮</button>
          <div>
            <h2>Pengajuan Saya</h2>
            <p class="subtitle">Status pengajuan informasi Anda</p>
          </div>
        </div>
      </header>

      <section class="content-section">
        <div class="filter-chips">
          <button class="chip ${currentPengajuanFilter === 'semua' ? 'active' : ''}" onclick="filterPengajuanSaya('semua')">Semua (${allMyRequests.length})</button>
          <button class="chip ${currentPengajuanFilter === 'pending' ? 'active' : ''}" onclick="filterPengajuanSaya('pending')">Menunggu (${allMyRequests.filter(function(r) { return r.status === 'pending'; }).length})</button>
          <button class="chip ${currentPengajuanFilter === 'approved' ? 'active' : ''}" onclick="filterPengajuanSaya('approved')">Disetujui (${allMyRequests.filter(function(r) { return r.status === 'approved'; }).length})</button>
          <button class="chip ${currentPengajuanFilter === 'rejected' ? 'active' : ''}" onclick="filterPengajuanSaya('rejected')">Ditolak (${allMyRequests.filter(function(r) { return r.status === 'rejected'; }).length})</button>
        </div>

        ${filteredRequests.length === 0 ? `
          <div class="empty-state">
            <span class="empty-icon">📭</span>
            <h4>Belum Ada Pengajuan</h4>
            <p>${currentPengajuanFilter === 'semua' ? 'Anda belum mengajukan informasi apapun.' : 'Tidak ada pengajuan dengan status ini.'}</p>
            <button class="btn-primary mt-md" onclick="navigateTo('buat-info')">+ Ajukan Informasi Baru</button>
          </div>
        ` : filteredRequests.map(function(req) { return `
          <div class="card card-with-border ${req.status === 'approved' ? 'green' : req.status === 'rejected' ? 'orange' : 'amber'}">
            <div class="flex items-center justify-between mb-sm">
              <span class="tag ${req.status === 'pending' ? 'tag-amber' : req.status === 'approved' ? 'tag-green' : 'tag-red'}">
                ${req.status === 'pending' ? '⏳ Menunggu Persetujuan' : req.status === 'approved' ? '✅ Disetujui' : '❌ Ditolak'}
              </span>
              <span class="text-xxs text-muted">${req.tanggal}</span>
            </div>
            <h4 class="card-title">${req.judul}</h4>
            <p class="card-desc">${req.ringkasan}</p>
            <div class="flex items-center justify-between mt-sm">
              <span class="tag tag-blue">${req.kategori}</span>
              ${req.lampiran ? '<span class="tag tag-amber">📎 Lampiran</span>' : ''}
            </div>
            ${req.catatan ? `
              <div class="admin-note mt-sm">
                <span class="text-xs font-bold">💬 Catatan Admin:</span>
                <p class="text-xs text-muted">${req.catatan}</p>
              </div>
            ` : ''}
          </div>
        `; }).join('')}
      </section>
    </div>
  `;
}

function filterPengajuanSaya(filter) {
  currentPengajuanFilter = filter;
  renderPage('pengajuan-saya');
}

function getKelolaPengajuanInfoHTML() {
  const pending = AppData.pendingInfoList.filter(function(r) { return r.status === 'pending'; });
  const processed = AppData.pendingInfoList.filter(function(r) { return r.status !== 'pending'; });

  return `
    <div class="fade-in">
      <header class="page-header">
        <div class="flex items-center">
          <button class="back-btn" onclick="navigateTo('dashboard')">❮</button>
          <div>
            <h2>Pusat ACC & Persetujuan Admin</h2>
            <p class="subtitle">ACC pengajuan informasi skala sekolah langsung di aplikasi</p>
          </div>
        </div>
      </header>

      <section class="content-section">
        <div class="filter-chips">
          <button class="chip ${currentKelolaFilter === 'pending' ? 'active' : ''}" onclick="filterKelolaInfo('pending')">Menunggu ACC (${pending.length})</button>
          <button class="chip ${currentKelolaFilter === 'processed' ? 'active' : ''}" onclick="filterKelolaInfo('processed')">Riwayat ACC (${processed.length})</button>
        </div>

        ${currentKelolaFilter === 'pending' ? (
          pending.length === 0 ? `
            <div class="empty-state">
              <span class="empty-icon">✅</span>
              <h4>Semua Pengajuan Sudah Di-ACC</h4>
              <p>Tidak ada antrean pengajuan informasi baru dari guru atau wali kelas saat ini.</p>
            </div>
          ` : pending.map(function(req) { return `
            <div class="approval-card" id="info-card-${req.id}">
              <div class="flex items-center justify-between mb-sm">
                <span class="tag tag-amber">⏳ Menunggu ACC Admin</span>
                <span class="tag tag-blue">🏫 Skala Seluruh Sekolah</span>
              </div>
              <h4 class="card-title">${req.judul}</h4>
              <p class="card-desc mt-sm">${req.ringkasan}</p>

              <div class="request-detail-box mt-sm">
                <div class="flex items-center gap-sm mb-sm">
                  <div class="user-avatar" style="background: #E3F2FD; color: var(--primary); width: 34px; height: 34px; font-size: 16px;">👤</div>
                  <div>
                    <div class="font-bold text-xs">${req.pengirim}</div>
                    <div class="text-xxs text-muted">${req.peran} • ${req.tanggal}</div>
                  </div>
                </div>
                <p class="text-xs" style="color: #4A5568; line-height: 1.6;">${req.isi}</p>
                ${req.lampiran ? `
                  <div class="flex items-center gap-sm mt-sm">
                    <span class="tag tag-amber">📎 Lampiran: ${req.lampiran}</span>
                  </div>
                ` : ''}
              </div>

              <div class="flex items-center gap-sm mt-sm">
                <span class="tag tag-purple">Kategori: ${req.kategori}</span>
                <span class="text-xxs text-muted">Diajukan: ${req.tanggal} ${req.waktu}</span>
              </div>

              <div class="approval-actions mt-sm" style="display: flex; gap: 8px;">
                <button class="btn-success" style="flex: 1.4; padding: 12px 14px; font-size: 13px; font-weight: 700;" onclick="approveInfoRequest('${req.id}')">✅ ACC & Terbitkan Langsung</button>
                <button class="btn-danger-outline" style="flex: 1; padding: 12px 14px; font-size: 13px; font-weight: 700;" onclick="rejectInfoRequest('${req.id}')">❌ Tolak</button>
              </div>
            </div>
          `; }).join('')
        ) : (
          processed.length === 0 ? `
            <div class="empty-state">
              <span class="empty-icon">📂</span>
              <h4>Belum Ada Riwayat ACC</h4>
              <p>Belum ada pengajuan informasi yang diproses sebelumnya.</p>
            </div>
          ` : processed.map(function(req) { return `
            <div class="card card-with-border ${req.status === 'approved' ? 'green' : 'orange'} mb-sm">
              <div class="flex items-center justify-between">
                <span class="tag ${req.status === 'approved' ? 'tag-green' : 'tag-red'}">
                  ${req.status === 'approved' ? '✅ Sudah Di-ACC & Terbit' : '❌ Ditolak Admin'}
                </span>
                <span class="text-xxs text-muted">${req.tanggal}</span>
              </div>
              <h4 class="card-title mt-sm">${req.judul}</h4>
              <p class="card-desc">Pengaju: <strong>${req.pengirim}</strong> (${req.peran})</p>
              ${req.catatan ? `
                <div class="admin-note mt-sm">
                  <span class="text-xs font-bold">💬 Catatan:</span>
                  <p class="text-xs text-muted">${req.catatan}</p>
                </div>
              ` : ''}
            </div>
          `; }).join('')
        )}
      </section>
    </div>
  `;
}

function filterKelolaInfo(filter) {
  currentKelolaFilter = filter;
  renderPage(activePage);
}

function approveInfoRequest(id) {
  var req = AppData.pendingInfoList.find(function(r) { return r.id === id; });
  if (!req) return;

  req.status = 'approved';

  AppData.informasiList.unshift({
    id: Date.now(),
    judul: req.judul,
    kategori: req.kategori,
    ringkasan: req.ringkasan,
    isi: req.isi,
    pengirim: req.pengirim,
    peran: req.peran,
    tanggal: 'Hari Ini',
    waktu: '10.00 WIB',
    isPenting: true,
    lampiran: req.lampiran
  });

  AppData.notifikasiList.unshift({
    id: Date.now(),
    judul: 'Request Informasi Di-ACC Admin ✅',
    pesan: 'Informasi "' + req.judul + '" telah disetujui oleh Admin dan diterbitkan skala sekolah.',
    tipe: 'persetujuan',
    waktu: 'Baru saja',
    unread: true
  });

  showToast('✅ Berhasil di-ACC! Informasi langsung terbit untuk seluruh warga sekolah.', 'success');
  renderPage(activePage);
}

function rejectInfoRequest(id) {
  var req = AppData.pendingInfoList.find(function(r) { return r.id === id; });
  if (!req) return;

  var alasan = prompt('Masukkan alasan penolakan (opsional):');
  req.status = 'rejected';
  req.catatan = alasan || 'Tidak memenuhi kriteria publikasi skala sekolah.';

  AppData.notifikasiList.unshift({
    id: Date.now(),
    judul: 'Request Informasi Ditolak ❌',
    pesan: 'Informasi "' + req.judul + '" tidak disetujui oleh Admin. Alasan: ' + req.catatan,
    tipe: 'persetujuan',
    waktu: 'Baru saja',
    unread: true
  });

  showToast('❌ Pengajuan telah ditolak.', 'error');
  renderPage(activePage);
}

function getPersetujuanHTML() {
  return getKelolaPengajuanInfoHTML();
}

function getSaranHTML() {
  return `
    <div class="fade-in">
      <header class="page-header">
        <div class="flex items-center">
          <button class="back-btn" onclick="navigateTo('profil')">❮</button>
          <div>
            <h2>Saran & Kotak Masukan</h2>
            <p class="subtitle">Penyampaian aspirasi via WhatsApp Resmi</p>
          </div>
        </div>
      </header>

      <section class="content-section">
        <div class="wa-info mb-md">
          <h4 class="font-bold text-sm" style="color: var(--primary-dark);">Kirim Masukan Langsung ke Admin</h4>
          <p class="text-xs text-muted mt-sm">Sesuai keputusan aturan SAPA SEKOLAH, pengaduan siswa diproses via kanal WhatsApp Center untuk respon cepat.</p>
        </div>

        <div class="form-card">
          <div class="form-group">
            <label class="form-label">KATEGORI SARAN</label>
            <select class="form-input" id="saran-kategori">
              <option>Agenda Pembiasaan</option>
              <option>Fasilitas Sekolah</option>
              <option>Kebersihan Lingkungan</option>
              <option>Lainnya</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">TULIS PESAN / ASPIRASI *</label>
            <textarea class="form-input" id="saran-teks" rows="4" placeholder="Tuliskan saran perbaikan untuk sekolah..."></textarea>
          </div>

          <button class="btn-whatsapp" onclick="sendWhatsAppSaran()">
            <span>💬 Kirim ke WhatsApp Admin</span>
          </button>
        </div>
      </section>
    </div>
  `;
}

function sendWhatsAppSaran() {
  const kategori = document.getElementById('saran-kategori').value;
  const teks = document.getElementById('saran-teks').value;

  if (!teks.trim()) {
    alert('Harap isi pesan saran Anda terlebih dahulu.');
    return;
  }

  const role = AppData.roles[currentRole];
  const pesanWA = `Halo Admin SAPA SEKOLAH,%0A%0ASaya: ${encodeURIComponent(role.name)} (${encodeURIComponent(
    role.label
  )})%0AKategori: ${encodeURIComponent(kategori)}%0ASaran: ${encodeURIComponent(teks)}`;

  window.open(`https://wa.me/6281234567890?text=${pesanWA}`, '_blank');
}

function getArsipHTML() {
  return `
    <div class="fade-in">
      <header class="page-header">
        <div class="flex items-center">
          <button class="back-btn" onclick="navigateTo('profil')">❮</button>
          <div>
            <h2>Arsip Kegiatan</h2>
            <p class="subtitle">Riwayat pelaksanaan agenda pembiasaan</p>
          </div>
        </div>
      </header>

      <section class="content-section">
        <div class="stats-box mb-md">
          <div class="stats-main">Total Agenda Terlaksana: 18 Kegiatan</div>
          <div class="stats-detail">Bulan November 2026 • Tingkat Kehadiran 98%</div>
        </div>

        ${AppData.arsipKegiatan
          .map(
            (a) => `
          <div class="card mb-sm">
            <div class="arsip-item">
              <div class="arsip-date">
                <div class="date-num">${a.tanggal}</div>
                <div class="date-day">${a.hari}</div>
              </div>
              <div class="arsip-divider"></div>
              <div class="flex-1">
                <h4 class="card-title">${a.nama}</h4>
                <p class="card-desc">📍 ${a.lokasi} • Terlaksana</p>
              </div>
              <span class="tag tag-green">✓ Selesai</span>
            </div>
          </div>
        `
          )
          .join('')}
      </section>
    </div>
  `;
}

function getProfilHTML() {
  const role = AppData.roles[currentRole];
  const isAdmin = currentRole === 'admin';
  const isGuruOrWali = ['guru', 'wali'].includes(currentRole);
  const isSiswa = currentRole === 'siswa';

  const pendingAdminCount = AppData.pendingInfoList.filter(r => r.status === 'pending').length;
  const myPendingCount = AppData.pendingInfoList.filter(r => r.roleKey === currentRole && r.status === 'pending').length;

  return `
    <div class="fade-in">
      <header class="profile-header">
        <div class="profile-avatar">${role.icon}</div>
        <h2 class="profile-name">${role.name}</h2>
        <p class="profile-role">${role.label}</p>
        <p class="text-xs" style="color: rgba(255,255,255,0.7); margin-top: 4px;">NIS/NIP: ${role.nis || role.nip}</p>
      </header>

      <section class="content-section">
        <div class="menu-list">
          ${
            isGuruOrWali
              ? `
            <div class="menu-item" onclick="navigateTo('buat-info')">
              <div class="menu-icon" style="background: #E3F2FD;">📝</div>
              <span class="menu-item-label">Request Tambah Informasi / Agenda</span>
              <span class="arrow">➔</span>
            </div>
            <div class="menu-item" onclick="navigateTo('pengajuan-saya')">
              <div class="menu-icon" style="background: #FFF8E1;">📋</div>
              <span class="menu-item-label">Status Request Saya (ACC Admin)</span>
              <span class="menu-badge">${myPendingCount} Proses</span>
            </div>
          `
              : ''
          }

          ${
            isAdmin
              ? `
            <div class="menu-item" onclick="navigateTo('persetujuan')">
              <div class="menu-icon" style="background: #E8F5E9;">⚡</div>
              <span class="menu-item-label">Pusat ACC & Persetujuan Aplikasi</span>
              <span class="menu-badge">${pendingAdminCount} Menunggu ACC</span>
            </div>
            <div class="menu-item" onclick="navigateTo('buat-info')">
              <div class="menu-icon" style="background: #E3F2FD;">📢</div>
              <span class="menu-item-label">Buat Informasi Sekolah Langsung</span>
              <span class="arrow">➔</span>
            </div>
            <div class="menu-item" onclick="alert('Buka panel Verifikasi Akun Pengguna')">
              <div class="menu-icon" style="background: #F3E5F5;">👥</div>
              <span class="menu-item-label">Verifikasi Akun Pengguna</span>
              <span class="arrow">➔</span>
            </div>
          `
              : ''
          }

          ${
            isSiswa
              ? `
            <div class="menu-item" onclick="navigateTo('saran')">
              <div class="menu-icon" style="background: #E8F5E9;">💬</div>
              <span class="menu-item-label">Saran & Aspirasi Siswa</span>
              <span class="arrow">➔</span>
            </div>
          `
              : ''
          }

          <div class="menu-item" onclick="navigateTo('arsip')">
            <div class="menu-icon" style="background: #F1F5F9;">🗂️</div>
            <span class="menu-item-label">Arsip Riwayat Kegiatan Sekolah</span>
            <span class="arrow">➔</span>
          </div>
        </div>

        <div class="mt-md">
          <button class="btn-logout" onclick="logoutUser()">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Keluar dari Akun
          </button>
        </div>
      </section>
    </div>
  `;
}
