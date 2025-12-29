<script setup lang="ts">
import AppNavbar from "../components/AppNavbar.vue";
import AppFooter from "../components/AppFooter.vue";
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const selectedChatId = ref<number | null>(null);
const messageText = ref("");
const typingTimeout = ref<number | null>(null);
const isTyping = ref(false);
const messagesContainerRef = ref<HTMLElement | null>(null);

// Simulasi ID pengguna saat ini
const currentUserId = 1;

// Fungsi untuk memeriksa chat baru dari localStorage
function checkForNewChat() {
  const newChatData = localStorage.getItem('newChat');
  if (newChatData) {
    try {
      const newChat = JSON.parse(newChatData);
      
      // Cek apakah chat sudah ada berdasarkan nama
      const existingChatIndex = chats.value.findIndex(c => c.name === newChat.name);
      
      if (existingChatIndex === -1) {
        // Tambahkan chat baru ke daftar
        chats.value.unshift(newChat); // Tambahkan di awal
        
        // Buat entry messages kosong untuk chat baru
        if (!messages.value[newChat.id]) {
          messages.value[newChat.id] = [];
        }
        
        // Tambahkan pesan selamat datang otomatis
        const welcomeMessage = {
          id: Date.now(),
          senderId: newChat.participants.find((p: number) => p !== currentUserId) || 2,
          senderName: newChat.name,
          text: "Halo! Mari kita diskusikan jadwal pertandingan",
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          isRead: false,
          isDelivered: true
        };
        
        messages.value[newChat.id].push(welcomeMessage);
        
        // Update last message
        const chatIndex = chats.value.findIndex(c => c.id === newChat.id);
        if (chatIndex !== -1) {
          chats.value[chatIndex].lastMessage = welcomeMessage.text;
          chats.value[chatIndex].lastMessageTime = welcomeMessage.time;
          chats.value[chatIndex].lastSenderId = welcomeMessage.senderId;
        }
        
        // Pilih chat baru secara otomatis
        selectedChatId.value = newChat.id;
        
        // Hapus data dari localStorage setelah diproses
        localStorage.removeItem('newChat');
        
        // Auto scroll ke bawah
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      } else {
        // Jika chat sudah ada, pilih chat yang sudah ada
        selectedChatId.value = chats.value[existingChatIndex].id;
        localStorage.removeItem('newChat');
      }
    } catch (error) {
      console.error('Error parsing new chat data:', error);
      localStorage.removeItem('newChat');
    }
  }
}

// Struktur data chat yang lebih real-time
const chats = ref([
  {
    id: 1,
    name: "Warriors Basketball",
    status: "Online",
    lastMessage: "Kapan jadwal pertandingannya?",
    lastMessageTime: "10:20",
    lastSenderId: 2,
    unread: 2,
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80",
    participants: [1, 2],
    isOnline: true,
    lastSeen: "Just now",
    sport: "Basketball",
    area: "Jakarta Pusat"
  },
  {
    id: 2,
    name: "Badminton Stars",
    status: "Oke, deal",
    lastMessage: "Oke, deal",
    lastMessageTime: "09:15",
    lastSenderId: 3,
    unread: 0,
    image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80",
    participants: [1, 3],
    isOnline: true,
    lastSeen: "2 min ago",
    sport: "Badminton",
    area: "Jakarta Utara"
  },
  {
    id: 3,
    name: "Volleyball Kings",
    status: "Baik, kami terima tantangannya",
    lastMessage: "Baik, kami terima tantangannya",
    lastMessageTime: "Yesterday",
    lastSenderId: 4,
    unread: 0,
    image: "https://images.unsplash.com/photo-1611274588884-681acc8be2f2?auto=format&fit=crop&w=800&q=80",
    participants: [1, 4],
    isOnline: false,
    lastSeen: "Yesterday, 12:00",
    sport: "Volleyball",
    area: "Jakarta Barat"
  },
  {
    id: 4,
    name: "Lightning FC",
    status: "Lokasinya dimana?",
    lastMessage: "Lokasinya dimana?",
    lastMessageTime: "Yesterday",
    lastSenderId: 5,
    unread: 1,
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80",
    participants: [1, 5],
    isOnline: true,
    lastSeen: "5 min ago",
    sport: "Futsal",
    area: "Jakarta Timur"
  }
]);

