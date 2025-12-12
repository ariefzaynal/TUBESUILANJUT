<script setup lang="ts">
import AppNavbar from "../components/AppNavbar.vue";
import AppFooter from "../components/AppFooter.vue";
import { ref, computed } from "vue";

const selectedChatId = ref(1);
const messageText = ref("");

const chats = ref([
  {
    id: 1,
    name: "Warriors Basketball",
    status: "Online",
    lastMessage: "Kapan jadwal pertandingannya?",
    time: "10:20",
    unread: 2,
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Badminton Stars",
    status: "Oke, deal",
    lastMessage: "Oke, deal",
    time: "09:15",
    unread: 0,
    image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Volleyball Kings",
    status: "Baik, kami terima tantangannya",
    lastMessage: "Baik, kami terima tantangannya",
    time: "Yesterday",
    unread: 0,
    image: "https://images.unsplash.com/photo-1611274588884-681acc8be2f2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Lightning FC",
    status: "Lokasinya dimana?",
    lastMessage: "Lokasinya dimana?",
    time: "Yesterday",
    unread: 1,
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80"
  }
]);

const messages = ref({
  1: [
    {
      id: 1,
      sender: "Warriors Basketball",
      text: "Halo! Terima kasih sudah mengirim tantangan",
      time: "10:20",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      text: "Sama-sama! Kapan kalian bisa main?",
      time: "10:22",
      isOwn: true
    },
    {
      id: 3,
      sender: "Warriors Basketball",
      text: "Kami bisa weekend ini, Sabtu atau Minggu",
      time: "10:25",
      isOwn: false
    }
  ],
  2: [
    {
      id: 1,
      sender: "Badminton Stars",
      text: "Halo! Kami tertarik dengan tantangan Anda",
      time: "09:10",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      text: "Bagus! Kapan kita bisa bermain?",
      time: "09:12",
      isOwn: true
    },
    {
      id: 3,
      sender: "Badminton Stars",
      text: "Oke, deal",
      time: "09:15",
      isOwn: false
    }
  ],
  3: [
    {
      id: 1,
      sender: "Volleyball Kings",
      text: "Terima kasih atas tantangan yang diberikan",
      time: "11:30",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      text: "Bagaimana dengan jadwalnya?",
      time: "11:35",
      isOwn: true
    },
    {
      id: 3,
      sender: "Volleyball Kings",
      text: "Baik, kami terima tantangannya",
      time: "12:00",
      isOwn: false
    }
  ],
  4: [
    {
      id: 1,
      sender: "Lightning FC",
      text: "Halo! Kami ingin bertanding dengan tim Anda",
      time: "14:50",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      text: "Baik, kami setuju. Tempatnya di mana?",
      time: "14:55",
      isOwn: true
    },
    {
      id: 3,
      sender: "Lightning FC",
      text: "Lokasinya dimana?",
      time: "15:00",
      isOwn: false
    }
  ]
});

const selectedChat = computed(() => {
  return chats.value.find(c => c.id === selectedChatId.value);
});

const chatMessages = computed(() => {
  return messages.value[selectedChatId.value as keyof typeof messages.value] || [];
});

function sendMessage() {
  if (messageText.value.trim()) {
    const newMessage = {
      id: Date.now(),
      sender: "You",
      text: messageText.value,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true
    };
    
    if (!messages.value[selectedChatId.value as keyof typeof messages.value]) {
      messages.value[selectedChatId.value as keyof typeof messages.value] = [];
    }
    messages.value[selectedChatId.value as keyof typeof messages.value].push(newMessage);
    messageText.value = "";
  }
}

function selectChat(chatId: number) {
  selectedChatId.value = chatId;
}
</script>

