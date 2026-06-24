// ==================== PENGATURAN KREDENSIAL SUPABASE ====================
const SUPABASE_URL = "https://lnlyaagoxeynsorekequ.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxubHlhYWdveGV5bnNvcmVrZXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNTk3MzQsImV4cCI6MjA5NzgzNTczNH0.hp_xZj6gvFaOo6ePXN6NJowXSjZoUpzulK_I_w7m6kI"; 

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Cache internal untuk memproses penyaringan & pencarian cepat secara client-side
let databaseCache = [];

// --- DATA JURUSAN (Berdasarkan Informasi di Flyer) ---
const majorData = {
  pplg: {
    title: "Pengembangan Perangkat Lunak dan GIM (PPLG)",
    desc: "Program keahlian yang mempelajari dan mendalami pengembangan perangkat lunak, termasuk pembuatan aplikasi, website, game, dan hal-hal terkait pemrograman. Jurusan ini mencetak lulusan yang siap berkarier di industri teknologi digital.",
    kejuruan: [
      "Matematika", "Bahasa Inggris", "Informatika", "IPA", "IPAS",
      "Project Kreatif dan Kewirausahaan", "Pemrograman Dasar Dekstop",
      "Pemrograman Dekstop C#", "Analist Sistem & SDLC", "Laravel & ASP",
      "Web Design", "ART Game Design", "Game Development",
      "Mobile Programing", "UI / UX Design System"
    ],
    umum: [
      "Bahasa Indonesia", "Pendidikan Agama Islam",
      "Pendidikan Pancasila dan Kewarganegaraan",
      "Pendidikan Jasmani Olahraga dan Kesehatan",
      "Seni Budaya", "Sejarah indonesia"
    ],
    mulok: [
      "Seni Membatik", "Bahasa Jepang", "Pencak Silat"
    ],
    jobs: [
      "Web Developer", "UI / UX Designer", "System Analyst",
      "Game Developer", "Desktop Programmer", "Mobile Apps Developer"
    ],
    slogan: '"Wujudkan Ide Mu, Bangun Masa Depanmu!" - Bersama PPLG, ciptakan solusi, bangun dunia digital.',
    theme: {
      primary: 'var(--pplg-primary)',
      secondary: 'var(--pplg-secondary)',
      bgLight: 'var(--pplg-bg-light)',
      accent: 'var(--pplg-accent)'
    }
  },
  mplb: {
    title: "Manajemen Perkantoran dan Layanan Bisnis (MPLB)",
    desc: "Adalah jurusan yang mempelajari manajemen administrasi, organisasi, dan layanan di lingkungan perkantoran dan bisnis. Jurusan ini membekali siswa dengan keterampilan dan pengetahuan yang dibutuhkan untuk bekerja di dunia perkantoran dan bisnis.",
    kejuruan: [
      "Matematika", "Bahasa Inggris", "Informatika", "IPAS", "Ekonomi Bisnis",
      "Administrasi Umum", "Teknologi Perkantoran", "Korespondensi", "Kearsipan",
      "Transaksi Keuangan", "Public Speaking Layanan Informasi & Komunikasi", "Kesekretarisan",
      "Produksi Dokumen dan Pengolahan Data", "Kewirausahaan", "Tata Kelola Sarana & Prasarana",
      "Tata Kelola Humas & Keprotokolan", "Tata Kelola Kepegawaian"
    ],
    umum: [
      "Pendidikan Agama", "PPKN", "Bahasa Indonesia", "Penjas", "Sejarah Indonesia", "Seni Budaya"
    ],
    mulok: [
      "Tarbiyah Islamiyah", "Pencak Silat", "Membatik", "Bahasa Jepang"
    ],
    jobs: [
      "Staff Administrasi Umum", "Sekretaris", "Resepsionis", "Staff Arsip", "Operator Office", "Public Relation"
    ],
    slogan: '"MPLB, Pilihan Cerdas Untuk Karier Sukses!" - Berkompeten, Berkarakter, Siap Kerja!',
    theme: {
      primary: 'var(--mplb-primary)',
      secondary: 'var(--mplb-secondary)',
      bgLight: 'var(--mplb-bg-light)',
      accent: 'var(--mplb-accent)'
    }
  },
  dkv: {
    title: "Desain Komunikasi Visual (DKV)",
    desc: "Program keahlian yang mempelajari cara menyampaikan pesan atau informasi secara kreatif melalui elemen visual, seperti gambar, tipografi, ilustrasi, dan animasi. Di SMK berbasis komputer, siswa DKV dilatih menggunakan berbagai perangkat lunak desain modern untuk menghasilkan karya yang komunikatif, menarik, dan efektif.",
    kejuruan: [
      "Matematika", "Bahasa Inggris", "Informatika", "Proyek Ilmu Pengetahuan Alam dan Sosial (Fisika)", "Proyek Ilmu Pengetahuan Alam dan Sosial (Sosial)",
      "Dasar-dasar Desain Komunikasi Visual (Dasar Kreativitas, Dasar Desain Grafis, Komunikasi Massa, Teknik Pengolahan Audio dan Video)",
      "Konsentrasi Keahlian (Desain Publikasi, Fotografi, 3D Modeling dan Animasi, Videografi, Digital Marketing, UI/UX Design)"
    ],
    umum: [
      "Pendidikan Agama dan Budi Pekerti", "Pendidikan Pancasila dan Kewarganegaraan",
      "Bahasa Indonesia", "Pendidikan Jasmani, Olahraga, dan Kesehatan", "Sejarah Indonesia", "Seni"
    ],
    mulok: [
      "Muatan Lokal (Pencak Silat)", "Muatan Lokal (Membatik)", "Bahasa Jepang"
    ],
    jobs: [
      "Graphic Designer", "Interactive Media Designer", "Modeler", "UI/UX Designer", "Illustrator",
      "Photographer", "Animator", "Videographer", "Journalist", "Web Designer", "Content Creator", "Entrepreneur"
    ],
    slogan: '"Desain Adalah Bahasa Visual, Karya Adalah Pesan. Sampaikan Ide, Ubah Dunia!" - Siap Kerja, Siap Kreatif!',
    theme: {
      primary: 'var(--dkv-primary)',
      secondary: 'var(--dkv-secondary)',
      bgLight: 'var(--dkv-bg-light)',
      accent: 'var(--dkv-accent)'
    }
  }
};

