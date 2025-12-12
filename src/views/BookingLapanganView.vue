<script setup lang="ts">
import AppNavbar from "../components/AppNavbar.vue";
import AppFooter from "../components/AppFooter.vue";
import { ref, computed } from "vue";

const jenis = ref("Semua Olahraga");
const tanggal = ref("");
const jam = ref("");

const fields = ref([
  {
    id: 1,
    name: "Arena Futsal Jakarta",
    sport: "Futsal",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    price: 150000,
    priceUnit: "jam",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=800&q=80",
    facilities: ["AC", "Shower", "Parkir Luas"]
  },
  {
    id: 2,
    name: "Basketball Center Elite",
    sport: "Basketball",
    address: "Jl. Gatot Subroto No. 45, Jakarta Pusat",
    price: 200000,
    priceUnit: "jam",
    image: "https://images.unsplash.com/photo-1546519638-68711109bb64?auto=format&fit=crop&w=800&q=80",
    facilities: ["Indoor", "AC", "Tribun"]
  },
  {
    id: 3,
    name: "Badminton Hall Premium",
    sport: "Badminton",
    address: "Jl. Thamrin No. 67, Jakarta Pusat",
    price: 80000,
    priceUnit: "jam",
    image: "https://images.unsplash.com/photo-1570155167822-9f8a8f2def4b?auto=format&fit=crop&w=800&q=80",
    facilities: ["AC", "Loker", "Kantin"]
  },
  {
    id: 4,
    name: "Volleyball Arena Pro",
    sport: "Volleyball",
    address: "Jl. Rasuna Said No. 89, Jakarta Selatan",
    price: 120000,
    priceUnit: "jam",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    facilities: ["Indoor", "Shower", "Parkir"]
  },
  {
    id: 5,
    name: "Tennis Court Paradise",
    sport: "Tennis",
    address: "Jl. Boulevard No. 12, Jakarta Barat",
    price: 180000,
    priceUnit: "jam",
    image: "https://images.unsplash.com/photo-1554224311-bedf415a62d2?auto=format&fit=crop&w=800&q=80",
    facilities: ["Outdoor", "Lighting", "Café"]
  },
  {
    id: 6,
    name: "Swimming Pool Aquatic",
    sport: "Swimming",
    address: "Jl. Jenderal Sudirman No. 200, Jakarta Pusat",
    price: 100000,
    priceUnit: "jam",
    image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&w=800&q=80",
    facilities: ["AC", "Shower", "Café"]
  }
]);

const filteredFields = computed(() => {
  return fields.value.filter(field => {
    const matchSport = jenis.value === "Semua Olahraga" || field.sport === jenis.value;
    return matchSport;
  });
});

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(price);
}
</script>

<template>
  <div class="wrapper">
    <AppNavbar />

    <main class="container">
      <!-- PAGE HEADER -->
      <div class="header">
        <h1 class="title">Booking Lapangan</h1>
        <p class="subtitle">Pesan lapangan favorit Anda dengan mudah dan cepat</p>

        <!-- FILTER BOX -->
        <div class="filter-box">
          <div class="filter-field">
            <label class="label">Jenis Olahraga</label>
            <select v-model="jenis" class="select">
              <option value="Semua Olahraga">Semua Olahraga</option>
              <option value="Futsal">Futsal</option>
              <option value="Basketball">Basketball</option>
              <option value="Badminton">Badminton</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Tennis">Tennis</option>
              <option value="Swimming">Swimming</option>
            </select>
          </div>

          <div class="filter-field">
            <label class="label">Tanggal</label>
            <div class="date-input-wrapper">
              <span class="input-icon">📅</span>
              <input
                v-model="tanggal"
                type="date"
                class="date-input"
              />
            </div>
          </div>

          <div class="filter-field">
            <label class="label">Jam</label>
            <div class="time-input-wrapper">
              <span class="input-icon">🕐</span>
              <input
                v-model="jam"
                type="time"
                class="time-input"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- FIELDS GRID -->
      <div class="fields-grid">
        <div class="field-card" v-for="field in filteredFields" :key="field.id">
          <!-- IMAGE SECTION -->
          <div class="card-image">
            <img :src="field.image" :alt="field.name" class="image" />
            <div class="sport-tag">{{ field.sport }}</div>
          </div>

          <!-- INFO SECTION -->
          <div class="card-body">
            <h3 class="field-name">{{ field.name }}</h3>

            <div class="field-address">
              <span class="address-icon">📍</span>
              <span class="address-text">{{ field.address }}</span>
            </div>

            <div class="field-price">
              <span class="price-icon">💰</span>
              <span class="price-text">{{ formatPrice(field.price) }}</span>
              <span class="price-unit">/ {{ field.priceUnit }}</span>
            </div>

            <div class="facilities">
              <span class="facility-item" v-for="(facility, index) in field.facilities" :key="index">
                {{ facility }}
              </span>
            </div>

            <button class="btn-book">Pesan Sekarang</button>
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