// Pesan per chat dengan struktur yang lebih baik
const messages = ref<Record<number, Array<{
  id: number;
  senderId: number;
  senderName: string;
  text: string;
  time: string;
  isRead: boolean;
  isDelivered: boolean;
}>>>({
  1: [
    {
      id: 1,
      senderId: 2,
      senderName: "Warriors Basketball",
      text: "Halo! Terima kasih sudah mengirim tantangan",
      time: "10:20",
      isRead: true,
      isDelivered: true
    },
    {
      id: 2,
      senderId: 1,
      senderName: "You",
      text: "Sama-sama! Kapan kalian bisa main?",
      time: "10:22",
      isRead: true,
      isDelivered: true
    },
    {
      id: 3,
      senderId: 2,
      senderName: "Warriors Basketball",
      text: "Kami bisa weekend ini, Sabtu atau Minggu",
      time: "10:25",
      isRead: false,
      isDelivered: true
    }
  ],
  2: [
    {
      id: 1,
      senderId: 3,
      senderName: "Badminton Stars",
      text: "Halo! Kami tertarik dengan tantangan Anda",
      time: "09:10",
      isRead: true,
      isDelivered: true
    },
    {
      id: 2,
      senderId: 1,
      senderName: "You",
      text: "Bagus! Kapan kita bisa bermain?",
      time: "09:12",
      isRead: true,
      isDelivered: true
    },
    {
      id: 3,
      senderId: 3,
      senderName: "Badminton Stars",
      text: "Oke, deal",
      time: "09:15",
      isRead: true,
      isDelivered: true
    }
  ],
  3: [
    {
      id: 1,
      senderId: 4,
      senderName: "Volleyball Kings",
      text: "Terima kasih atas tantangan yang diberikan",
      time: "11:30",
      isRead: true,
      isDelivered: true
    },
    {
      id: 2,
      senderId: 1,
      senderName: "You",
      text: "Bagaimana dengan jadwalnya?",
      time: "11:35",
      isRead: true,
      isDelivered: true
    },
    {
      id: 3,
      senderId: 4,
      senderName: "Volleyball Kings",
      text: "Baik, kami terima tantangannya",
      time: "12:00",
      isRead: true,
      isDelivered: true
    }
  ],
  4: [
    {
      id: 1,
      senderId: 5,
      senderName: "Lightning FC",
      text: "Halo! Kami ingin bertanding dengan tim Anda",
      time: "14:50",
      isRead: true,
      isDelivered: true
    },
    {
      id: 2,
      senderId: 1,
      senderName: "You",
      text: "Baik, kami setuju. Tempatnya di mana?",
      time: "14:55",
      isRead: true,
      isDelivered: true
    },
    {
      id: 3,
      senderId: 5,
      senderName: "Lightning FC",
      text: "Lokasinya dimana?",
      time: "15:00",
      isRead: false,
      isDelivered: true
    }
  ]
});

const selectedChat = computed(() => {
  return chats.value.find(c => c.id === selectedChatId.value);
});

const chatMessages = computed(() => {
  if (!selectedChatId.value) return [];
  return messages.value[selectedChatId.value as keyof typeof messages.value] || [];
});

// Sort chats berdasarkan waktu terakhir
const sortedChats = computed(() => {
  return [...chats.value].sort((a, b) => {
    // Prioritaskan unread messages
    if (a.unread > 0 && b.unread === 0) return -1;
    if (a.unread === 0 && b.unread > 0) return 1;
    
    // Sort berdasarkan lastMessageTime (terbaru di atas)
    return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
  });
});

// Format waktu relatif
function formatRelativeTime(timeStr: string): string {
  const now = new Date();
  const [hours, minutes] = timeStr.split(':').map(Number);
  const messageTime = new Date();
  messageTime.setHours(hours, minutes, 0, 0);
  
  const diffMs = now.getTime() - messageTime.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  return timeStr;
}

