<template>
  <div class="container">
    <h1 class="text-2xl font-bold mb-4">Sản phẩm yêu thích</h1>

    <div v-if="favorites.length" class="product-grid">
      <ProductCard
        v-for="p in favorites"
        :key="p.id"
        :product="p"
        :isFav="favorites.some(f => f.id === p.id)"
        @view="handleView(p)"
        @favorite="toggleFavorite"
      />
    </div>

    <p v-else class="text-gray-500 mt-4">Chưa có sản phẩm nào được yêu thích.</p>

    <ProductModal v-if="selected" :product="selected" @close="selected = null" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductModal from '@/components/ProductModal.vue'

const favorites = ref([])
const selected = ref(null)

onMounted(() => {
  favorites.value = JSON.parse(localStorage.getItem('favorites')) || []
})

const toggleFavorite = (product) => {
  favorites.value = favorites.value.filter(p => p.id !== product.id)
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

const handleView = (product) => {
  selected.value = product
  let viewed = JSON.parse(localStorage.getItem('viewed') || '[]')
  viewed = viewed.filter(p => p.id !== product.id)
  viewed.unshift(product)
  viewed = viewed.slice(0, 3)
  localStorage.setItem('viewed', JSON.stringify(viewed))
}
</script>
