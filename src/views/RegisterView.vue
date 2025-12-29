<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const teamName = ref("");
const email = ref("");
const sport = ref("");
const location = ref("");
const password = ref("");

function goLogin() {
  router.push("/login"); // nanti kita buat LoginView kalau sudah butuh
}

function onRegister() {
  console.log("register", {
    teamName: teamName.value,
    email: email.value,
    sport: sport.value,
    location: location.value,
    password: password.value,
  });

  alert("Daftar berhasil, silakan login");
  router.push("/login");
}

</script>

<template>
  <div class="page">
    <div class="card">
      <!-- HEADER -->
      <div class="header">
        <div class="badge">⚽</div>
        <h1>SPORTIVE</h1>
        <p>Temukan Lawan & Lapangan Olahraga</p>
      </div>

      <!-- BODY -->
      <div class="body">
        <!-- Tabs -->
        <div class="tabs">
          <button class="tab" type="button" @click="goLogin">Login</button>
          <button class="tab active" type="button">Daftar</button>
        </div>

        <!-- Form -->
        <form class="form" @submit.prevent="onRegister">
          <div class="group">
            <label>Nama Tim</label>
            <input v-model="teamName" type="text" placeholder="Masukkan Nama Tim" required />
          </div>

          <div class="group">
            <label>Email</label>
            <input v-model="email" type="email" placeholder="email@example.com" required />
          </div>

          <div class="group">
            <label>Olahraga Utama</label>
            <input v-model="sport" type="text" placeholder="Masukkan Olahraga" required />
          </div>

          <div class="group">
            <label>Lokasi</label>
            <input v-model="location" type="text" placeholder="Masukkan Lokasi" required />
          </div>

          <div class="group">
            <label>Password</label>
            <input v-model="password" type="password" placeholder="••••••••" required />
          </div>

          <button class="submit" type="submit">Daftar Sekarang</button>

          <p class="terms">
            Dengan mendaftar, Anda menyetujui
            <a href="#">Syarat & Ketentuan</a> dan
            <a href="#">Kebijakan Privasi</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page{
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:28px;
  background: radial-gradient(1000px 600px at 20% 10%, #1b2c67 0%, rgba(27,44,103,0) 60%),
              radial-gradient(1000px 600px at 80% 90%, #b1193f 0%, rgba(177,25,63,0) 60%),
              linear-gradient(135deg, #0b1d4d 0%, #b21f3b 70%);
}

.card{
  width:min(560px, 100%);
  border-radius:18px;
  overflow:hidden;
  background:#fff;
  box-shadow: 0 20px 60px rgba(0,0,0,.25);
}

.header{
  padding:34px 24px 28px;
  text-align:center;
  color:#fff;
  background: linear-gradient(135deg, #0b1d4d 0%, #b21f3b 75%);
}

.badge{
  width:64px;height:64px;
  margin:0 auto 12px;
  display:grid;place-items:center;
  border-radius:14px;
  background: rgba(255,255,255,.2);
  backdrop-filter: blur(6px);
  font-size:28px;
}

.header h1{
  margin:0;
  letter-spacing:1px;
  font-size:40px;
  font-weight:800;
}

.header p{
  margin-top:8px;
  opacity:.9;
}

.body{
  padding:26px 26px 30px;
  background:#fff;
}

.tabs{
  display:flex;
  background:#ededf2;
  border-radius:999px;
  padding:6px;
  gap:6px;
  margin: 0 auto 18px;
  width:min(420px, 100%);
}

.tab{
  flex:1;
  border:none;
  background:transparent;
  padding:10px 0;
  border-radius:999px;
  cursor:pointer;
  font-weight:600;
}

.tab.active{
  background:#fff;
  box-shadow: 0 8px 20px rgba(0,0,0,.08);
}

.form{
  width:min(420px, 100%);
  margin:0 auto;
  display:flex;
  flex-direction:column;
  gap:14px;
}

.group label{
  display:block;
  font-weight:600;
  margin-bottom:6px;
}

.group input{
  width:100%;
  height:46px;
  border:none;
  outline:none;
  border-radius:12px;
  background:#f3f4f6;
  padding:0 14px;
  font-size:15px;
}

.group input:focus{
  box-shadow: 0 0 0 3px rgba(230,57,70,.18);
}

.submit{
  height:50px;
  border:none;
  border-radius:12px;
  color:#fff;
  font-weight:700;
  cursor:pointer;
  margin-top:8px;
  background: linear-gradient(90deg, #b21f3b, #ff3b5a);
}

.submit:active{
  transform: translateY(1px);
}

.terms{
  margin-top:12px;
  font-size:14px;
  color:#4b5563;
  text-align:center;
  line-height:1.5;
}

.terms a{
  color:#e63946;
  text-decoration:none;
  font-weight:600;
}

.terms a:hover{ text-decoration: underline; }
</style>
