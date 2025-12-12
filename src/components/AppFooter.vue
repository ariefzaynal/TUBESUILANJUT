<script setup lang="ts">
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <div class="footer-brand">
          <div class="brand-badge">⚽</div>
          <span class="logo">SPORTIVE</span>
        </div>
        <p class="footer-desc">Platform terpercaya untuk menemukan lawan dan memesan lapangan olahraga. Wujudkan pengalaman olahraga yang lebih mudah dan menyenangkan.</p>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">Tautan Cepat</h4>
        <ul class="footer-links">
          <li><a href="#">Tentang Kami</a></li>
          <li><a href="#">Cara Kerja</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Hubungi Kami</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">Legal</h4>
        <ul class="footer-links">
          <li><a href="#">Kebijakan Privasi</a></li>
          <li><a href="#">Syarat & Ketentuan</a></li>
          <li><a href="#">Kebijakan Cookie</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 SPORTIVE. All rights reserved. Made with ⚽ for sports lovers.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0b1d4d;
  color: #ffffff;
  margin-top: 60px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 40px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.brand-badge {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: #e63946;
  color: white;
  font-size: 16px;
}

.logo {
  font-weight: 800;
  letter-spacing: 0.6px;
  font-size: 18px;
}

.footer-desc {
  font-size: 13px;
  line-height: 1.6;
  opacity: 0.9;
  margin: 0;
}

.footer-title {
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 14px 0;
  text-transform: capitalize;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 13px;
  transition: all 0.2s ease;
}

.footer-links a:hover {
  color: #ffffff;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  text-align: center;
  font-size: 12px;
  opacity: 0.8;
}

.footer-bottom p {
  margin: 0;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 40px 20px;
  }
}
</style>
