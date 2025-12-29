import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeVIew.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import CariLawanView from "../views/CariLawanView.vue";
import BookingLapanganView from "../views/BookingLapanganView.vue";
import ChatView from "../views/ChatView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: "/", 
      name: "home", 
      component: HomeView,
      meta: { title: "Home - SportConnect" }
    },
    { 
      path: "/login", 
      name: "login", 
      component: LoginView,
      meta: { title: "Login - SportConnect" }
    },
    { 
      path: "/register", 
      name: "register", 
      component: RegisterView,
      meta: { title: "Register - SportConnect" }
    },
    { 
      path: "/cari-lawan", 
      name: "cari-lawan", 
      component: CariLawanView,
      meta: { title: "Cari Lawan - SportConnect" }
    },
    { 
      path: "/booking-lapangan", 
      name: "booking-lapangan", 
      component: BookingLapanganView,
      meta: { title: "Booking Lapangan - SportConnect" }
    },
    { 
      path: "/chat", 
      name: "chat", 
      component: ChatView,
      meta: { title: "Chat - SportConnect" }
    },
    { 
      path: "/profil", 
      name: "profil", 
      component: () => import("../views/ProfilView.vue"), // Lazy loading untuk profil
      meta: { title: "Profil - SportConnect" }
    },
    // Redirect untuk URL lama
    { 
      path: "/cari", 
      redirect: "/cari-lawan" 
    },
    { 
      path: "/booking", 
      redirect: "/booking-lapangan" 
    },
  ],
});

// Navigation guard untuk mengubah judul halaman
router.beforeEach((to, from, next) => {
  // Set judul halaman dari meta
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  
  // Simpan route sebelumnya untuk kembali
  if (from.name) {
    localStorage.setItem('previousRoute', from.fullPath);
  }
  
  next();
});

export default router;