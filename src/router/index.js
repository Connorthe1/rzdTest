import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Cart from '@/views/Cart.vue'
import { useTestStore } from "@/stores/testStore.js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})

router.beforeEach(async (to) => {
  const store = useTestStore()

  //Защита от обхода логина
  if (to.name !== 'login' && !store.isAuth) {
    return '/login'
  }
  //Редирект со страницы логина
  if (to.name === 'login' && store.isAuth) {
    return false
  }
})

export default router