// Generate ID pesan unik
function generateMessageId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

// Simulasi penerimaan pesan
function simulateReply(chatId: number) {
  const replies = [
    "Baik, kami tunggu konfirmasinya",
    "Kapan kita bisa mulai?",
    "Lokasi tempatnya di mana?",
    "Berapa jumlah pemain?",
    "Ada persyaratan khusus?",
    "Kami siap kapan saja",
    "Jam berapa yang cocok?",
    "Mari kita tentukan jadwalnya",
    "Ada biaya tambahan?",
    "Fasilitas apa saja yang tersedia?",
    "Bagaimana dengan peraturannya?",
    "Apakah ada wasit?",
    "Kita bisa bertemu 15 menit sebelumnya",
    "Boleh saya bawa cadangan pemain?",
    "Apakah ada sistem best of three?",
    "Mari kita jadwalkan untuk minggu depan"
  ];
  
  const randomReply = replies[Math.floor(Math.random() * replies.length)];
  
  // Simulasi typing indicator
  isTyping.value = true;
  
  setTimeout(() => {
    const newMessage = {
      id: generateMessageId(),
      senderId: selectedChat.value?.participants.find(p => p !== currentUserId) || 2,
      senderName: selectedChat.value?.name || "User",
      text: randomReply,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      isRead: false,
      isDelivered: true
    };
    
    if (!messages.value[chatId]) {
      messages.value[chatId] = [];
    }
    messages.value[chatId].push(newMessage);
    
    // Update last message in chat list
    const chatIndex = chats.value.findIndex(c => c.id === chatId);
    if (chatIndex !== -1) {
      chats.value[chatIndex].lastMessage = newMessage.text;
      chats.value[chatIndex].lastMessageTime = newMessage.time;
      chats.value[chatIndex].lastSenderId = newMessage.senderId;
      
      // Tambah unread jika chat tidak sedang dibuka
      if (chatId !== selectedChatId.value) {
        chats.value[chatIndex].unread += 1;
      } else {
        // Jika chat sedang dibuka, scroll ke bawah
        scrollToBottom();
      }
    }
    
    // Jika chat sedang dibuka, tandai sebagai dibaca
    if (chatId === selectedChatId.value) {
      markMessagesAsRead(chatId);
    }
    
    // Matikan typing indicator
    isTyping.value = false;
  }, 1500 + Math.random() * 1000);
}

// Kirim pesan
function sendMessage() {
  if (messageText.value.trim() && selectedChatId.value) {
    const newMessage = {
      id: generateMessageId(),
      senderId: currentUserId,
      senderName: "You",
      text: messageText.value,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      isRead: true,
      isDelivered: false
    };
    
    if (!messages.value[selectedChatId.value]) {
      messages.value[selectedChatId.value] = [];
    }
    messages.value[selectedChatId.value].push(newMessage);
    
    // Update chat list
    const chatIndex = chats.value.findIndex(c => c.id === selectedChatId.value);
    if (chatIndex !== -1) {
      chats.value[chatIndex].lastMessage = newMessage.text;
      chats.value[chatIndex].lastMessageTime = newMessage.time;
      chats.value[chatIndex].lastSenderId = currentUserId;
      chats.value[chatIndex].unread = 0;
    }
    
    // Simulasi pengiriman berhasil
    setTimeout(() => {
      const messageIndex = messages.value[selectedChatId.value].findIndex(m => m.id === newMessage.id);
      if (messageIndex !== -1) {
        messages.value[selectedChatId.value][messageIndex].isDelivered = true;
      }
    }, 500);
    
    // Simulasi balasan
    simulateReply(selectedChatId.value);
    
    // Clear input dan scroll ke bawah
    messageText.value = "";
    scrollToBottom();
  }
}

// Pilih chat
function selectChat(chatId: number) {
  selectedChatId.value = chatId;
  markMessagesAsRead(chatId);
  
  // Reset unread count
  const chatIndex = chats.value.findIndex(c => c.id === chatId);
  if (chatIndex !== -1) {
    chats.value[chatIndex].unread = 0;
  }
  
  // Scroll ke bawah setelah memilih chat
  nextTick(() => {
    scrollToBottom();
  });
}