// --- STATE MANAGEMENT ---
let currentUserRole = 'umum';
let activeMajor = 'mplb';
let activeTab = 'profile';

// Jalankan pengaturan default tema sesaat setelah halaman dimuat
window.onload = function() {
  applyTheme('mplb');
};

// --- SYSTEM TOAST NOTIFICATION ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) {
    alert(message); // fallback jika container HTML tidak ada
    return;
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = '<i class="fa-solid fa-circle-check"></i>';
  if (type === 'error') icon = '<i class="fa-solid fa-circle-xmark"></i>';
  if (type === 'info') icon = '<i class="fa-solid fa-circle-info"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3300);
}

// --- THEME & NAVIGATION LOGIC ---
function applyTheme(majorKey) {
  const root = document.documentElement;
  const theme = majorData[majorKey].theme;
  
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--secondary', theme.secondary);
  root.style.setProperty('--bg-light', theme.bgLight);
  root.style.setProperty('--accent', theme.accent);
}

function switchMajor(majorKey) {
  activeMajor = majorKey;
  applyTheme(majorKey);

  document.getElementById('tabPplg').classList.toggle('active', majorKey === 'pplg');
  document.getElementById('tabMplb').classList.toggle('active', majorKey === 'mplb');
  document.getElementById('tabDkv').classList.toggle('active', majorKey === 'dkv');
  document.getElementById('tabAdminDb').classList.remove('active');

  document.getElementById('profileView').style.display = 'block';
  document.getElementById('registerView').style.display = 'none';
  document.getElementById('adminDbView').style.display = 'none';
  
  renderProfileContent(majorKey);
}

function switchTab(tabKey) {
  activeTab = tabKey;
  
  document.getElementById('tabPplg').classList.remove('active');
  document.getElementById('tabMplb').classList.remove('active');
  document.getElementById('tabDkv').classList.remove('active');
  document.getElementById('tabAdminDb').classList.toggle('active', tabKey === 'admin-db');

  document.getElementById('profileView').style.display = 'none';
  document.getElementById('registerView').style.display = 'none';
  document.getElementById('adminDbView').style.display = tabKey === 'admin-db' ? 'block' : 'none';

  if (tabKey === 'admin-db') {
    renderAdminDashboard();
  }
}

