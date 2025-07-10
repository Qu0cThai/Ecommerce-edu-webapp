<template>
  <div class="card flex-col">
    <img :src="product.image" class="product-image mb-2" />
    <h2 class="title">{{ product.name }}</h2>
    <div class="flex-grow"></div>
    <div class="flex space-between mt-3 gap-2">
      <button class="btn" @click="$emit('view')">Xem chi tiết</button>
      <button class="btn"
        @click="$emit('favorite', product)"
        :class="[isFav ? 'favorite-btn' : 'not-favorite-btn']"
      >
        {{ isFav ? '💔' : '❤️' }}
      </button>
    </div>
  </div>
</template>
<script setup>
defineProps({
  product: Object,
  isFav: Boolean
})
</script>