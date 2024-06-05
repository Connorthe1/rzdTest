<script setup>
import { useTestStore } from "@/stores/testStore.js"
import router from "@/router/index.js"

const store = useTestStore()
function logout() {
  store.setLogin(null)
  router.push('/login')
}
</script>

<template>
  <div class="h-16 bg-slate-600 px-8 flex items-center justify-between">
    <router-link to="/" class="flex items-center gap-4 text-white font-semibold">
      <img src="https://wadline.ru/uploads/BuroBuro/1677660608.png" class="w-14 h-10 object-cover rounded-md" alt="">
      <span>РЖД тестовое</span>
    </router-link>
    <div v-if="store.isAuth" class="text-white font-semibold flex items-center gap-8">
      <router-link to="cart" class="flex items-center gap-2 group">
        <img src="https://www.svgrepo.com/show/533043/cart-shopping.svg" alt="" class="filter invert w-6 h-6">
        <span class="group-hover:underline">Корзина</span>
        <div v-if="store.cartList.length > 0" class="bg-slate-500 rounded-full w-8 h-8 flex items-center justify-center">
          <span>{{ store.cartList.length }}</span>
        </div>
      </router-link>
      <span class="cursor-pointer hover:underline" @click="logout">Выйти</span>
    </div>
  </div>
</template>