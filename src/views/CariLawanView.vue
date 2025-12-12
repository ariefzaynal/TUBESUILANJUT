<script setup lang="ts">
import AppNavbar from "../components/AppNavbar.vue";
import AppFooter from "../components/AppFooter.vue";
import { ref, computed } from "vue";

const jenis = ref("Semua Olahraga");
const lokasi = ref("");

const teams = ref([
  {
    id: 1,
    name: "FC Thunder",
    sport: "Futsal",
    area: "Jakarta Selatan",
    wins: 32,
    matches: 45,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Warriors Basketball",
    sport: "Basketball",
    area: "Jakarta Pusat",
    wins: 28,
    matches: 38,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Badminton Stars",
    sport: "Badminton",
    area: "Jakarta Utara",
    wins: 35,
    matches: 52,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Volleyball Kings",
    sport: "Volleyball",
    area: "Jakarta Barat",
    wins: 30,
    matches: 41,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1611274588884-681acc8be2f2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Lightning FC",
    sport: "Futsal",
    area: "Jakarta Timur",
    wins: 24,
    matches: 36,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Phoenix Hoops",
    sport: "Basketball",
    area: "Jakarta Selatan",
    wins: 22,
    matches: 29,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80"
  }
]);

const filteredTeams = computed(() => {
  return teams.value.filter(team => {
    const matchSport = jenis.value === "Semua Olahraga" || team.sport === jenis.value;
    const matchLocation = lokasi.value.trim() === "" || team.area.toLowerCase().includes(lokasi.value.toLowerCase());
    return matchSport && matchLocation;
  });
});
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
                placeholder="Cari lokasi..."
              />
            </div>
          </div>

          <button class="btn-search">
            <span class="btn-icon">🔍</span>
            Cari Lawan
          </button>
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
              <span class="rating-value">{{ team.rating }}</span>
            </div>
          </div>

          <!-- INFO SECTION -->
          <div class="card-body">
            <h3 class="team-title">{{ team.name }}</h3>

            <div class="team-badges">
              <span class="sport-badge">{{ team.sport }}</span>
              <span class="separator">•</span>
              <span class="location">{{ team.area }}</span>
            </div>

            <div class="team-stats">
              <div class="stat">
                <span class="stat-icon">🏆</span>
                <span class="stat-value">{{ team.wins }} Menang</span>
              </div>
              <div class="stat">
                <span class="stat-icon">⚽</span>
                <span class="stat-value">{{ team.matches }} Pertandingan</span>
              </div>
            </div>

            <div class="card-actions">
              <button class="btn btn-primary">Tantang</button>
              <button class="btn btn-secondary">
                <span>💬</span>
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
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

/* TEAMS GRID */
.teams-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-image {
  position: relative;
  height: 180px;
  background: #edf2f7;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.team-card:hover .image {
  transform: scale(1.03);
}

.rating {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: white;
  border-radius: 20px;
  font-weight: 800;
  font-size: 12px;
  color: #1a202c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.star {
  font-size: 13px;
}

.rating-value {
  line-height: 1;
}

.card-body {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.team-title {
  font-size: 16px;
  font-weight: 900;
  color: #1a202c;
  margin: 0 0 10px 0;
  letter-spacing: -0.3px;
}

.team-badges {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 12px;
}

.sport-badge {
  display: inline-block;
  padding: 4px 8px;
  background: #fee2e2;
  color: #be123c;
  border-radius: 12px;
  font-weight: 700;
  font-size: 11px;
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
  gap: 0;
  margin: 10px 0;
  padding: 10px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  font-size: 12px;
  flex: 0 0 auto;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #4a5568;
  font-weight: 600;
  flex: 1;
}

.stat-icon {
  font-size: 13px;
}

.stat-value {
  line-height: 1;
}

.card-actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  flex-shrink: 0;
}

.btn {
  flex: 1;
  height: 36px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.btn-primary {
  background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(225, 29, 72, 0.15);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(225, 29, 72, 0.2);
}

.btn-secondary {
  background: white;
  color: #e11d48;
  border: 1.5px solid #e11d48;
}

.btn-secondary:hover {
  background: #fff5f7;
  transform: translateY(-1px);
}

/* RESPONSIVE */
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
    flex-direction: column;
    gap: 6px;
    padding: 8px 0;
  }

  .stat {
    flex: none;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 24px 12px;
  }

  .title {
    font-size: 26px;
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

  .card-image {
    height: 140px;
  }

  .card-body {
    padding: 12px;
  }

  .team-title {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .card-actions {
    gap: 8px;
  }

  .btn {
    height: 32px;
    font-size: 11px;
  }
}
</style>