// Tandai pesan sebagai sudah dibaca
function markMessagesAsRead(chatId: number) {
  if (messages.value[chatId]) {
    messages.value[chatId].forEach(message => {
      if (message.senderId !== currentUserId) {
        message.isRead = true;
      }
    });
  }
}

// Simulasi ketikan
function handleTyping() {
  if (typingTimeout.value) {
    clearTimeout(typingTimeout.value);
  }
  
  isTyping.value = true;
  typingTimeout.value = window.setTimeout(() => {
    isTyping.value = false;
  }, 2000);
}

// Simulasi online status
function updateOnlineStatus() {
  chats.value.forEach(chat => {
    if (chat.id !== selectedChatId.value) {
      // 70% chance to be online for existing chats
      chat.isOnline = Math.random() > 0.3;
    }
  });
}

// Cek apakah pesan adalah milik user saat ini
function isOwnMessage(senderId: number): boolean {
  return senderId === currentUserId;
}

// Auto scroll ke pesan terbaru
function scrollToBottom() {
  nextTick(() => {
    if (messagesContainerRef.value) {
      messagesContainerRef.value.scrollTop = messagesContainerRef.value.scrollHeight;
    }
  });
}

// Format last message untuk display
function formatLastMessage(chat: any): string {
  const maxLength = 30;
  let message = chat.lastMessage;
  
  if (chat.lastSenderId === currentUserId) {
    message = "You: " + message;
  }
  
  if (message.length > maxLength) {
    return message.substring(0, maxLength) + "...";
  }
  
  return message;
}

// Lifecycle
onMounted(() => {
  // Cek apakah ada chat baru dari halaman CariLawan
  checkForNewChat();
  
  // Jika tidak ada chat yang dipilih, pilih chat pertama
  if (!selectedChatId.value && chats.value.length > 0) {
    selectedChatId.value = chats.value[0].id;
    markMessagesAsRead(chats.value[0].id);
  }
  
  // Simulasi update status online berkala
  const onlineInterval = setInterval(updateOnlineStatus, 15000);
  
  // Simulasi pesan masuk acak
  const messageInterval = setInterval(() => {
    if (Math.random() > 0.8 && chats.value.length > 0) {
      const randomChatIndex = Math.floor(Math.random() * chats.value.length);
      const randomChat = chats.value[randomChatIndex];
      
      if (randomChat.id !== selectedChatId.value) {
        simulateReply(randomChat.id);
      }
    }
  }, 20000);
  
  // Scroll ke bawah saat pertama kali load
  scrollToBottom();
  
  // Cleanup intervals
  onUnmounted(() => {
    clearInterval(onlineInterval);
    clearInterval(messageInterval);
    
    if (typingTimeout.value) {
      clearTimeout(typingTimeout.value);
    }
  });
});

// Watch untuk chat messages berubah
watch(chatMessages, () => {
  scrollToBottom();
}, { deep: true });

// Watch untuk route changes (jika ada query parameter)
watch(() => route.query, (newQuery) => {
  if (newQuery.chatId) {
    const chatId = parseInt(newQuery.chatId as string);
    if (!isNaN(chatId)) {
      const chatExists = chats.value.some(c => c.id === chatId);
      if (chatExists) {
        selectChat(chatId);
      }
    }
  }
}, { immediate: true });

// Fungsi untuk menghapus chat
function deleteChat(chatId: number, event: Event) {
  event.stopPropagation();
  
  if (confirm("Apakah Anda yakin ingin menghapus chat ini?")) {
    const chatIndex = chats.value.findIndex(c => c.id === chatId);
    if (chatIndex !== -1) {
      chats.value.splice(chatIndex, 1);
      
      // Jika chat yang dihapus sedang dipilih, pilih chat lain
      if (selectedChatId.value === chatId) {
        selectedChatId.value = chats.value.length > 0 ? chats.value[0].id : null;
      }
    }
  }
}

// Fungsi untuk menandai semua pesan sebagai dibaca
function markAllAsRead() {
  chats.value.forEach(chat => {
    markMessagesAsRead(chat.id);
    chat.unread = 0;
  });
}
</script>

