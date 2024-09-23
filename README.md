# Тестовое для РЖД

Сделано на Vue3 Composition Api + Pinia + VueRouter + Tailwind

При авторизации сделаны все валидации, подходит любая комбинация, главное прохождение валидации
* Email - должен подходить формату
* Пароль - минимум 3 символа (Должен включать цифры и буквы)

Фильтр по мин - макс цене сделан на фронте, т.к в api нет запроса на фильтрацию по ценам, фильтры применяются после нажатия на кнопку "Применить"

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```