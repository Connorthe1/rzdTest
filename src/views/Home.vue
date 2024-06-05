<script setup>
import SideBar from "@/components/SideBar.vue"
import ProductList from "@/components/ProductList.vue"
import { useTestStore } from "@/stores/testStore.js"

useTestStore().getProducts()
useTestStore().getCategories()
</script>

<template>
  <div class="grid grid-cols-9 gap-6">
    <SideBar class="col-span-2"></SideBar>
    <ProductList class="grow col-span-7"></ProductList>
  </div>
</template>

<style scoped>

</style>