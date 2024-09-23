<script setup>
import {useVuelidate} from '@vuelidate/core'
import {required, email, minLength, helpers, alpha} from '@vuelidate/validators'
import {reactive} from "vue"
import router from "@/router/index.js"
import {useTestStore} from "@/stores/testStore.js"

const store = useTestStore()

const form = reactive({
  email: '',
  password: ''
})

const passwordHasLetters = (str) => /[A-Za-zА-Яа-яЁё]/.test(str)
const passwordHasDigits = (str) => /\d/.test(str)
const rules = {
  email: {
    required: helpers.withMessage('Поле не заполнено', required),
    email: helpers.withMessage('Неверный формат email', email)
  },
  password: {
    required: helpers.withMessage('Минимум 3 символа', required),
    minLength: helpers.withMessage('Минимум 3 символа', minLength(3)),
    passwordHasLetters: helpers.withMessage('Буквы алфавита', passwordHasLetters),
    passwordHasDigits: helpers.withMessage('Цифры', passwordHasDigits),
  }
}

const v$ = useVuelidate(rules, form)

async function login() {
  const result = await v$.value.$validate()
  if (!result) {
    v$.value.$touch()
    return
  }
  store.setLogin(form)
  router.push('/')
}
</script>

<template>
  <form @submit.prevent="login" class="flex flex-col items-center mt-10">
    <h1 class="font-semibold text-3xl">Авторизация</h1>
    <div class="flex flex-col gap-2 mt-6">
      <label for="email" class="text-sm">Email</label>
      <input v-model="form.email" id="email" type="text" class="border border-slate-400 focus:border-slate-600 h-10 px-2 w-[400px]" placeholder="Введите почту">
      <span v-if="v$.email.$invalid && v$.email.$dirty" class="text-sm text-red-600 -mt-1">{{ v$.email.$errors[0].$message }}</span>
    </div>
    <div class="flex flex-col gap-2 mt-4">
      <label for="password" class="text-sm">Password</label>
      <input v-model="form.password" id="password" type="password" class="border border-slate-400 focus:border-slate-600 h-10 px-2 w-[400px]" placeholder="Введите пароль">
      <ul v-if="v$.password.$invalid && v$.password.$dirty" class="text-sm text-red-600 -mt-1 list-disc list-inside">
        Пароль должен содержать:
        <li v-for="(error, idx) in v$.password.$errors" :key="idx">
          {{ error.$message }}
        </li>
      </ul>
    </div>
    <button :disabled="v$.$invalid && v$.$dirty" class="disabled:bg-slate-400 bg-slate-600 w-[400px] py-2 text-white mt-6 hover:bg-slate-800 transition">Войти</button>
  </form>


</template>

<style scoped>

</style>