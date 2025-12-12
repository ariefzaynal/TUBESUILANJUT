<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const showPassword = ref(false);

function onSubmit() {
  console.log("login", { email: email.value, password: password.value });
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1 class="brand">sportive</h1>
      <p class="subtitle">Masuk ke akun Anda</p>

      <form class="form" @submit.prevent="onSubmit">
        <label class="field">
          <span class="icon" aria-hidden="true">✉️</span>
          <input v-model="email" type="email" placeholder="Email" required />
        </label>

        <label class="field">
          <span class="icon" aria-hidden="true">🔒</span>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            required
          />
          <button class="eye" type="button" @click="showPassword = !showPassword">
            👁️
          </button>
        </label>

        <div class="row">
          <a class="link" href="#">Lupa password?</a>
        </div>

        <button class="btn" type="submit">Masuk</button>

        <p class="foot">
          Belum punya akun? <a class="link" href="#">Daftar</a>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.card{width:min(560px,100%);text-align:center;padding:24px 18px}
.brand{margin:0;font-size:40px;font-weight:700}
.subtitle{margin:8px 0 22px;color:#5b6472}
.form{display:flex;flex-direction:column;gap:14px;align-items:center}
.field{width:min(520px,100%);position:relative;display:flex;align-items:center}
.field input{width:100%;height:50px;border:1px solid #d6dde8;border-radius:10px;padding:0 44px;outline:none}
.icon{position:absolute;left:14px}
.eye{position:absolute;right:10px;border:none;background:transparent;cursor:pointer}
.row{width:min(520px,100%);display:flex;justify-content:flex-end;margin-top:-6px}
.btn{width:min(520px,100%);height:54px;border:none;border-radius:10px;background:#1f5eff;color:#fff;font-weight:600;cursor:pointer;margin-top:6px}
.link{color:#1f5eff;text-decoration:none;font-size:14px}
.foot{margin:10px 0 0;color:#5b6472;font-size:14px}
</style>
