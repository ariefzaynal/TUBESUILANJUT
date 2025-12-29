<script setup lang="ts">
import AppNavbar from "../components/AppNavbar.vue";
import AppFooter from "../components/AppFooter.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const jenis = ref("Semua Olahraga");
const lokasi = ref("");

// Popup state
const showPopup = ref(false);
const selectedTeam = ref<{id: number, name: string, sport: string, area: string, wins: number, matches: number, rating: number, image: string} | null>(null);

const teams = ref([
  {
    id: 1,
    name: "FC Thunder",
    sport: "Futsal",
    area: "Jakarta Selatan",
    wins: 32,
    matches: 45,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80",
    isOnline: true
  },
  {
    id: 2,
    name: "Warriors Basketball",
    sport: "Basketball",
    area: "Jakarta Pusat",
    wins: 28,
    matches: 38,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80",
    isOnline: true
  },
  {
    id: 3,
    name: "Badminton Stars",
    sport: "Badminton",
    area: "Jakarta Utara",
    wins: 35,
    matches: 52,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80",
    isOnline: false
  },
  {
    id: 4,
    name: "Volleyball Kings",
    sport: "Volleyball",
    area: "Jakarta Barat",
    wins: 30,
    matches: 41,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1611274588884-681acc8be2f2?auto=format&fit=crop&w=800&q=80",
    isOnline: true
  },
  {
    id: 5,
    name: "Lightning FC",
    sport: "Futsal",
    area: "Jakarta Timur",
    wins: 24,
    matches: 36,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80",
    isOnline: false
  },
  {
    id: 6,
    name: "Phoenix Hoops",
    sport: "Basketball",
    area: "Jakarta Selatan",
    wins: 22,
    matches: 29,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80",
    isOnline: true
  }
]);

const filteredTeams = computed(() => {
  return teams.value.filter(team => {
    const matchSport = jenis.value === "Semua Olahraga" || team.sport === jenis.value;
    const matchLocation = lokasi.value.trim() === "" || team.area.toLowerCase().includes(lokasi.value.toLowerCase());
    return matchSport && matchLocation;
  });
});

// Function to open popup
function openChallengePopup(team: any) {
  selectedTeam.value = team;
  showPopup.value = true;
}

// Function to close popup
function closePopup() {
  showPopup.value = false;
  selectedTeam.value = null;
}

// Function to send challenge
function sendChallenge(challengeData: any) {
  console.log('Mengirim tantangan ke:', selectedTeam.value?.name);
  console.log('Data tantangan:', challengeData);
  
  // Tampilkan notifikasi sukses
  alert(`Tantangan berhasil dikirim ke ${selectedTeam.value?.name}!`);
  
  // Tutup popup
  closePopup();
}

// Function to open chat with team
function openChat(team: any) {
  // Simpan data tim ke localStorage untuk dibaca di ChatView
  const newChatData = {
    id: Date.now(), // ID unik berdasarkan timestamp
    name: team.name,
    status: team.isOnline ? "Online" : "Offline",
    lastMessage: "Halo! Mari kita diskusikan jadwal pertandingan",
    lastMessageTime: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    lastSenderId: 2, // ID lawan
    unread: 0,
    image: team.image,
    participants: [1, team.id + 10], // currentUserId = 1, team.id + offset untuk menghindari konflik
    isOnline: team.isOnline,
    lastSeen: team.isOnline ? "Just now" : "2 hours ago",
    sport: team.sport,
    area: team.area,
    wins: team.wins,
    matches: team.matches,
    rating: team.rating
  };
  
  // Simpan ke localStorage untuk dibaca di ChatView
  localStorage.setItem('newChat', JSON.stringify(newChatData));
  
  // Navigasi ke halaman chat
  router.push('/chat');
}

// Format rating dengan 1 desimal
function formatRating(rating: number): string {
  return rating.toFixed(1);
}

// Format persentase kemenangan
function calculateWinPercentage(wins: number, matches: number): string {
  if (matches === 0) return "0%";
  const percentage = (wins / matches) * 100;
  return percentage.toFixed(0) + "%";
}
</script>

