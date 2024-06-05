<script setup>
import { useTestStore } from "@/stores/testStore.js"

const store = useTestStore()

const props = defineProps({
  amount: {
    type: Number,
    default: 1
  },
  productId: {
    type: Number
  }
})
</script>

<template>
  <div class="h-10 grid grid-cols-3 gap-1 col-span-2 w-4/5">
    <button class="flex items-center justify-center bg-slate-200 border border-slate-300 rounded-md hover:bg-slate-300 transition" @click="store.updateCartItem(productId, -1)">
      <img src="https://www.svgrepo.com/show/532960/minus.svg" class="w-5 h-5" alt="">
    </button>
    <div class="flex items-center justify-center bg-slate-200 border border-slate-300 rounded-md font-semibold">
      <span>{{ amount }}</span>
    </div>
    <button class="flex items-center justify-center bg-slate-200 border border-slate-300 rounded-md hover:bg-slate-300 transition" @click="store.updateCartItem(productId, 1)">
      <img src="https://www.svgrepo.com/show/532997/plus-large.svg" class="w-5 h-5" alt="">
    </button>
  </div>
</template>

<style scoped>

</style>