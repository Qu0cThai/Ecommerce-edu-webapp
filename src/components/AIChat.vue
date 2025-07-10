<template>
  <div class="chat-container">
    <div v-if="!open" class="chat-toggle" @click="open = true">
      🤖 Chatbot
    </div>

    <div v-else class="chatbox">
      <div class="chat-header">
        <span>💬 Tư vấn AI</span>
        <button class="close-btn" @click="open = false">✖</button>
      </div>
      <div class="chat-body">
        <div v-for="(msg, index) in messages" :key="index" class="chat-message">
          <strong>{{ msg.sender === 'user' ? 'Bạn' : 'AI' }}:</strong> {{ msg.text }}
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="chat-input">
        <input v-model="input" type="text" placeholder="Nhập câu hỏi..." />
        <button type="submit">Gửi</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { mockProducts } from '@/data/mockProducts'

const open = ref(false)
const input = ref('')
const messages = ref([
  { sender: 'bot', text: 'Chào bạn! Hỏi tôi về khoá học bạn cần nhé.' }
])

const sendMessage = () => {
  if (!input.value.trim()) return
  const userText = input.value
  messages.value.push({ sender: 'user', text: userText })

  const reply = getAIResponse(userText)
  setTimeout(() => {
    messages.value.push({ sender: 'bot', text: reply })
  }, 500)

  input.value = ''
}

const getAIResponse = (msg) => {
  const text = msg.toLowerCase()
  const matched = []

  if (text.includes('tiếng anh') || text.includes('english') || text.includes('ngoại ngữ') || text.includes('ngoai ngu') || text.includes('tieng anh')) {
    matched.push(...mockProducts.filter(p => p.subject === 'Ngoại ngữ'))
  }
  if (text.includes('lap trinh') || text.includes('lập trình') || text.includes('code')) {
    matched.push(...mockProducts.filter(p => p.subject === 'Lập trình'))
  }
  if (text.includes('thiết kế') || text.includes('desgin') || text.includes('thiet ke')) {
    matched.push(...mockProducts.filter(p => p.subject === 'Thiết kế'))
  }
  if (text.includes('kinh tế') || text.includes('economics') || text.includes('kinh te')) {
    matched.push(...mockProducts.filter(p => p.subject === 'Kinh tế'))
  }
  if (text.includes('toán') || text.includes('math') || text.includes('toan')) {
    matched.push(...mockProducts.filter(p => p.subject === 'Toán'))
  }
  if (text.includes('cơ bản') || text.includes('dễ') || text.includes('easy') || text.includes('basic')) {
    matched.push(...mockProducts.filter(p => p.level === 'Cơ bản'))
  }
  if (text.includes('trung cấp') || text.includes('medium')) {
    matched.push(...mockProducts.filter(p => p.level === 'Trung cấp'))
  }
  if (text.includes('nâng cao') || text.includes('hard') || text.includes('advanced')) {
    matched.push(...mockProducts.filter(p => p.level === 'Nâng cao'))
  }

  const unique = Array.from(new Set(matched.map(p => p.id))).map(id =>
    mockProducts.find(p => p.id === id)
  )

  if (unique.length === 0) return '❌ Xin lỗi, tôi chưa tìm thấy khoá học phù hợp.'
  return `✅ Tôi gợi ý cho bạn:\n` + unique.slice(0, 3).map(p => `- ${p.name}`).join('\n')
}
</script>

<style scoped>
.chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}
.chat-toggle {
  background-color: #4f46e5;
  color: white;
  padding: 8px 16px;
  border-radius: 9999px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.chatbox {
  width: 320px;
  max-height: 400px;
  background-color: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
.chat-header {
  background-color: #4f46e5;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
.chat-body {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  font-size: 14px;
}
.chat-message {
  margin-bottom: 8px;
  white-space: pre-wrap;
}
.chat-input {
  display: flex;
  border-top: 1px solid #ddd;
}
.chat-input input {
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
}
.chat-input button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
}
.chat-input button:hover {
  background-color: #3730a3;
}
</style>