<template>
  <div class="page">
    <AppNavbar />

    <div class="chat-container">
      <!-- CHAT LIST SIDEBAR -->
      <div class="chat-sidebar">
        <div class="sidebar-header">
          <div class="sidebar-title-container">
            <h2 class="sidebar-title">Pesan</h2>
            <button class="mark-read-btn" @click="markAllAsRead" v-if="chats.some(c => c.unread > 0)">
              Tandai semua sudah dibaca
            </button>
          </div>
          <span class="online-status">{{ chats.filter(c => c.isOnline).length }} Online</span>
        </div>

        <div class="search-box">
          <input type="text" placeholder="Cari percakapan...">
          <span class="search-icon">🔍</span>
        </div>

        <div class="chat-list" v-if="chats.length > 0">
          <div 
            v-for="chat in sortedChats" 
            :key="chat.id"
            @click="selectChat(chat.id)"
            class="chat-item"
            :class="{ 
              active: selectedChatId === chat.id,
              unread: chat.unread > 0
            }"
          >
            <div class="chat-avatar">
              <img :src="chat.image" :alt="chat.name">
              <span class="online-dot" :class="{ online: chat.isOnline }"></span>
            </div>
            <div class="chat-info">
              <div class="chat-info-header">
                <h4>{{ chat.name }}</h4>
                <span class="chat-time">{{ formatRelativeTime(chat.lastMessageTime) }}</span>
              </div>
              <div class="chat-info-content">
                <p class="last-message">
                  {{ formatLastMessage(chat) }}
                </p>
                <div class="chat-actions">
                  <div v-if="chat.unread > 0" class="unread-indicator">
                    <span class="unread-badge">{{ chat.unread }}</span>
                  </div>
                  <button 
                    class="delete-chat-btn" 
                    @click="deleteChat(chat.id, $event)"
                    title="Hapus chat"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div class="chat-meta" v-if="chat.sport">
                <span class="chat-sport">{{ chat.sport }}</span>
                <span class="chat-location">📍 {{ chat.area }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="empty-chat-list">
          <div class="empty-icon">💬</div>
          <p class="empty-text">Belum ada percakapan</p>
          <p class="empty-subtext">Mulai percakapan dari halaman Cari Lawan</p>
        </div>
      </div>

      <!-- CHAT WINDOW -->
      <div class="chat-window">
        <div v-if="selectedChat" class="chat-window-inner">
          <!-- CHAT HEADER -->
          <div class="chat-header">
            <div class="header-left">
              <div class="header-avatar-wrapper">
                <img :src="selectedChat.image" :alt="selectedChat.name" class="header-avatar">
                <span class="header-online-dot" :class="{ online: selectedChat.isOnline }"></span>
              </div>
              <div class="header-info">
                <h3>{{ selectedChat.name }}</h3>
                <span class="status">
                  <span v-if="selectedChat.isOnline" class="online-text">
                    <span class="pulse-dot"></span>
                    Online
                  </span>
                  <span v-else class="offline-text">Terakhir online {{ selectedChat.lastSeen }}</span>
                </span>
              </div>
            </div>
            <div class="header-right">
              <div class="chat-stats" v-if="selectedChat.sport">
                <span class="stat-badge">{{ selectedChat.sport }}</span>
                <span class="stat-location">📍 {{ selectedChat.area }}</span>
              </div>
            </div>
          </div>

          <!-- MESSAGES -->
          <div 
            class="messages-container" 
            id="messages-container"
            ref="messagesContainerRef"
          >
            <!-- Date separator -->
            <div class="date-separator">
              <span class="date-text">Hari ini</span>
            </div>
            
            <div 
              v-for="message in chatMessages" 
              :key="message.id"
              class="message-wrapper"
              :class="{ own: isOwnMessage(message.senderId) }"
            >
              <div class="message-content">
                <div 
                  class="message-bubble"
                  :class="{ 
                    own: isOwnMessage(message.senderId),
                    unread: !message.isRead && !isOwnMessage(message.senderId)
                  }"
                >
                  <p>{{ message.text }}</p>
                  <div class="message-meta">
                    <span class="message-time">{{ message.time }}</span>
                    <span v-if="isOwnMessage(message.senderId)" class="message-status">
                      <span v-if="message.isDelivered && message.isRead" class="read">✓✓</span>
                      <span v-else-if="message.isDelivered" class="delivered">✓✓</span>
                      <span v-else class="sending">🕐</span>
                    </span>
                    <span v-if="!isOwnMessage(message.senderId) && !message.isRead" class="unread-indicator">Baru</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Typing indicator -->
            <div v-if="isTyping && selectedChat?.isOnline" class="typing-indicator">
              <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span class="typing-text">{{ selectedChat?.name }} sedang mengetik...</span>
            </div>
            
            <!-- Welcome message for new chats -->
            <div v-if="chatMessages.length === 0" class="welcome-message">
              <div class="welcome-icon">👋</div>
              <h3>Mulai Percakapan</h3>
              <p>Kirim pesan untuk memulai diskusi dengan {{ selectedChat?.name }}</p>
              <div class="suggested-messages">
                <button class="suggested-btn" @click="messageText = 'Halo, apakah tim Anda tersedia untuk bertanding?'; sendMessage()">
                  Ajukan pertandingan
                </button>
                <button class="suggested-btn" @click="messageText = 'Boleh minta info kontak adminnya?'; sendMessage()">
                  Minta info kontak
                </button>
              </div>
            </div>
          </div>

          <!-- MESSAGE INPUT -->
          <div class="message-input-box">
            <div class="input-wrapper">
              <input 
                v-model="messageText"
                @input="handleTyping"
                @keyup.enter="sendMessage"
                type="text" 
                :placeholder="`Ketik pesan untuk ${selectedChat?.name}...`"
                class="message-input"
                :disabled="!selectedChat?.isOnline"
              />
              <div class="input-actions">
                <button class="btn-attach" title="Lampirkan file">
                  📎
                </button>
                <button 
                  type="button" 
                  @click="sendMessage" 
                  class="btn-send"
                  :disabled="!messageText.trim() || !selectedChat?.isOnline"
                >
                  <span class="send-icon">↗</span>
                </button>
              </div>
            </div>
            <div v-if="!selectedChat?.isOnline" class="offline-notice">
              ⚠️ {{ selectedChat?.name }} sedang offline. Pesan akan dikirim saat mereka online.
            </div>
          </div>
        </div>
        
        <!-- EMPTY STATE -->
        <div v-else class="empty-chat">
          <div class="empty-state">
            <div class="empty-icon">💬</div>
            <h3>Pilih Percakapan</h3>
            <p>Pilih percakapan dari daftar untuk memulai chat</p>
            <div class="empty-actions">
              <p class="empty-hint">Atau mulai percakapan baru dari halaman <strong>Cari Lawan</strong></p>
            </div>
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
  width: 380px;
  background: white;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.sidebar-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.sidebar-title {
  font-size: 24px;
  font-weight: 900;
  color: #1a202c;
  margin: 0;
}

