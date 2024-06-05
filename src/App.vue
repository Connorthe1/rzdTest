<script setup>
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue"
</script>

<template>
  <Header />
  <main class="grow px-8 py-4 flex flex-col max-w-[1440px] mx-auto box-content w-full">
    <RouterView />
  </main>
  <footer class="h-10 bg-slate-600"></footer>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
body {
  background: #f1f5f9;
}
</style>
