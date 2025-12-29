<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// State untuk dropdown riwayat
const showHistoryDropdown = ref(false);
const currentRouteName = ref(route.name?.toString() || "");

function logout() {
  router.push("/login");
}

function navigateToBookingHistory() {
  router.push("/riwayat-booking");
  showHistoryDropdown.value = false;
}

function navigateToMatchHistory() {
  router.push("/riwayat-pertandingan");
  showHistoryDropdown.value = false;
}

function toggleHistoryDropdown() {
  showHistoryDropdown.value = !showHistoryDropdown.value;
}

// Close dropdown when clicking outside
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.history-dropdown')) {
    showHistoryDropdown.value = false;
  }
}

// Update current route ketika route berubah
router.afterEach((to) => {
  currentRouteName.value = to.name?.toString() || "";
});

// Add event listener for click outside
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Fungsi untuk mengecek apakah link aktif
const isActive = (routeName: string) => {
  return route.name === routeName;
};

// Fungsi untuk mengecek apakah path aktif (untuk nested routes)
const isPathActive = (path: string) => {
  return route.path.startsWith(path);
};

// Navigasi ke halaman
function navigateTo(path: string) {
  router.push(path);
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
      <RouterLink 
        to="/" 
        class="nav-link" 
        :class="{ 'active': isActive('home') }"
      >
        Home
      </RouterLink>
      <RouterLink 
        to="/cari-lawan" 
        class="nav-link" 
        :class="{ 'active': isActive('cari-lawan') }"
      >
        Cari Lawan
      </RouterLink>
      <RouterLink 
        to="/booking-lapangan" 
        class="nav-link" 
        :class="{ 'active': isActive('booking-lapangan') }"
      >
        Booking Lapangan
      </RouterLink>
      <RouterLink 
        to="/chat" 
        class="nav-link" 
        :class="{ 'active': isActive('chat') }"
      >
        Chat
      </RouterLink>
      
      <!-- History Dropdown -->
      <div class="history-dropdown">
        <button 
          class="nav-link dropdown-toggle" 
          @click="toggleHistoryDropdown"
          :class="{ 'active': showHistoryDropdown || isPathActive('/riwayat') }"
        >
          Riwayat Pemesanan
          <span class="dropdown-arrow" :class="{ 'rotated': showHistoryDropdown }">▼</span>
        </button>
        
        <div v-if="showHistoryDropdown" class="dropdown-menu">
          <button class="dropdown-item" @click="navigateToBookingHistory">
            <span class="dropdown-icon">📅</span>
            Riwayat Booking
          </button>
          <button class="dropdown-item" @click="navigateToMatchHistory">
            <span class="dropdown-icon">⚽</span>
            Riwayat Pertandingan
          </button>
        </div>
      </div>

      <RouterLink 
        to="/profil" 
        class="nav-link" 
        :class="{ 'active': isActive('profil') }"
      >
        Profil
      </RouterLink>
    </nav>

    <div class="nav-right">
      <button class="btn-logout" type="button" @click="logout">Keluar</button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 60px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.nav-left {
  display: flex;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.brand:hover .logo {
  background: linear-gradient(135deg, #e63946, #be123c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-badge {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
  color: white;
  font-size: 18px;
  transition: transform 0.3s ease;
}

.brand:hover .brand-badge {
  transform: rotate(15deg) scale(1.1);
}

.logo {
  font-weight: 900;
  letter-spacing: 0.8px;
  font-size: 20px;
  background: linear-gradient(135deg, #1a202c, #4a5568);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
}

.nav-center {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  color: #4b5563;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  font-family: inherit;
  position: relative;
}

.nav-link:hover {
  color: #e63946;
}

.nav-link.active,
.nav-link.router-link-active {
  color: #e63946;
  border-bottom: 2px solid #e63946;
}

/* HISTORY DROPDOWN */
.history-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  position: relative;
  padding-right: 20px;
}

.dropdown-arrow {
  font-size: 10px;
  margin-left: 4px;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  z-index: 100;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  margin-top: 8px;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.dropdown-item:hover {
  background: #f8fafc;
  color: #e63946;
}

.dropdown-item:hover .dropdown-icon {
  transform: scale(1.2);
}

.dropdown-icon {
  font-size: 16px;
  width: 20px;
  display: inline-flex;
  justify-content: center;
  transition: transform 0.2s ease;
}

.nav-right {
  display: flex;
  align-items: center;
}

.btn-logout {
  border: none;
  background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(225, 29, 72, 0.2);
}

.btn-logout:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);
}

.btn-logout:active {
  transform: translateY(0);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .navbar {
    padding: 16px 30px;
  }
  
  .nav-center {
    gap: 24px;
  }
  
  .nav-link {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 16px 20px;
    gap: 16px;
  }
  
  .nav-center {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
  
  .nav-link {
    font-size: 13px;
    padding: 6px 12px;
  }
  
  .dropdown-menu {
    position: fixed;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    min-width: 200px;
    max-width: 90vw;
  }
  
  .nav-right {
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 12px 16px;
  }
  
  .brand {
    gap: 8px;
  }
  
  .brand-badge {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
  
  .logo {
    font-size: 16px;
  }
  
  .nav-center {
    gap: 12px;
  }
  
  .nav-link {
    font-size: 12px;
    padding: 4px 8px;
  }
  
  .btn-logout {
    padding: 8px 16px;
    font-size: 12px;
  }
}

/* Animation untuk brand */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.brand:active .brand-badge {
  animation: pulse 0.3s ease;
}
</style>