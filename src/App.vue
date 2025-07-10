<script setup>
import AIChat from '@/components/AIChat.vue'
</script>
<template>
  <div>
    <nav class="navbar container">
      <router-link to="/">Trang chủ</router-link>
      <router-link to="/favorites">Yêu thích</router-link>
    </nav>
    <router-view />
    <AIChat />
  </div>
</template>