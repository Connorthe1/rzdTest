<script setup>
import { useTestStore } from "@/stores/testStore.js";
const store = useTestStore()

//Проверяет соответствия в полях min max цен
function checkMaxPrice() {
  if (store.filters.maxPrice && store.filters.minPrice > store.filters.maxPrice) store.filters.maxPrice = store.filters.minPrice
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="bg-slate-200 rounded-md flex flex-col items-stretch p-4 gap-4">
      <span class="text-xl font-semibold text-center">Фильтры</span>
      <div class="flex flex-col gap-2 mt-4">
        <span class="font-semibold">Категория</span>
        <select v-model="store.filters.category" class="h-10 rounded-md px-2">
          <option value="">Все категории</option>
          <option v-for="(category, idx) in store.categoriesList" :key="idx" :value="category" >{{ category }}</option>
        </select>
      </div>
      <div class="flex flex-col gap-2">
        <span class="font-semibold">Цена</span>
        <div class="grid grid-cols-2 gap-2 items-center">
          <div class="flex bg-white items-center rounded-md px-2 gap-2">
            <span class="text-sm">от</span>
            <input v-model="store.filters.minPrice" type="number" class="h-10 w-full" min="0" placeholder="Мин цена" @focusout="checkMaxPrice">
          </div>
          <div class="flex bg-white items-center rounded-md px-2 gap-2">
            <span class="text-sm">до</span>
            <input v-model="store.filters.maxPrice" type="number" class="h-10 w-full" min="0" placeholder="Макс цена" @focusout="checkMaxPrice">
          </div>
        </div>
      </div>
      <button v-if="Object.values(store.filters).some(item => !!item)" class="font-semibold text-sm rounded-md py-1 transition hover:underline" @click="store.resetFilters()">Сбросить фильтры</button>
    </div>
    <button class="bg-slate-600 rounded-md py-2 transition h-14 text-lg text-white font-semibold hover:bg-slate-800" @click="store.getProducts()">Применить</button>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>