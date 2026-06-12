# Landing Page Gudang Mahakarnya

Landing page premium statis untuk workshop pembuat furniture custom dengan desain modern, responsif, dan kaya akan animasi interaktif. 

## 🚀 Cara Menjalankan Project
Karena ini adalah website HTML statis, Anda tidak memerlukan proses kompilasi atau server web khusus untuk menjalankannya secara lokal:
1. Klik dua kali file [index.html](file:///Users/mrzf833/code/go/freelance/landing-page-konstruksi/index.html) untuk membukanya secara langsung di web browser Anda (Chrome, Safari, Firefox, Edge, dll).
2. *Atau*, jika Anda menggunakan Visual Studio Code, Anda bisa mengklik kanan `index.html` dan pilih **Open with Live Server** untuk kemudahan pengerjaan.

---

## 📁 Struktur File & Folder
```text
landing-page-konstruksi/
├── index.html                   # Halaman landing page utama (HTML5)
├── README.md                    # Panduan dokumentasi proyek ini
├── assets/
│   ├── css/
│   │   └── custom.css           # Styling tambahan, keyframe, & efek glassmorphism
│   ├── js/
│   │   └── main.js              # Logika interaktivitas (slider, counter, filter, lightbox, dll)
│   └── images/                  # Aset gambar beresolusi tinggi (Generated AI)
│       ├── hero_furniture.png   # Gambar latar belakang Hero (showroom furniture)
│       ├── about_furniture.png  # Gambar bagian Tentang Kami (pengrajin kayu)
│       ├── service_detail.png   # Gambar detail pekerjaan (serat kayu solid)
│       ├── project_bedroom.png  # Portofolio Bedroom (lemari & ranjang)
│       ├── project_living.png   # Portofolio Ruang Makan (meja makan solid walnut)
│       └── project_office.png   # Portofolio Kantor (meja kerja direktur)
```

---

## 🛠️ Teknologi & Fitur
1. **Tailwind CSS v4 (Play CDN)**: Menggunakan engine compiler instan v4 di browser tanpa perlu instalasi npm.
2. **IntersectionObserver Scroll Reveal**: Animasi kemunculan elemen secara halus saat halaman digulir ke bawah (slide-up, slide-left, dll).
3. **Interactive Portfolio Filter**: Tombol penyaring kategori produk (Semua, Kitchen & Wardrobe, Ruang Makan, Kantor & Bisnis) secara instan tanpa memuat ulang halaman.
4. **Full-screen Lightbox Modal**: Fitur zoom gambar portofolio dengan latar belakang gelap saat tombol pencarian diklik.
5. **Interactive Timeline Tracker**: Garis proses vertikal yang mengisi secara dinamis mengikuti kedalaman scroll user.
6. **Autoplay Testimonials Slider**: Komponen geser testimoni otomatis lengkap dengan tombol manual (kiri/kanan) dan titik indikator.
7. **Accordion FAQ**: Sistem dropdown tanya-jawab interaktif dengan rotasi ikon indikator.
8. **Validasi & Simulasi Form Kontak**: Interaksi tombol loading spinner dan notifikasi toast dinamis saat form dikirimkan.