.mark-read-btn {
  background: none;
  border: none;
  color: #e11d48;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.mark-read-btn:hover {
  background: #fff5f7;
}

.online-status {
  font-size: 13px;
  color: #10b981;
  font-weight: 600;
}

.search-box {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
}

.search-box input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  background: #f8fafc;
  transition: all 0.2s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #e11d48;
  background: white;
  box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
}

.search-icon {
  position: absolute;
  left: 28px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 16px;
}

.chat-list {
  flex: 1;
  overflow-y: auto;
}

.chat-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
  position: relative;
  border-bottom: 1px solid #f1f5f9;
}

.chat-item:hover {
  background: #f8fafc;
}

.chat-item.active {
  background: #fff5f5;
  border-left-color: #e11d48;
}

.chat-item.unread {
  background: #fef2f2;
}

.chat-item.unread:hover {
  background: #fee2e2;
}

.chat-avatar {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chat-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.online-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #94a3b8;
  border: 2px solid white;
}

.online-dot.online {
  background: #10b981;
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
}

.chat-info-header h4 {
  font-size: 15px;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  line-height: 1.2;
}

.chat-time {
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
  white-space: nowrap;
}

.chat-info-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.last-message {
  font-size: 13px;
  color: #64748b;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  line-height: 1.4;
}

