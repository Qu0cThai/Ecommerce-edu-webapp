<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <button @click="$emit('close')" class="close-btn">&times;</button>
      <h2 class="modal-title">{{ product.name }}</h2>
      <img :src="product.largeImg || product.image" alt="product" class="modal-img" />
      <p class="modal-short-desc">{{ product.shortDesc }}</p>
      <p class="modal-details">Ngành: {{ product.subject }} | Trình độ: {{ product.level }}</p>
      <p class="modal-price">{{ product.price.toLocaleString() }}đ</p>
      <p class="modal-rating">⭐ Đánh giá: {{ product.rating || 'Chưa có' }}/5</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: Object
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.modal-img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 8px;
  margin: 1rem 0;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #222;
}

.modal-short-desc {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.modal-details {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.modal-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: green;
}

.modal-rating {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  color: #f59e0b;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
}

.close-btn:hover {
  color: #000;
}

@keyframes fadeIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
