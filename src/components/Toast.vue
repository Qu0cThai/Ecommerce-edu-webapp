<template>
    <div class="toast">{{ message }}</div>
  </template>
  
  <script setup>
  defineProps({ message: String })
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #1f2937;
    color: white;
    padding: 10px 16px;
    border-radius: 8px;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    animation: fadeInOut 2.5s ease-in-out;
  }
  
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; }
    100% { opacity: 0; transform: translateY(20px); }
  }
  </style>
  