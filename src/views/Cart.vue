<script setup>
import { useTestStore } from "@/stores/testStore.js"
import CartItem from "@/components/CartItem.vue"
import { ref } from "vue"
const isOpenModal = ref(false)
import router from "@/router/index.js"

const store = useTestStore()

function closeModal() {
  isOpenModal.value = false
  store.clearCart()
  router.push('/')
}
function createOrder() {
  isOpenModal.value = true
}

</script>

<template>
  <h1 v-if="store.cartList.length !== 0" class="text-3xl font-semibold">{{ `Корзина (${store.cartList.length})` }}</h1>
  <div v-if="store.cartList.length !== 0" class="flex gap-4 mt-4">
    <div class="flex flex-col gap-4 grow">
      <div class="flex bg-slate-200 px-4 py-4 text-lg rounded-md font-semibold gap-6">
        <div class="w-8">№</div>
        <span class="grow">Товар</span>
        <span class="w-[150px]">Сумма</span>
        <span class="w-[150px]">Количество</span>
        <button class="flex items-center gap-2 opacity-70 hover:opacity-100 transition w-[190px]" @click="store.clearCart()">
          <img src="https://www.svgrepo.com/show/533010/trash-alt.svg" class="w-6 h-6" alt="">
          <span>Очистить корзину</span>
        </button>
      </div>
      <CartItem v-for="(product, idx) in store.cartList" :key="product.id" :product="product" :idx="idx + 1" />
    </div>
    <div class="w-[300px] bg-slate-200 p-4 flex flex-col self-start">
      <span class="font-semibold text-slate-500">{{ `Всего ${store.cartList.length} товаров на сумму` }}</span>
      <span class="font-bold text-2xl mt-6">{{ `${store.cartPrice} ₽` }}</span>
      <button class="bg-slate-600 rounded-md py-2 transition h-14 mt-2 text-lg text-white font-semibold hover:bg-slate-800" @click="createOrder">Оформить заказ</button>
    </div>
  </div>
  <div v-else class="flex flex-col gap-6 items-center mt-8">
    <span class="text-4xl font-semibold">Корзина пуста</span>
    <router-link to="/" class="bg-slate-500 text-white px-4 py-2 rounded-md transition hover:bg-slate-600">Вернуться к покупкам</router-link>
  </div>
  <transition>
    <div v-if="isOpenModal" class="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
      <div class="w-[400px] flex flex-col bg-slate-200 rounded-md p-4 gap-6 text-center">
        <button class="self-end" @click="closeModal">
          <img src="https://www.svgrepo.com/show/511674/close-1511.svg" class="w-4 h-4" alt="">
        </button>
        <p class="text-2xl font-semibold">Заказ №12345</p>
        <p class="text-lg">{{ `Ваш заказ на сумму ${store.cartPrice} ₽ успешно оформлен!` }}</p>
        <button class="bg-slate-600 rounded-md py-2 transition h-12 mt-auto text-white font-semibold hover:bg-slate-800" @click="closeModal">Закрыть</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>