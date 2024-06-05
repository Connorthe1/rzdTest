<script setup>
import { useTestStore } from "@/stores/testStore.js"
import ProductCard from "@/components/ProductCard.vue"

const store = useTestStore()
</script>

<template>
  <div class="rounded-md">
    <h1 class="text-2xl font-semibold">{{ store.headingCategory }}</h1>
    <div v-if="!store.isLoadingProducts && store.productList.length > 0" class="grid grid-cols-4 mt-4 gap-4">
      <ProductCard v-for="product in store.productList" :product="product" />
    </div>
    <div v-if="!store.isLoadingProducts && store.productList.length === 0" class="flex items-center justify-center flex-col gap-4 mt-10">
      <span class="text-2xl">Товары не найдены!</span>
      <button class="bg-slate-500 text-white px-4 py-2 rounded-md" @click="store.resetFilters()">Сбросить фильтры</button>
    </div>
    <div v-if="store.isLoadingProducts" class="grid grid-cols-5 mt-4 gap-4">
      <div v-for="item in 10" class="h-64 bg-slate-200 rounded-md"></div>
    </div>
  </div>
</template>

<style scoped>

</style>