<template>
  <div class="wrapper">
    <AppNavbar />

    <main class="container">
      <!-- PAGE HEADER -->
      <div class="header">
        <h1 class="title">Cari Lawan</h1>
        <p class="subtitle">Temukan tim lawan yang sesuai dengan level dan lokasi Anda</p>

        <!-- SEARCH FILTER -->
        <div class="search-filter">
          <div class="filter-field">
            <label class="label">Jenis Olahraga</label>
            <select v-model="jenis" class="select">
              <option value="Semua Olahraga">Semua Olahraga</option>
              <option value="Futsal">Futsal</option>
              <option value="Basketball">Basketball</option>
              <option value="Badminton">Badminton</option>
              <option value="Volleyball">Volleyball</option>
            </select>
          </div>

          <div class="filter-field">
            <label class="label">Lokasi</label>
            <div class="search-input-wrapper">
              <span class="search-icon">🔍</span>
              <input
                v-model="lokasi"
                type="text"
                class="search-input"
                placeholder="Cari lokasi (Jakarta, Bandung, Surabaya...)"
              />
            </div>
          </div>

          <button class="btn-search" @click="filteredTeams">
            <span class="btn-icon">🔍</span>
            Cari Lawan
          </button>
        </div>

        <div class="search-info">
          <span class="info-text">Menampilkan {{ filteredTeams.length }} tim</span>
          <div class="online-indicator">
            <span class="dot online"></span>
            <span class="indicator-text">Online</span>
            <span class="dot offline"></span>
            <span class="indicator-text">Offline</span>
          </div>
        </div>
      </div>

      <!-- TEAMS GRID -->
      <div class="teams-grid">
        <div class="team-card" v-for="team in filteredTeams" :key="team.id">
          <!-- IMAGE SECTION -->
          <div class="card-image">
            <img :src="team.image" :alt="team.name" class="image" />
            <div class="rating">
              <span class="star">⭐</span>
              <span class="rating-value">{{ formatRating(team.rating) }}</span>
            </div>
            <div class="online-status" :class="{ online: team.isOnline }">
              {{ team.isOnline ? 'Online' : 'Offline' }}
            </div>
          </div>

          <!-- INFO SECTION -->
          <div class="card-body">
            <h3 class="team-title">{{ team.name }}</h3>

            <div class="team-badges">
              <span class="sport-badge">{{ team.sport }}</span>
              <span class="separator">•</span>
              <span class="location">📍 {{ team.area }}</span>
            </div>

            <div class="team-stats">
              <div class="stat">
                <span class="stat-icon">🏆</span>
                <span class="stat-value">{{ team.wins }} Menang</span>
              </div>
              <div class="stat">
                <span class="stat-icon">📊</span>
                <span class="stat-value">{{ calculateWinPercentage(team.wins, team.matches) }} Win Rate</span>
              </div>
              <div class="stat">
                <span class="stat-icon">⚽</span>
                <span class="stat-value">{{ team.matches }} Pertandingan</span>
              </div>
            </div>

            <div class="card-actions">
              <button class="btn btn-primary" @click="openChallengePopup(team)">
                🏆 Tantang
              </button>
              <button class="btn btn-secondary" @click="openChat(team)">
                <span>💬</span>
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-if="filteredTeams.length === 0" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">Tim tidak ditemukan</h3>
        <p class="empty-description">Coba ubah filter pencarian untuk menemukan tim yang sesuai</p>
        <button class="btn-reset" @click="() => { jenis = 'Semua Olahraga'; lokasi = ''; }">
          Reset Filter
        </button>
      </div>
    </main>

    <AppFooter />

    <!-- CHALLENGE POPUP -->
    <div v-if="showPopup" class="challenge-popup-overlay" @click.self="closePopup">
      <div class="challenge-popup">
        <!-- HEADER -->
        <div class="popup-header">
          <h2 class="popup-title">Kirim Tantangan?</h2>
          <button class="close-btn" @click="closePopup">×</button>
        </div>

        <!-- CONTENT -->
        <div class="popup-content">
          <div class="popup-team-info">
            <img :src="selectedTeam?.image" :alt="selectedTeam?.name" class="popup-team-image" />
            <div class="popup-team-details">
              <h3 class="popup-team-name">{{ selectedTeam?.name }}</h3>
              <div class="popup-team-stats">
                <span class="popup-sport">{{ selectedTeam?.sport }}</span>
                <span class="popup-location">📍 {{ selectedTeam?.area }}</span>
              </div>
              <div class="popup-rating">
                ⭐ {{ formatRating(selectedTeam?.rating || 0) }} • {{ selectedTeam?.wins }}W - {{ (selectedTeam?.matches || 0) - (selectedTeam?.wins || 0) }}L
              </div>
            </div>
          </div>

          <p class="popup-text">
            Anda akan mengirim tantangan pertandingan ke tim ini. Mereka akan menerima notifikasi dan dapat membalas melalui chat.
          </p>

          <!-- FORM TANTANGAN -->
          <div class="challenge-form">
            <div class="form-group">
              <label class="form-label">Tipe Pertandingan</label>
              <select class="form-select">
                <option value="friendly">Pertandingan Persahabatan</option>
                <option value="tournament">Turnamen</option>
                <option value="league">Liga</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Catatan (Opsional)</label>
              <textarea 
                class="form-textarea" 
                placeholder="Tulis pesan atau syarat khusus..."
                rows="3"
              ></textarea>
            </div>
          </div>

          <!-- ACTIONS -->
          <div class="popup-actions">
            <button class="btn-cancel" @click="closePopup">
              Batal
            </button>
            <button class="btn-send" @click="sendChallenge({})">
              Kirim Tantangan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: #f5f7fa;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* HEADER */