/* FILTER BOX */
.filter-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background: white;
  padding: 20px;
  border-radius: 12px;
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

.select,
.date-input,
.time-input {
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

.select:hover,
.date-input:hover,
.time-input:hover {
  border-color: #cbd5e1;
}

.select:focus,
.date-input:focus,
.time-input:focus {
  border-color: #e11d48;
  box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
}

.date-input-wrapper,
.time-input-wrapper {
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

.date-input-wrapper:focus-within,
.time-input-wrapper:focus-within {
  border-color: #e11d48;
  box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
}

.input-icon {
  font-size: 14px;
  opacity: 0.6;
  flex-shrink: 0;
}

.date-input,
.time-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  height: 100%;
}

.date-input::-webkit-calendar-picker-indicator,
.time-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0;
}

/* FIELDS GRID */
.fields-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* FIELD CARD */
.field-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.field-card:hover {
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

.field-card:hover .image {
  transform: scale(1.03);
}

.sport-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-block;
  padding: 6px 12px;
  background: #e11d48;
  color: white;
  border-radius: 20px;
  font-weight: 700;
  font-size: 11px;
  text-transform: capitalize;
}

.card-body {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.field-name {
  font-size: 16px;
  font-weight: 900;
  color: #1a202c;
  margin: 0 0 12px 0;
  letter-spacing: -0.3px;
}

.field-address {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #4a5568;
}

.address-icon {
  font-size: 13px;
  flex-shrink: 0;
  margin-top: 2px;
}

.address-text {
  line-height: 1.4;
  flex: 1;
}

.field-price {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 700;
  color: #1a202c;
}

.price-icon {
  font-size: 14px;
}

.price-text {
  color: #e11d48;
}

.price-unit {
  font-size: 12px;
  font-weight: 500;
  color: #718096;
}

.facilities {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
  flex: 1;
}

.facility-item {
  display: inline-block;
  padding: 4px 10px;
  background: #f0f4f8;
  color: #4a5568;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.btn-book {
  width: 100%;
  height: 40px;
  background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(225, 29, 72, 0.15);
}

.btn-book:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(225, 29, 72, 0.2);
}

.btn-book:active {
  transform: translateY(0);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .container {
    padding: 30px 16px;
  }

  .title {
    font-size: 32px;
  }

  .filter-box {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .fields-grid {
    grid-template-columns: 1fr;
    gap: 16px;
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

  .filter-box {
    padding: 16px;
    gap: 10px;
  }

  .select,
  .date-input,
  .time-input,
  .date-input-wrapper,
  .time-input-wrapper {
    height: 36px;
    font-size: 12px;
  }

  .card-image {
    height: 140px;
  }

  .card-body {
    padding: 12px;
  }

  .field-name {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .field-address {
    font-size: 11px;
    margin-bottom: 8px;
  }

  .field-price {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .btn-book {
    height: 36px;
    font-size: 12px;
  }
}
</style>