<template>
  <div class="page">
    <AppNavbar />

    <div class="chat-container">
      <!-- CHAT LIST SIDEBAR -->
      <div class="chat-sidebar">
        <div class="search-box">
          <input type="text" placeholder="Cari percakapan...">
        </div>

        <div class="chat-list">
          <div 
            v-for="chat in chats" 
            :key="chat.id"
            @click="selectChat(chat.id)"
            class="chat-item"
            :class="{ active: selectedChatId === chat.id }"
          >
            <div class="chat-avatar">
              <img :src="chat.image" :alt="chat.name">
            </div>
            <div class="chat-info">
              <h4>{{ chat.name }}</h4>
              <p>{{ chat.lastMessage }}</p>
            </div>
            <div class="chat-meta">
              <span class="time">{{ chat.time }}</span>
              <span v-if="chat.unread > 0" class="unread-badge">{{ chat.unread }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAT WINDOW -->
      <div class="chat-window">
        <div v-if="selectedChat" class="chat-window-inner">
          <!-- CHAT HEADER -->
          <div class="chat-header">
            <div class="header-left">
              <img :src="selectedChat.image" :alt="selectedChat.name" class="header-avatar">
              <div class="header-info">
                <h3>{{ selectedChat.name }}</h3>
                <span class="status">{{ selectedChat.status }}</span>
              </div>
            </div>
          </div>

          <!-- MESSAGES -->
          <div class="messages-container">
            <div 
              v-for="message in chatMessages" 
              :key="message.id"
              class="message"
              :class="{ own: message.isOwn }"
            >
              <div class="message-bubble">
                <p>{{ message.text }}</p>
                <span class="message-time">{{ message.time }}</span>
              </div>
            </div>
          </div>

          <!-- MESSAGE INPUT -->
          <div class="message-input-box">
            <input 
              v-model="messageText"
              type="text" 
              placeholder="Tulis pesan..."
              @keyup.enter="sendMessage"
            >
            <button type="button" @click="sendMessage" class="btn-send">Kirim</button>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Segoe UI", system-ui, -apple-system, Arial, sans-serif;
  background: #f5f7fa;
}

.chat-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* CHAT SIDEBAR */
.chat-sidebar {
  width: 320px;
  background: white;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
}

.search-box {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.search-box input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
}

.search-box input:focus {
  outline: none;
  border-color: #e63946;
  box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.1);
}

.chat-list {
  flex: 1;
  overflow-y: auto;
}

.chat-item {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
}

.chat-item:hover {
  background: #f9fafb;
}

.chat-item.active {
  background: #fff5f5;
  border-left-color: #e63946;
}

.chat-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.chat-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-info h4 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px;
}

.chat-info p {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}

.time {
  font-size: 12px;
  color: #9ca3af;
}

.unread-badge {
  width: 20px;
  height: 20px;
  background: #e63946;
  color: white;
  font-size: 11px;
  font-weight: 700;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

/* CHAT WINDOW */
.chat-window {
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-window-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.header-info h3 {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.status {
  font-size: 13px;
  color: #6b7280;
}

/* MESSAGES */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  justify-content: flex-start;
}

.message.own {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 60%;
  padding: 10px 14px;
  border-radius: 12px;
  background: #f3f4f6;
  color: #111827;
}

.message.own .message-bubble {
  background: #e63946;
  color: white;
}

.message-bubble p {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

.message-time {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 4px;
  display: block;
}

.message.own .message-time {
  color: rgba(255, 255, 255, 0.7);
}

/* MESSAGE INPUT */
.message-input-box {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 12px;
}

.message-input-box input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
}

.message-input-box input:focus {
  outline: none;
  border-color: #e63946;
  box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.1);
}

.btn-send {
  padding: 10px 18px;
  background: #e63946;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: background 0.2s ease;
}

.btn-send:hover {
  background: #d91e3b;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .chat-sidebar {
    width: 280px;
  }

  .message-bubble {
    max-width: 70%;
  }
}

@media (max-width: 768px) {
  .chat-container {
    flex-direction: column;
  }

  .chat-sidebar {
    width: 100%;
    height: 250px;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }

  .chat-window {
    flex: 1;
  }

  .messages-container {
    padding: 16px;
  }

  .message-input-box {
    padding: 12px 16px;
  }

  .message-bubble {
    max-width: 80%;
  }
}

@media (max-width: 640px) {
  .chat-list {
    max-height: 200px;
  }

  .chat-item {
    padding: 10px 12px;
  }

  .chat-avatar {
    width: 40px;
    height: 40px;
  }

  .chat-header {
    padding: 12px 16px;
  }

  .messages-container {
    padding: 12px 16px;
  }

  .message-bubble {
    max-width: 85%;
    padding: 8px 12px;
    font-size: 13px;
  }

  .message-input-box {
    padding: 10px 12px;
    gap: 8px;
  }

  .message-input-box input,
  .btn-send {
    padding: 8px 12px;
    font-size: 13px;
  }
}
</style>