.header {
  margin-bottom: 40px;
}

.title {
  font-size: 42px;
  font-weight: 900;
  color: #1a202c;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 14px;
  color: #718096;
  margin: 0 0 28px 0;
  line-height: 1.5;
}

/* SEARCH FILTER */
.search-filter {
  display: grid;
  grid-template-columns: 1fr 1.5fr auto;
  gap: 16px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  align-items: flex-end;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 12px;
  font-weight: 700;
  color: #2d3748;
  text-transform: capitalize;
  letter-spacing: 0.3px;
}

.select {
  height: 40px;
  padding: 0 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  font-size: 13px;
  color: #4a5568;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  font-weight: 500;
}

.select:hover {
  border-color: #cbd5e1;
}

.select:focus {
  border-color: #e11d48;
  box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  transition: all 0.2s ease;
}

.search-input-wrapper:focus-within {
  border-color: #e11d48;
  box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
}

.search-icon {
  font-size: 14px;
  opacity: 0.6;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  color: #4a5568;
}

.search-input::placeholder {
  color: #a0aec0;
}

.btn-search {
  height: 40px;
  padding: 0 20px;
  background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(225, 29, 72, 0.2);
}

.btn-search:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);
}

.btn-search:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 14px;
}

/* SEARCH INFO */
.search-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 0 8px;
}

.info-text {
  font-size: 13px;
  color: #718096;
  font-weight: 500;
}

.online-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.dot.online {
  background-color: #10b981;
}

.dot.offline {
  background-color: #9ca3af;
}

.indicator-text {
  font-size: 12px;
  color: #6b7280;
  margin-right: 8px;
}

/* TEAMS GRID */
.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

