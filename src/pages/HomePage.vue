<template>
  <div class="container mt-4">
    <h1 class="text-2xl font-bold mb-4"> Danh sách sản phẩm</h1>

    <input v-model="search" placeholder="Tìm kiếm..." class="input mb-4" />

    <div class="mb-4" style="display: flex; gap: 1rem; flex-wrap: wrap">
      <label><input type="radio" v-model="filterPrice" value=""> Tất cả</label>
      <label><input type="radio" v-model="filterPrice" value="1"> &lt; 500K</label>
      <label><input type="radio" v-model="filterPrice" value="2"> 500K–1 triệu</label>
      <label><input type="radio" v-model="filterPrice" value="3"> &gt; 1 triệu</label>
    </div>

    <button @click="fetchSuggestions" class="btn mb-4">Gợi ý sản phẩm phù hợp</button>

    <p v-if="loading">Đang tải gợi ý...</p>
    <p v-if="error" class="desc" style="color: red">{{ error }}</p>
    
    <div v-if="!loading" class="product-grid grid-3">
      <ProductCard
        v-for="p in filteredProducts"
        :key="p.id"
        :product="p"
        :isFav="favorites.some(f => f.id === p.id)"
        @view="handleView(p)"
        @favorite="toggleFavorite"
      />
    </div>

    <ProductModal v-if="selected" :product="selected" @close="selected = null" />
    <Toast v-if="toastMsg" :message="toastMsg" />

    <div v-if="viewedHistory.length" class="mt-12 viewed-history-section">
      <h1 class="text-2xl font-bold mb-4"> Lịch sử đã xem </h1>
      <div class="product-grid">
        <ProductCard
          v-for="p in viewedHistory"
          :key="p.id"
          :product="p"
          :isFav="favorites.some(f => f.id === p.id)"
          @view="handleView(p)"
          @favorite="toggleFavorite"
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { mockProducts } from '@/data/mockProducts'
import { getSuggestions } from '@/services/api'
import ProductCard from '@/components/ProductCard.vue'
import ProductModal from '@/components/ProductModal.vue'
import Toast from '@/components/Toast.vue'

const search = ref('')
const filterPrice = ref('')
const selected = ref(null)
const error = ref('')
const loading = ref(false)
const products = ref([...mockProducts])
const favorites = ref([])
const viewedHistory = ref([])
const toastMsg = ref('')

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.value.toLowerCase())
    let matchPrice = true
    if (filterPrice.value === '1') matchPrice = p.price < 500000
    else if (filterPrice.value === '2') matchPrice = p.price >= 500000 && p.price <= 1000000
    else if (filterPrice.value === '3') matchPrice = p.price > 1000000
    return matchSearch && matchPrice
  })
})

const fetchSuggestions = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await getSuggestions(123)
    products.value = res
  } catch (err) {
    error.value = 'Không thể lấy gợi ý lúc này'
  } finally {
    loading.value = false
  }
}

const showToast = (msg) => {
  toastMsg.value = msg
  setTimeout(() => {
    toastMsg.value = ''
  }, 2500)
}

const toggleFavorite = (product) => {
  const exists = favorites.value.find(p => p.id === product.id)
  if (exists) {
    favorites.value = favorites.value.filter(p => p.id !== product.id)
    showToast('❌ Đã hủy yêu thích')
  } else {
    favorites.value.push(product)
    showToast('✅ Đã thêm vào yêu thích')
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}


const handleView = (product) => {
  selected.value = product
  let viewed = JSON.parse(localStorage.getItem('viewed') || '[]')
  viewed = viewed.filter(p => p.id !== product.id)
  viewed.unshift(product)
  viewed = viewed.slice(0, 4)
  localStorage.setItem('viewed', JSON.stringify(viewed))
  viewedHistory.value = viewed
}

onMounted(() => {
  favorites.value = JSON.parse(localStorage.getItem('favorites')) || []
  viewedHistory.value = JSON.parse(localStorage.getItem('viewed')) || []
})
</script>