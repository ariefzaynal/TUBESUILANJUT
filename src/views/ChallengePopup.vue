<template>
  <Transition name="fade">
    <div v-if="show" class="challenge-popup-overlay" @click.self="closePopup">
      <div class="challenge-popup">
        <!-- HEADER -->
        <div class="popup-header">
          <h2 class="popup-title">Kirim Tantangan?</h2>
          <button class="close-btn" @click="closePopup">×</button>
        </div>

        <!-- CONTENT -->
        <div class="popup-content">
          <p class="popup-text">
            Anda akan mengirim tantangan pertandingan ke 
            <span class="team-name">{{ teamName }}</span>
          </p>

          <!-- FORM INPUTS -->
          <div class="form-inputs">
            <div class="input-group">
              <label for="matchDate">Tanggal Pertandingan</label>
              <div class="input-wrapper">
                <span class="input-icon">📅</span>
                <input 
                  v-model="matchDate"
                  type="date" 
                  id="matchDate"
                  class="form-input"
                  :min="minDate"
                />
              </div>
            </div>

            <div class="input-group">
              <label for="matchTime">Waktu</label>
              <div class="input-wrapper">
                <span class="input-icon">⏰</span>
                <input 
                  v-model="matchTime"
                  type="time" 
                  id="matchTime"
                  class="form-input"
                />
              </div>
            </div>

            <div class="input-group">
              <label for="venue">Lokasi</label>
              <div class="input-wrapper">
                <span class="input-icon">📍</span>
                <input 
                  v-model="venue"
                  type="text" 
                  id="venue"
                  class="form-input"
                  placeholder="Masukkan nama lapangan/venue"
                />
              </div>
            </div>
          </div>


          <!-- ACTIONS -->
          <div class="popup-actions">
            <button class="btn-cancel" @click="closePopup">
              Batal
            </button>
            <button class="btn-send" @click="sendChallenge">
              Kirim Tantangan
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const props = defineProps<{
  show: boolean;
  teamName: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'send', data: {
    matchDate: string;
    matchTime: string;
    venue: string;
    yourScore: number;
    opponentScore: number;
  }): void;
}>();

const matchDate = ref('');
const matchTime = ref('');
const venue = ref('');
const yourScore = ref(0);
const opponentScore = ref(0);

// Set minimum date to today
const minDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
});

// Set default time to next hour
onMounted(() => {
  const nextHour = new Date();
  nextHour.setHours(nextHour.getHours() + 1);
  const hours = String(nextHour.getHours()).padStart(2, '0');
  const minutes = '00';
  matchTime.value = `${hours}:${minutes}`;
});

function closePopup() {
  resetForm();
  emit('close');
}

function sendChallenge() {
  if (!matchDate.value || !matchTime.value || !venue.value) {
    alert('Harap isi semua data pertandingan!');
    return;
  }

  const challengeData = {
    matchDate: matchDate.value,
    matchTime: matchTime.value,
    venue: venue.value,
    yourScore: yourScore.value,
    opponentScore: opponentScore.value,
  };

  emit('send', challengeData);
  resetForm();
}

function resetForm() {
  matchDate.value = '';
  matchTime.value = '';
  venue.value = '';
  yourScore.value = 0;
  opponentScore.value = 0;
}
</script>

<style scoped>
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
}

.challenge-popup {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* HEADER */
.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.popup-title {
  font-size: 24px;
  font-weight: 800;
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
  width: 32px;
  height: 32px;
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

/* CONTENT */
.popup-content {
  padding: 24px;
}

.popup-text {
  font-size: 16px;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 24px;
  text-align: center;
}

.team-name {
  font-weight: 700;
  color: #e63946;
  background: linear-gradient(135deg, #e63946, #be123c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* FORM INPUTS */
.form-inputs {
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: white;
}

.input-wrapper:focus-within {
  border-color: #e63946;
  box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.1);
}

.input-icon {
  font-size: 20px;
  color: #9ca3af;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  color: #111827;
  background: transparent;
  padding: 0;
}

.form-input::placeholder {
  color: #9ca3af;
}

/* Date and time inputs specific styling */
input[type="date"],
input[type="time"] {
  font-family: inherit;
}

input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  filter: invert(0.5);
}

/* SCORE PREDICTION */
.score-prediction {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #e5e7eb;
}

.score-title {
  font-size: 16px;
  font-weight: 700;
  color: #374151;
  margin: 0 0 16px 0;
  text-align: center;
}

.score-inputs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.score-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.score-input label {
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
}

.score-input-field {
  width: 100%;
  max-width: 120px;
  height: 60px;
  border: 3px solid #e5e7eb;
  border-radius: 12px;
  text-align: center;
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  outline: none;
  transition: all 0.3s ease;
  padding: 0;
}

.score-input-field:focus {
  border-color: #e63946;
  box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.1);
}

.vs-separator {
  font-size: 18px;
  font-weight: 900;
  color: #9ca3af;
  padding: 0 10px;
}

/* ACTIONS */
.popup-actions {
  display: flex;
  gap: 12px;
}

.btn-cancel,
.btn-send {
  flex: 1;
  height: 50px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
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
  background: linear-gradient(135deg, #e63946 0%, #be123c 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(230, 57, 70, 0.3);
}

.btn-send:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(230, 57, 70, 0.4);
}

.btn-send:active {
  transform: translateY(0);
}

/* RESPONSIVE */
@media (max-width: 640px) {
  .challenge-popup {
    max-width: 100%;
    margin: 0 16px;
  }

  .popup-header {
    padding: 20px 20px 12px;
  }

  .popup-title {
    font-size: 20px;
  }

  .popup-content {
    padding: 20px;
  }

  .popup-text {
    font-size: 15px;
    margin-bottom: 20px;
  }

  .form-inputs {
    gap: 16px;
  }

  .score-prediction {
    padding: 16px;
  }

  .score-input-field {
    height: 50px;
    font-size: 24px;
    max-width: 100px;
  }

  .vs-separator {
    font-size: 16px;
  }

  .popup-actions {
    flex-direction: column;
  }

  .btn-cancel,
  .btn-send {
    height: 48px;
    font-size: 15px;
  }
}
</style>