// --- RENDER DETAIL KONTEN JURUSAN ---
function renderProfileContent(majorKey) {
  const data = majorData[majorKey];
  
  document.getElementById('majorName').textContent = data.title;
  document.getElementById('majorDesc').textContent = data.desc;
  document.getElementById('majorSlogan').textContent = data.slogan;

  const labelMap = { mplb: 'MPLB', dkv: 'DKV', pplg: 'PPLG' };
  const shortLabel = labelMap[majorKey] || majorKey.toUpperCase();
  document.getElementById('inlineMajorLabel').textContent = shortLabel;
  document.getElementById('inlineJurusan').value = shortLabel;

  const kejuruanList = document.getElementById('listKejuruan');
  kejuruanList.innerHTML = data.kejuruan.map(item => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`).join('');

  const umumList = document.getElementById('listUmum');
  umumList.innerHTML = data.umum.map(item => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`).join('');

  const mulokList = document.getElementById('listMulok');
  mulokList.innerHTML = data.mulok.map(item => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`).join('');

  const jobGrid = document.getElementById('jobGrid');
  jobGrid.innerHTML = data.jobs.map(job => `
    <div class="job-item">
      <i class="fa-solid fa-briefcase"></i> ${job}
    </div>
  `).join('');
}

// --- FORM PENDAFTARAN INLINE (SIMPAN KE SUPABASE) ---
async function submitInlineForm(event) {
  event.preventDefault();

  const nama = document.getElementById('inlineNama').value.trim();
  const kontak = document.getElementById('inlineKontak').value.trim();
  const jurusan = document.getElementById('inlineJurusan').value;
  const pesan = document.getElementById('inlinePesan').value.trim();

  if (!nama || !kontak) {
    showToast("Nama lengkap dan kontak wajib diisi!", "error");
    return;
  }

  const btnSubmit = document.getElementById('btnSubmitInline');
  const textSubmit = document.getElementById('textSubmitInline');
  if (btnSubmit && textSubmit) {
    btnSubmit.disabled = true;
    textSubmit.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Memproses...`;
  }

  try {
    const { error } = await supabaseClient
      .from('pendaftar')
      .insert([{ nama, kontak, jurusan, pesan }]);

    if (error) throw error;

    showToast(`Terima kasih ${nama}, pendaftaran minat Anda pada jurusan ${jurusan} telah tersimpan!`, "success");
    document.getElementById('inlineInterestForm').reset();
  } catch (error) {
    console.error('Error:', error);
    showToast('Gagal menyimpan ke Supabase: ' + error.message, "error");
  } finally {
    if (btnSubmit && textSubmit) {
      btnSubmit.disabled = false;
      textSubmit.innerHTML = "Kirim Pendaftaran";
    }
  }
}

// --- PROSES LOGIN ---
function handleLogin(role) {
  if (role === 'admin') {
    const u = document.getElementById('adminUsername').value;
    const p = document.getElementById('adminPassword').value;

    if (u === 'admin' && p === 'admin123') {
      currentUserRole = 'admin';
      document.getElementById('roleDisplay').textContent = "Admin";
      document.getElementById('roleDisplay').style.backgroundColor = "var(--dkv-secondary)";
      
      document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
      showToast("Selamat datang Admin!", "info");
      enterApp();
    } else {
      showToast("Username / Password Admin salah!", "error");
    }
  } else {
    currentUserRole = 'umum';
    document.getElementById('roleDisplay').textContent = "Umum / Tamu";
    document.getElementById('roleDisplay').style.backgroundColor = "rgba(255,255,255,0.2)";
    document.getElementById('roleDisplay').style.color = "#fff";

    document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    showToast("Masuk sebagai Tamu.", "info");
    enterApp();
  }
}

function enterApp() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('appScreen').style.display = 'flex';
  switchMajor('pplg');
}

function handleLogout() {
  document.getElementById('appScreen').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('adminUsername').value = '';
  document.getElementById('adminPassword').value = '';
  showToast("Anda telah keluar.", "info");
}

// --- DATABASE: SIMPAN DATA PENDAFTAR KE DATABASE SERVER (POST) ---
async function submitForm(event) {
  event.preventDefault();
  
  const nama = document.getElementById('regNama').value.trim();
  const kontak = document.getElementById('regEmail').value.trim();
  const jurusan = document.getElementById('regJurusan').value;
  const pesan = document.getElementById('regPesan').value.trim();

  if (!nama || !kontak) {
    showToast("Nama lengkap dan kontak wajib diisi!", "error");
    return;
  }

  const btnSubmit = document.getElementById('btnSubmitReg');
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...`;
  }

  try {
    const { error } = await supabaseClient
      .from('pendaftar')
      .insert([{ nama, kontak, jurusan, pesan }]);

    if (error) throw error;

    showToast(`Terima kasih ${nama}, pendaftaran minat Anda pada jurusan ${jurusan} telah tersimpan!`, "success");
    document.getElementById('interestForm').reset();
  } catch (error) {
    console.error('Error:', error);
    showToast('Gagal menyimpan ke Supabase: ' + error.message, "error");
  } finally {
    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = "Kirim Pendaftaran";
    }
  }
}

// --- DATABASE: AMBIL DATA DARI SERVER & HITUNG STATISTIK (GET) ---
async function renderAdminDashboard() {
  const tbody = document.getElementById('dbTableBody');
  tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;"><i class="fa-solid fa-spinner fa-spin"></i> Memuat data dari Supabase...</td></tr>`;

  try {
    const { data: database, error } = await supabaseClient
      .from('pendaftar')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    databaseCache = database || [];
    updateStats(databaseCache);
    renderTableData(databaseCache);

  } catch (error) {
    console.error('Error:', error);
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: red;">Gagal memuat data dari database Supabase.</td></tr>`;
  }
}