.chat-item.unread .last-message {
  color: #1a202c;
  font-weight: 600;
}

.chat-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.unread-indicator {
  flex-shrink: 0;
}

.unread-badge {
  background: #e11d48;
  color: white;
  font-size: 11px;
  font-weight: 800;
  border-radius: 10px;
  padding: 2px 8px;
  min-width: 18px;
  text-align: center;
  display: inline-block;
}

.delete-chat-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 18px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  opacity: 0;
  transition: all 0.2s ease;
}

.chat-item:hover .delete-chat-btn {
  opacity: 1;
}

.delete-chat-btn:hover {
  background: #fef2f2;
  color: #dc2626;
}

.chat-meta {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 11px;
}

.chat-sport {
  padding: 2px 6px;
  background: #f1f5f9;
  color: #475569;
  border-radius: 6px;
  font-weight: 600;
}

.chat-location {
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 2px;
}

.empty-chat-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-chat-list .empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty-text {
  font-size: 16px;
  font-weight: 600;
  color: #475569;
  margin: 0 0 8px 0;
}

.empty-subtext {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
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

/* CHAT HEADER */
.chat-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-avatar-wrapper {
  position: relative;
}

.header-avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-online-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #94a3b8;
  border: 2px solid white;
}

.header-online-dot.online {
  background: #10b981;
}

.pulse-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  margin-right: 6px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.header-info h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 4px 0;
}

.status {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.online-text {
  color: #10b981;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.offline-text {
  color: #94a3b8;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-stats {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.stat-badge {
  padding: 4px 8px;
  background: #f1f5f9;
  color: #475569;
  border-radius: 6px;
  font-weight: 600;
}

.stat-location {
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 2px;
}

/* MESSAGES CONTAINER */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 29px,
      #f8fafc 29px,
      #f8fafc 30px
    );
}

.date-separator {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  position: relative;
}

.date-separator::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: #e2e8f0;
  z-index: 1;
}

.date-text {
  background: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  position: relative;
  z-index: 2;
  border: 1px solid #e2e8f0;
}

.message-wrapper {
  display: flex;
  justify-content: flex-start;
}

.message-wrapper.own {
  justify-content: flex-end;
}

.message-content {
  max-width: 70%;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 18px;
  background: white;
  color: #1a202c;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  border: 1px solid #e2e8f0;
}

.message-bubble.own {
  background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
  color: white;
  border: none;
  border-bottom-right-radius: 4px;
}

.message-bubble:not(.own) {
  border-bottom-left-radius: 4px;
}

.message-bubble.unread {
  border: 2px solid rgba(225, 29, 72, 0.2);
  background: #fef2f2;
}

.message-bubble p {
  margin: 0 0 8px 0;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}

.message-bubble.own p {
  color: white;
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
  font-size: 11px;
}

.message-time {
  opacity: 0.7;
}

.message-bubble.own .message-time {
  color: rgba(255, 255, 255, 0.8);
}

.message-status {
  font-size: 12px;
}

.read {
  color: rgba(255, 255, 255, 0.9);
}

.delivered {
  color: rgba(255, 255, 255, 0.7);
}

.sending {
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
}

.unread-indicator {
  color: #e11d48;
  font-weight: 700;
  font-size: 10px;
  padding: 1px 6px;
  background: rgba(225, 29, 72, 0.1);
  border-radius: 10px;
}

/* TYPING INDICATOR */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: white;
  border-radius: 18px;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  align-self: flex-start;
  max-width: 180px;
  border: 1px solid #e2e8f0;
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  background: #94a3b8;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

.typing-text {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

@keyframes typing {
  0%, 80%, 100% { 
    transform: translateY(0);
    opacity: 0.5;
  }
  40% { 
    transform: translateY(-5px);
    opacity: 1;
  }
}

/* WELCOME MESSAGE */
.welcome-message {
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 16px;
  border: 2px dashed #e2e8f0;
  margin: 20px 0;
}

.welcome-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.welcome-message h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 8px 0;
}

