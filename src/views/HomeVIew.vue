<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function scrollToFeatures() {
  const el = document.getElementById("features");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function logout() {
  // sementara (demo): nanti kalau pakai token/pinia, hapus datanya di sini
  router.push("/login");
}
</script>

<template>
  <div class="page">
    <!-- NAVBAR -->
    <header class="navbar">
      <div class="nav-left">
        <div class="brand">
          <div class="brand-badge">⚽</div>
          <span class="logo">SPORTIVE</span>
        </div>
      </div>

<nav class="nav-center">
  <RouterLink to="/" class="nav-link">Home</RouterLink>
  <RouterLink to="/cari" class="nav-link">Cari Lawan</RouterLink>
  <RouterLink to="/booking" class="nav-link">Booking Lapangan</RouterLink>
  <RouterLink to="/chat" class="nav-link">Chat</RouterLink>
</nav>


      <div class="nav-right">
        <button class="btn-logout" type="button" @click="logout">Keluar</button>
      </div>
    </header>

    <!-- HERO -->
    <section class="hero">
      <div class="hero-inner">
        <h1>
          Temukan Lawan dan Lapangan<br />
          Olahraga Lebih Mudah
        </h1>

        <p>
          Cari lawan, booking lapangan, dan kelola tim Anda dalam satu platform.
          Mulai dari fitur unggulan kami di bawah ini.
        </p>

        <div class="hero-btn">
          <button class="btn-primary" type="button" @click="scrollToFeatures">
            Lihat Fitur
          </button>
        </div>
      </div>
    </section>

    <!-- FITUR -->
    <section id="features" class="features">
      <h2>Fitur Unggulan Kami</h2>
      <p class="sub">
        Semua yang Anda butuhkan untuk pengalaman olahraga yang lebih baik
      </p>

      <div class="feature-grid">
        <div class="card">
          <div class="icon">👥</div>
          <h3>Cari Lawan</h3>
          <p>Temukan tim lawan sesuai level dan lokasi Anda.</p>
        </div>

        <div class="card">
          <div class="icon">📍</div>
          <h3>Booking Lapangan</h3>
          <p>Pesan lapangan favorit dengan mudah dan cepat.</p>
        </div>

        <div class="card">
          <div class="icon">🏆</div>
          <h3>Kelola Tim</h3>
          <p>Atur anggota, jadwal, dan statistik tim Anda.</p>
        </div>
      </div>
    </section>

    <!-- STAT -->
    <section class="stats">
      <div class="stat">
        <h3>1000+</h3>
        <span>Tim Terdaftar</span>
      </div>
      <div class="stat">
        <h3>5000+</h3>
        <span>Pertandingan</span>
      </div>
      <div class="stat">
        <h3>250+</h3>
        <span>Lapangan</span>
      </div>
      <div class="stat">
        <h3>10+</h3>
        <span>Jenis Olahraga</span>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <h2>Siap Bermain?</h2>
      <p>
        Cari lawan tanding dan booking lapangan sekarang juga.
      </p>
      <button class="btn-primary" type="button" @click="scrollToFeatures">
        Mulai
      </button>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-bottom">
        © 2024 SPORTIVE. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  font-family: "Segoe UI", system-ui, -apple-system, Arial, sans-serif;
  color: #111827;
}

/* NAVBAR */
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 60px;
  background: #ffffff;
  border-bottom: 2px solid #0b1d4d;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-badge {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: #e63946;
  color: white;
  font-size: 16px;
}

.logo {
  font-weight: 900;
  letter-spacing: 0.6px;
  font-size: 20px;
}

.nav-center {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: #374151;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #e63946;
}

.nav-link.router-link-active {
  color: #e63946;
  border-bottom: 2px solid #e63946;
}

.btn-logout {
  border: none;
  background: #111827;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.3s ease;
}

.btn-logout:hover {
  background: #1f2937;
}

/* HERO */
.hero {
  text-align: center;
  padding: 110px 20px;
  background: linear-gradient(180deg, #0b1d4d, #b21f3b);
  color: white;
}

.hero-inner {
  max-width: 920px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 44px;
  line-height: 1.15;
  margin-bottom: 16px;
}

.hero p {
  max-width: 740px;
  margin: 0 auto;
  opacity: 0.92;
  line-height: 1.6;
}

.hero-btn {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary {
  background: #e63946;
  border: none;
  color: white;
  padding: 14px 22px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 800;
}

/* FEATURES */
.features {
  padding: 84px 20px;
  text-align: center;
}

.features h2 {
  font-size: 34px;
}

.sub {
  margin-top: 10px;
  color: #6b7280;
}

.feature-grid {
  max-width: 980px;
  margin: 44px auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card {
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  text-align: left;
}

.card h3 {
  margin-top: 10px;
  margin-bottom: 8px;
}

.card p {
  color: #6b7280;
  line-height: 1.6;
}

.icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(230, 57, 70, 0.12);
  font-size: 22px;
}

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: linear-gradient(90deg, #0b1d4d, #b21f3b);
  color: white;
  padding: 64px 20px;
  text-align: center;
}

.stat h3 {
  font-size: 34px;
  margin-bottom: 6px;
}

.stat span {
  opacity: 0.9;
}

/* CTA */
.cta {
  padding: 84px 20px;
  text-align: center;
}

.cta h2 {
  font-size: 34px;
}

.cta p {
  margin: 12px auto 26px;
  color: #6b7280;
  max-width: 720px;
  line-height: 1.6;
}

/* FOOTER */
.footer {
  background: #0b1d4d;
  color: white;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  text-align: center;
  padding: 16px 20px;
  opacity: 0.9;
  font-size: 14px;
}

/* RESPONSIVE */
@media (max-width: 920px) {
  .navbar {
    padding: 14px 18px;
  }
  .nav-center {
    display: none;
  }
  .hero h1 {
    font-size: 34px;
  }
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
}
</style>
