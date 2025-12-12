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
    { path: "/", name: "home", component: HomeView },
    { path: "/login", name: "login", component: LoginView },
    { path: "/register", name: "register", component: RegisterView },
    { path: "/cari", name: "cari", component: CariLawanView },
    { path: "/booking", name: "booking", component: BookingLapanganView },
    { path: "/chat", name: "chat", component: ChatView },

    // placeholder (biar navbar ga error dulu)
    { path: "/profil", name: "profil", component: HomeView },
  ],
});

export default router;
