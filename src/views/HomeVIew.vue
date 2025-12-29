<script setup lang="ts">
import AppNavbar from "../components/AppNavbar.vue";
import { ref } from "vue";

const notifications = ref([
  {
    id: 1,
    title: "Venue Basketball (FINNS)",
    description: "mengajukan pertandingan persahabatan untuk Sabtu, 14 November 2024",
    distance: "2 km dari lokasi",
    time: "2 jam yang lalu",
    status: "pending"
  },
  {
    id: 2,
    title: "Arena Futsal Jakarta Timur",
    description: "membuka slot booking baru untuk Jumat, 15 November 2024",
    distance: "5 km dari lokasi",
    time: "3 jam yang lalu",
    status: "pending"
  },
  {
    id: 3,
    title: "Pioneer Futsal (FINNS)",
    description: "mengajukan pertandingan persahabatan untuk Senin, 12 November 2024",
    distance: "1 km dari lokasi",
    time: "5 jam yang lalu",
    status: "pending"
  },
  {
    id: 4,
    title: "Persahabatan vs Lightning FC (Genting)",
    description: "Hasil: Menang 9-5",
    distance: "2 km dari lokasi",
    time: "1 hari yang lalu",
    status: "completed"
  }
]);

function acceptNotification(id: number) {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.status = "accepted";
    alert(`Permintaan dari "${notification.title}" telah diterima!`);
  }
}

function rejectNotification(id: number) {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.status = "rejected";
    alert(`Permintaan dari "${notification.title}" telah ditolak!`);
  }
}
</script>

<template>
  <div class="page">
    <!-- NAVBAR -->
    <AppNavbar />

    <!-- DASHBOARD CONTENT -->
    <main class="dashboard">
      <div class="dashboard-header">
        <h1>Selamat datang kembali! Berikut update terbaru untuk tim Anda.</h1>
      </div>

      <!-- STATS CARDS -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <h3>Total Pertandingan</h3>
            <div class="stat-main">
              <span class="stat-number">45</span>
              <span class="stat-change positive">+18% bulan ini</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-content">
            <h3>Total Menang</h3>
            <div class="stat-main">
              <span class="stat-number">32</span>
              <span class="stat-change positive">+3,5 dari bulan lalu</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <h3>Anggota Tim</h3>
            <div class="stat-main">
              <span class="stat-number">15</span>
              <span class="stat-change positive">+2 anggota baru</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📅</div>
          <div class="stat-content">
            <h3>Jadwal Mendatang</h3>
            <div class="stat-main">
              <span class="stat-number">3</span>
              <span class="stat-change neutral">dalam 7 hari</span>
            </div>
          </div>
        </div>
      </div>

      <!-- NOTIFICATIONS SECTION -->
      <section class="notifications-section">
        <div class="section-header">
          <h2>Notifikasi</h2>
          <span class="section-subtitle">Update terbaru untuk tim Anda</span>
        </div>

        <div class="notifications-grid">
          <!-- NOTIFICATION CARDS -->
          <div 
            v-for="notif in notifications" 
            :key="notif.id" 
            class="notification-card"
            :class="{ 'completed': notif.status === 'completed' }"
          >
            <div class="notification-header">
              <div class="notification-title">
                <h3>{{ notif.title }}</h3>
                <span class="notification-distance">{{ notif.distance }}</span>
              </div>
              <span class="notification-time">{{ notif.time }}</span>
            </div>
            
            <p class="notification-desc">{{ notif.description }}</p>
            
            <div class="notification-actions" v-if="notif.status === 'pending'">
              <button 
                class="btn-accept" 
                @click="acceptNotification(notif.id)"
              >
                ✓ Terima
              </button>
              <button 
                class="btn-reject" 
                @click="rejectNotification(notif.id)"
              >
                ✗ Tolak
              </button>
            </div>
            
            <div class="notification-completed" v-else-if="notif.status === 'completed'">
              <span class="completed-badge">✓ Selesai</span>
            </div>
            
            <div class="notification-status" v-else>
              <span :class="`status-badge ${notif.status}`">
                {{ notif.status === 'accepted' ? '✓ Diterima' : '✗ Ditolak' }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  font-family: "Segoe UI", system-ui, -apple-system, Arial, sans-serif;
  color: #111827;
  background: #f8fafc;
}

/* DASHBOARD */
.dashboard {
  padding: 40px 60px;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 40px;
}

.dashboard-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
}

/* STATS GRID */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(230, 57, 70, 0.12);
  font-size: 28px;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  font-size: 16px;
  color: #6b7280;
  font-weight: 600;
  margin-bottom: 12px;
}

.stat-main {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: #111827;
}

.stat-change {
  font-size: 14px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

.stat-change.positive {
  background: #dcfce7;
  color: #166534;
}

.stat-change.neutral {
  background: #f3f4f6;
  color: #4b5563;
}

/* NOTIFICATIONS SECTION */
.notifications-section {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
}

.section-header {
  margin-bottom: 32px;
}

.section-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 6px;
}

.section-subtitle {
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
}

.notifications-grid {
  display: grid;
  gap: 20px;
}

/* NOTIFICATION CARD */
.notification-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.notification-card.completed {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 12px;
}

.notification-title {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.notification-title h3 {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.notification-distance {
  background: #e0e7ff;
  color: #3730a3;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.notification-time {
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
}

.notification-desc {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 15px;
}

/* NOTIFICATION ACTIONS */
.notification-actions {
  display: flex;
  gap: 12px;
}

.btn-accept, .btn-reject {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-accept {
  background: #10b981;
  color: white;
}

.btn-accept:hover {
  background: #059669;
  transform: translateY(-1px);
}

.btn-reject {
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.btn-reject:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

/* NOTIFICATION STATUS */
.notification-completed,
.notification-status {
  margin-top: 12px;
}

.completed-badge,
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.completed-badge {
  background: #dcfce7;
  color: #166534;
}

.status-badge.accepted {
  background: #dcfce7;
  color: #166534;
}

.status-badge.rejected {
  background: #fee2e2;
  color: #991b1b;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .dashboard {
    padding: 30px;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 20px;
  }
  
  .dashboard-header h1 {
    font-size: 24px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    flex-direction: column;
    text-align: center;
  }
  
  .stat-main {
    justify-content: center;
  }
  
  .notification-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .notification-actions {
    flex-direction: column;
  }
  
  .btn-accept, .btn-reject {
    width: 100%;
  }
  
  .notification-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>