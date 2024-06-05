<script setup>
import { useTestStore } from "@/stores/testStore.js"
import { computed } from "vue"
import QuantitySelector from "@/components/QuantitySelector.vue"

const store = useTestStore()

const props = defineProps({
  product: {
    type: Object
  }
})

//Поиск текущего продукта в корзине
const currentItem = computed(() => {
  return store.cartList.find(item => item.id === props.product.id)
})
</script>

<template>
  <div class="border border-slate-300 rounded-md flex flex-col">
    <img :src="product.image" class="h-40 object-cover rounded-t-md" alt="">
    <div class="flex flex-col p-4 gap-2 grow">
      <span class="text-sm">
        {{ product.title }}
      </span>
      <span class="font-semibold">
        {{ `${product.price } ₽` }}
      </span>
      <div v-if="currentItem" class="grid grid-cols-3 gap-2 mt-auto">
        <QuantitySelector :amount="currentItem.amount" :product-id="product.id" />
        <router-link to="cart">
          <div class="rounded-md bg-slate-200 h-10 flex items-center justify-center border border-slate-300 hover:bg-slate-300 transition">
            <img src="https://www.svgrepo.com/show/510815/arrow-right-lg.svg" class="w-8 h-8" alt="">
          </div>
        </router-link>
      </div>
      <button v-else class="bg-slate-600 rounded-md py-2 transition mt-auto text-white font-semibold hover:bg-slate-800" @click="store.addToCart(product)">В корзину</button>
    </div>
  </div>
</template>

<style scoped>

</style>