.welcome-message p {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 24px 0;
  max-width: 300px;
  margin: 0 auto 24px;
}

.suggested-messages {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 250px;
  margin: 0 auto;
}

.suggested-btn {
  padding: 10px 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 13px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.suggested-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

/* MESSAGE INPUT */
.message-input-box {
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
  background: white;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.05);
}

.input-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
}

.message-input {
  flex: 1;
  padding: 14px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  font-size: 15px;
  font-family: inherit;
  background: #f8fafc;
  transition: all 0.2s ease;
}

.message-input:focus {
  outline: none;
  border-color: #e11d48;
  background: white;
  box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
}

.message-input:disabled {
  background: #f1f5f9;
  color: #94a3b8;
  cursor: not-allowed;
}

.input-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn-attach {
  width: 44px;
  height: 44px;
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 18px;
}

.btn-attach:hover {
  background: #f1f5f9;
  transform: translateY(-1px);
}

.btn-send {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(225, 29, 72, 0.2);
}

.btn-send:hover:not(:disabled) {
  background: linear-gradient(135deg, #d91e3b 0%, #a1102a 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);
}

.btn-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.send-icon {
  font-size: 18px;
  transform: rotate(45deg);
  display: block;
}

.offline-notice {
  font-size: 12px;
  color: #f59e0b;
  background: #fffbeb;
  padding: 8px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #fde68a;
}

/* EMPTY STATE */
.empty-chat {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}

.empty-state {
  text-align: center;
  padding: 40px;
  max-width: 400px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 24px;
  opacity: 0.2;
}

.empty-state h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 12px 0;
}

.empty-state p {
  font-size: 15px;
  color: #64748b;
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.empty-actions {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 2px dashed #e2e8f0;
}

.empty-hint {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}

.empty-hint strong {
  color: #e11d48;
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .chat-sidebar {
    width: 320px;
  }
  
  .message-content {
    max-width: 75%;
  }
}

@media (max-width: 992px) {
  .chat-container {
    flex-direction: column;
  }

  .chat-sidebar {
    width: 100%;
    height: 300px;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .chat-list {
    max-height: 200px;
  }

  .chat-window {
    flex: 1;
  }

  .messages-container {
    padding: 16px;
  }

  .message-input-box {
    padding: 16px;
  }

  .message-content {
    max-width: 85%;
  }
}

@media (max-width: 768px) {
  .chat-sidebar {
    height: 280px;
  }

  .chat-list {
    max-height: 180px;
  }

  .chat-item {
    padding: 12px;
  }

  .chat-avatar {
    width: 48px;
    height: 48px;
    border-radius: 12px;
  }

  .chat-header {
    padding: 12px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .header-right {
    width: 100%;
    justify-content: flex-start;
  }

  .messages-container {
    padding: 12px 16px;
  }

  .message-bubble {
    padding: 10px 14px;
  }

  .message-bubble p {
    font-size: 13px;
  }

  .message-input-box {
    padding: 12px 16px;
  }

  .input-wrapper {
    gap: 8px;
  }

  .message-input {
    padding: 12px 16px;
    font-size: 14px;
  }

  .btn-attach,
  .btn-send {
    width: 40px;
    height: 40px;
  }

  .empty-state {
    padding: 20px;
  }

  .empty-icon {
    font-size: 60px;
  }
}

@media (max-width: 480px) {
  .chat-sidebar {
    height: 250px;
  }

  .chat-list {
    max-height: 150px;
  }

  .chat-item {
    padding: 10px 12px;
  }

  .chat-avatar {
    width: 40px;
    height: 40px;
  }

  .chat-info-header h4 {
    font-size: 13px;
  }

  .last-message {
    font-size: 12px;
  }

  .message-content {
    max-width: 90%;
  }

  .welcome-message {
    padding: 24px 16px;
  }

  .welcome-icon {
    font-size: 48px;
  }

  .welcome-message h3 {
    font-size: 18px;
  }

  .suggested-messages {
    max-width: 100%;
  }
}
</style>