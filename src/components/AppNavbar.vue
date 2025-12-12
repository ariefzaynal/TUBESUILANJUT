<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
  router.push("/login");
}
</script>

<template>
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
</nav>    <div class="nav-right">
      <button class="btn-logout" type="button" @click="logout">Keluar</button>
    </div>
  </header>
</template>

<style scoped>
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
  gap: 12px;
}

.brand-badge {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: #e63946;
  color: white;
  font-size: 20px;
}

.logo {
  font-weight: 900;
  letter-spacing: 0.8px;
  font-size: 20px;
  color: #111827;
}

.nav-center {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: #4b5563;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  border-radius: 0;
  transition: all 0.2s ease;
  font-size: 14px;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: #111827;
}

.nav-link.active,
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
  font-size: 13px;
  transition: all 0.2s ease;
}

.btn-logout:hover {
  background: #1f2937;
}

@media (max-width: 920px) {
  .navbar {
    padding: 14px 18px;
  }

  .nav-center {
    display: none;
  }
}
</style>