// --- HITUNG STATISTIK PENDAFTAR ---
function updateStats(dataList) {
  const total = dataList.length;
  const mplbCount = dataList.filter(item => item.jurusan === 'MPLB').length;
  const dkvCount = dataList.filter(item => item.jurusan === 'DKV').length;
  const pplgCount = dataList.filter(item => item.jurusan === 'PPLG').length;

  document.getElementById('statTotal').textContent = total;
  document.getElementById('statMplb').textContent = mplbCount;
  document.getElementById('statDkv').textContent = dkvCount;
  document.getElementById('statPplg').textContent = pplgCount;
}

// --- MERENDER DATA KE TABEL ADMIN ---
function renderTableData(dataList) {
  const tbody = document.getElementById('dbTableBody');
  tbody.innerHTML = '';

  if (dataList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: #999;">Belum ada pendaftar tersimpan di database.</td></tr>`;
    return;
  }

  dataList.forEach((item, index) => {
    const badgeClass = item.jurusan === 'MPLB' ? 'badge-mplb' : item.jurusan === 'DKV' ? 'badge-dkv' : 'badge-pplg';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${escapeHtml(item.nama)}</strong></td>
      <td>${escapeHtml(item.kontak)}</td>
      <td><span class="badge-major ${badgeClass}">${item.jurusan}</span></td>
      <td style="max-width: 250px; white-space: normal; word-break: break-word;">${escapeHtml(item.pesan || '-')}</td>
      <td>
        <button class="btn-delete" onclick="deleteRecord(${item.id})">
          <i class="fa-solid fa-trash-can"></i> Hapus
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// --- PENYARINGAN & PENCARIAN REAL-TIME DI TABEL ---
function handleFilterChange() {
  const searchValue = (document.getElementById('dbSearchInput')?.value || '').toLowerCase().trim();
  const filterValue = document.getElementById('dbFilterJurusan')?.value || 'all';

  let filteredData = databaseCache;

  // 1. Saring Jurusan
  if (filterValue !== 'all') {
    filteredData = filteredData.filter(item => item.jurusan === filterValue);
  }

  // 2. Saring Kata Kunci Pencarian (Nama / Kontak)
  if (searchValue) {
    filteredData = filteredData.filter(item => 
      item.nama.toLowerCase().includes(searchValue) || 
      item.kontak.toLowerCase().includes(searchValue) ||
      (item.pesan && item.pesan.toLowerCase().includes(searchValue))
    );
  }

  renderTableData(filteredData);
}

// --- DATABASE: HAPUS DATA DARI SERVER (DELETE) ---
async function deleteRecord(id) {
  if (confirm('Apakah Anda yakin ingin menghapus data pendaftar ini dari database Supabase?')) {
    try {
      const { error } = await supabaseClient
        .from('pendaftar')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      showToast("Data pendaftar berhasil dihapus.", "success");
      renderAdminDashboard(); // Segera render ulang tabel
    } catch (error) {
      console.error('Error:', error);
      showToast("Gagal menghapus data dari Supabase: " + error.message, "error");
    }
  }
}

// --- EKSPOR DATABASE KE CSV (EXCEL) ---
function exportDataToCSV() {
  if (databaseCache.length === 0) {
    showToast("Tidak ada data pendaftar untuk diekspor.", "error");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "No,Nama Lengkap,Kontak,Jurusan,Pesan/Catatan Tambahan,Waktu Mendaftar\n";

  databaseCache.forEach((item, index) => {
    const nama = `"${item.nama.replace(/"/g, '""')}"`;
    const kontak = `"${item.kontak.replace(/"/g, '""')}"`;
    const jurusan = `"${item.jurusan}"`;
    const pesan = `"${(item.pesan || '').replace(/"/g, '""')}"`;
    const tanggal = `"${item.created_at || ''}"`;

    csvContent += `${index + 1},${nama},${kontak},${jurusan},${pesan},${tanggal}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const downloadLink = document.createElement("a");
  downloadLink.setAttribute("href", encodedUri);
  downloadLink.setAttribute("download", `pendaftar_smk_inf_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(downloadLink);
  
  downloadLink.click();
  document.body.removeChild(downloadLink);
  showToast("File CSV Berhasil diunduh!", "success");
}

// --- HELPER UNTUK MENCEGAH SERANGAN XSS ---
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.toString().replace(/[&<>"']/g, function(m) { return map[m]; });
}