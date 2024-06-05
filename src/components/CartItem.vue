<script setup>
import QuantitySelector from "@/components/QuantitySelector.vue"
import {useTestStore} from "@/stores/testStore.js"

const store = useTestStore()

const props = defineProps({
  product: {
    type: Object
  },
  idx: {
    type: Number
  },
})
</script>

<template>
  <div class="flex bg-slate-200 px-4 py-4 text-lg rounded-md font-semibold gap-6">
    <div class="w-8 h-8 bg-slate-300 self-start flex items-center justify-center rounded-md">
      <span>{{ idx }}</span>
    </div>
    <div class="grow flex gap-4">
      <img :src="product.image" class="w-32 h-32 rounded-md object-cover" alt="">
      <span class="grow w-min">{{ product.title }}</span>
    </div>
    <span class="text-xl font-bold self-center w-[150px]">{{ `${product.price } ₽` }}</span>
    <div class="self-center w-[150px]">
      <QuantitySelector :amount="product.amount" :product-id="product.id" />
    </div>
    <div class="self-center w-[190px]">
      <button class="border border-slate-300 hover:border-slate-600 rounded-full w-10 h-10 flex items-center justify-center" @click="store.removeFromCart(product.id)">
        <img src="https://www.svgrepo.com/show/533010/trash-alt.svg" class="w-6 h-6 opacity-60" alt="">
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>