<script setup lang="ts">
import AppNavbar from "../components/AppNavbar.vue";
import AppFooter from "../components/AppFooter.vue";
import { ref, computed, watch } from "vue";

const jenis = ref("Semua Olahraga");
const tanggal = ref("");
const jam = ref("");

// State untuk popup
const showPopup = ref(false);
const selectedField = ref<any>(null);
const isBookingSuccess = ref(false);

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

// Fungsi untuk membuka popup booking
function openBookingPopup(field: any) {
  // Cek apakah tanggal dan jam sudah diisi
  if (!tanggal.value || !jam.value) {
    alert("Harap pilih tanggal dan jam booking terlebih dahulu!");
    return;
  }
  
  selectedField.value = field;
  showPopup.value = true;
  isBookingSuccess.value = false;
}

// Fungsi untuk konfirmasi booking
function confirmBooking() {
  if (!tanggal.value || !jam.value) {
    alert("Tanggal dan jam booking harus diisi!");
    return;
  }
  
  // Simulasi proses booking
  setTimeout(() => {
    isBookingSuccess.value = true;
    
    // Auto close popup setelah 3 detik
    setTimeout(() => {
      closePopup();
      // Reset form
      tanggal.value = "";
      jam.value = "";
    }, 3000);
  }, 1500);
}

// Fungsi untuk menutup popup
function closePopup() {
  showPopup.value = false;
  selectedField.value = null;
  isBookingSuccess.value = false;
}

// Format tanggal untuk tampilan
function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
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
                :min="new Date().toISOString().split('T')[0]"
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

            <button class="btn-book" @click="openBookingPopup(field)">
              Pesan Sekarang
            </button>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />

    <!-- POPUP BOOKING -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-container">
        <div class="popup-header">
          <h2 class="popup-title">Konfirmasi Booking</h2>
          <button class="popup-close" @click="closePopup">×</button>
        </div>
        
        <div class="popup-content">
          <!-- Status Loading/Success -->
          <div v-if="!isBookingSuccess" class="booking-status">
            <div class="status-icon loading">⏳</div>
            <p class="status-text">Memproses booking...</p>
          </div>
          
          <div v-else class="booking-status success">
            <div class="status-icon">✅</div>
            <p class="status-text">Booking berhasil!</p>
          </div>

          <!-- Detail Lapangan -->
          <div v-if="selectedField" class="field-details">
            <div class="detail-header">
              <h3 class="detail-title">{{ selectedField.name }}</h3>
              <div class="sport-badge">{{ selectedField.sport }}</div>
            </div>
            
            <div class="detail-info">
              <div class="info-row">
                <span class="info-label">📍</span>
                <span class="info-text">{{ selectedField.address }}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">📅</span>
                <span class="info-text">{{ formatDate(tanggal) }}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">🕐</span>
                <span class="info-text">{{ jam }} WIB</span>
              </div>
            </div>

            <!-- Fasilitas -->
            <div class="facilities-section">
              <h4 class="facilities-title">Fasilitas:</h4>
              <div class="facilities-list">
                <span class="facility-badge" v-for="(facility, index) in selectedField.facilities" :key="index">
                  {{ facility }}
                </span>
              </div>
            </div>

            <!-- Harga -->
            <div class="price-section">
              <div class="price-row">
                <span class="price-label">Harga:</span>
                <span class="price-value">{{ formatPrice(selectedField.price) }} / {{ selectedField.priceUnit }}</span>
              </div>
              <div class="total-price">
                <span class="total-label">Total Pembayaran:</span>
                <span class="total-value">{{ formatPrice(selectedField.price) }}</span>
              </div>
            </div>
          </div>

          <!-- Tombol Aksi -->
          <div v-if="!isBookingSuccess" class="popup-actions">
            <button class="btn-cancel" @click="closePopup">Batal</button>
            <button class="btn-confirm" @click="confirmBooking">
              Konfirmasi Booking
            </button>
          </div>
          
          <div v-else class="popup-actions">
            <button class="btn-close-success" @click="closePopup">
              Tutup
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
  position: relative;
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

/* POPUP STYLES */
.popup-overlay {
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
  animation: fadeIn 0.3s ease;
}

.popup-container {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.popup-title {
  font-size: 20px;
  font-weight: 900;
  color: #1a202c;
  margin: 0;
}

.popup-close {
  background: none;
  border: none;
  font-size: 28px;
  color: #718096;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.popup-close:hover {
  background: #f7fafc;
  color: #e11d48;
}

.popup-content {
  padding: 24px;
}

.booking-status {
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: #f7fafc;
  border-radius: 12px;
}

.booking-status.success {
  background: #f0fff4;
  border: 1px solid #9ae6b4;
}

.status-icon {
  font-size: 48px;
  margin-bottom: 12px;
  animation: pulse 1.5s infinite;
}

.status-icon.loading {
  animation: spin 1s linear infinite;
}

.status-text {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.booking-status.success .status-text {
  color: #276749;
}

.field-details {
  margin-bottom: 24px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.detail-title {
  font-size: 18px;
  font-weight: 900;
  color: #1a202c;
  margin: 0;
  flex: 1;
}

.sport-badge {
  background: #e11d48;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.info-label {
  font-size: 16px;
  opacity: 0.8;
  flex-shrink: 0;
  margin-top: 2px;
}

.info-text {
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
}

.facilities-section {
  margin-bottom: 24px;
}

.facilities-title {
  font-size: 14px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 12px 0;
}

.facilities-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.facility-badge {
  display: inline-block;
  padding: 6px 12px;
  background: #edf2f7;
  color: #4a5568;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.price-section {
  background: #f7fafc;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.price-label {
  font-size: 14px;
  color: #4a5568;
}

.price-value {
  font-size: 14px;
  font-weight: 700;
  color: #1a202c;
}

.total-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
}

.total-label {
  font-size: 16px;
  font-weight: 900;
  color: #1a202c;
}

.total-value {
  font-size: 20px;
  font-weight: 900;
  color: #e11d48;
}

.popup-actions {
  display: flex;
  gap: 12px;
}

.btn-cancel {
  flex: 1;
  height: 48px;
  background: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #edf2f7;
  border-color: #cbd5e1;
}

.btn-confirm {
  flex: 1;
  height: 48px;
  background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(225, 29, 72, 0.15);
}

.btn-confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(225, 29, 72, 0.2);
}

.btn-confirm:active {
  transform: translateY(0);
}

.btn-close-success {
  width: 100%;
  height: 48px;
  background: linear-gradient(135deg, #38a169 0%, #276749 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-close-success:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(56, 161, 105, 0.2);
}

/* ANIMATIONS */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
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
  
  .popup-container {
    max-width: 100%;
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
  
  .popup-header {
    padding: 16px 20px;
  }
  
  .popup-content {
    padding: 20px;
  }
  
  .popup-actions {
    flex-direction: column;
  }
  
  .btn-cancel,
  .btn-confirm,
  .btn-close-success {
    width: 100%;
  }
}
</style>