/* TEAM CARD */
.team-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.team-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.card-image {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #0b1d4d, #b21f3b);
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.team-card:hover .image {
  transform: scale(1.05);
}

.rating {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  font-weight: 800;
  font-size: 13px;
  color: #1a202c;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
}

.star {
  font-size: 14px;
  color: #fbbf24;
}

.rating-value {
  line-height: 1;
}

.online-status {
  position: absolute;
  bottom: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.online-status.online {
  background: rgba(16, 185, 129, 0.9);
}

.online-status:not(.online) {
  background: rgba(156, 163, 175, 0.9);
}

.card-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.team-title {
  font-size: 18px;
  font-weight: 900;
  color: #1a202c;
  margin: 0 0 12px 0;
  letter-spacing: -0.3px;
}

.team-badges {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 13px;
}

.sport-badge {
  display: inline-block;
  padding: 4px 10px;
  background: #fee2e2;
  color: #be123c;
  border-radius: 12px;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.separator {
  color: #cbd5e1;
  opacity: 0.5;
}

.location {
  color: #718096;
  font-weight: 500;
}

.team-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;
  padding: 16px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  font-size: 13px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4a5568;
  font-weight: 600;
}

.stat-icon {
  font-size: 14px;
  width: 20px;
  text-align: center;
}

.stat-value {
  line-height: 1;
  flex: 1;
}

.card-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 16px;
}

.btn {
  flex: 1;
  height: 40px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn-primary {
  background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(225, 29, 72, 0.15);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(225, 29, 72, 0.25);
}

.btn-secondary {
  background: white;
  color: #e11d48;
  border: 2px solid #e11d48;
}

.btn-secondary:hover {
  background: #fff5f7;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(225, 29, 72, 0.1);
}

/* EMPTY STATE */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  margin-top: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 12px 0;
}

.empty-description {
  font-size: 16px;
  color: #718096;
  margin: 0 0 24px 0;
  max-width: 400px;
  margin: 0 auto 24px;
}

.btn-reset {
  padding: 12px 24px;
  background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-reset:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(225, 29, 72, 0.25);
}

/* CHALLENGE POPUP STYLES */
.challenge-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.challenge-popup {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: slide-up 0.3s ease;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* POPUP HEADER */
.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.popup-title {
  font-size: 22px;
  font-weight: 900;
  color: #1f2937;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

/* POPUP CONTENT */
.popup-content {
  padding: 24px;
}

/* TEAM INFO IN POPUP */
.popup-team-info {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
}

.popup-team-image {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.popup-team-details {
  flex: 1;
}

.popup-team-name {
  font-size: 18px;
  font-weight: 900;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.popup-team-stats {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
}

.popup-sport {
  padding: 4px 10px;
  background: #fee2e2;
  color: #be123c;
  border-radius: 12px;
  font-weight: 700;
  font-size: 12px;
}

.popup-location {
  color: #6b7280;
  font-weight: 500;
}

.popup-rating {
  font-size: 13px;
  color: #6b7280;
  font-weight: 600;
}

.popup-text {
  font-size: 15px;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 24px;
}

/* CHALLENGE FORM */
.challenge-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

.form-select {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.form-select:focus {
  outline: none;
  border-color: #e11d48;
  box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
}

.form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;
}

.form-textarea:focus {
  outline: none;
  border-color: #e11d48;
  box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
}

/* POPUP ACTIONS */
.popup-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

.btn-cancel,
.btn-send {
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-cancel {
  background: #f3f4f6;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.btn-cancel:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-send {
  background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(225, 29, 72, 0.3);
}

.btn-send:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(225, 29, 72, 0.4);
}

.btn-send:active {
  transform: translateY(0);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .teams-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 900px) {
  .container {
    padding: 30px 16px;
  }

  .title {
    font-size: 32px;
  }

  .search-filter {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .btn-search {
    width: 100%;
  }

  .teams-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .team-stats {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
  }

  .stat {
    flex: 1;
    min-width: 120px;
  }

  .challenge-popup {
    max-width: 400px;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 24px 12px;
  }

  .title {
    font-size: 28px;
  }

  .subtitle {
    font-size: 13px;
    margin-bottom: 20px;
  }

  .search-filter {
    padding: 16px;
    gap: 10px;
  }

  .select,
  .search-input-wrapper,
  .btn-search {
    height: 36px;
    font-size: 12px;
  }

  .search-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .card-image {
    height: 160px;
  }

  .card-body {
    padding: 16px;
  }

  .team-title {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .team-stats {
    flex-direction: column;
    gap: 8px;
  }

  .stat {
    flex: none;
  }

  .card-actions {
    gap: 8px;
  }

  .btn {
    height: 36px;
    font-size: 12px;
  }

  .challenge-popup {
    max-width: 320px;
  }

  .popup-header {
    padding: 20px 20px 12px;
  }

  .popup-title {
    font-size: 18px;
  }

  .popup-content {
    padding: 20px;
  }

  .popup-team-info {
    flex-direction: column;
    text-align: center;
  }

  .popup-team-image {
    width: 80px;
    height: 80px;
  }

  .popup-team-stats {
    justify-content: center;
  }

  .popup-text {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .popup-actions {
    flex-direction: column;
    margin-top: 24px;
  }

  .btn-cancel,
  .btn-send {
    height: 44px;
    font-size: 14px;
  }
}
</style>