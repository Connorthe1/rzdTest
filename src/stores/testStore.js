import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"

export const useTestStore = defineStore('test', () => {
  const isAuth = ref(null)
  const productList = ref([])
  const cartList = ref([])
  const categoriesList = ref([])
  const isLoadingProducts = ref(true)
  const headingCategory = ref('Все категории')

  const filters = reactive({
    minPrice: "",
    maxPrice: "",
    category: ""
  })

  //Сброс фильтров с перезагрузкой
  function resetFilters() {
    filters.minPrice = ""
    filters.maxPrice = ""
    filters.category = ""
    getProducts()
  }

  function setLogin(user) {
    isAuth.value = user
  }

  function addToCart(product) {
    product.amount = 1
    cartList.value.push(product)
  }

  function removeFromCart(productId) {
    const productIdx = cartList.value.findIndex(item => item.id === productId)
    if (productIdx !== -1) cartList.value.splice(productIdx, 1)
  }

  //Обновление элемента корзины (кол-во)
  function updateCartItem(productId, val) {
    const findProduct = cartList.value.find(item => item.id === productId)
    if (findProduct.amount + val <= 0) {
      removeFromCart(productId)
    } else {
      findProduct.amount += val
    }
  }

  function clearCart() {
    cartList.value = []
  }


  //Расчет суммы корзины
  const cartPrice = computed(() => {
    return cartList.value.reduce((acc,product) => acc += product.price * product.amount, 0).toFixed(2)
  })


  //Получение категорий
  async function getCategories() {
    try {
      const res = await axios.get('https://fakestoreapi.com/products/categories')
      categoriesList.value = res.data
    } catch (e) {
      console.log(e)
    }
  }

  //Получение товаров
  async function getProducts() {
    isLoadingProducts.value = true
    let req = "https://fakestoreapi.com/products"
    if (filters.category) req += `/category/${filters.category}`
    try {
      const res = await axios.get(req)
      productList.value = filterByPrice(res.data, filters.minPrice, filters.maxPrice)
    } catch (e) {
      console.log(e)
    } finally {
      isLoadingProducts.value = false
      headingCategory.value = filters.category || 'Все категории'
    }
  }

  //Функция фильтрации по цене так как в Api нет такого, пришлось делать на фронте
  function filterByPrice(products, minPrice, maxPrice) {
    switch (true) {
      case minPrice !== "" && maxPrice !== "":
        return products.filter(product => product.price >= minPrice && product.price <= maxPrice)
      case minPrice !== "":
        return products.filter(product => product.price >= minPrice)
      case maxPrice !== "":
        return products.filter(product => product.price <= maxPrice)
      default:
        return products
    }
  }

  return { isAuth, setLogin, getProducts, productList, cartList, addToCart, getCategories, categoriesList, filters, removeFromCart, resetFilters, isLoadingProducts, updateCartItem, headingCategory, cartPrice, clearCart }
})
