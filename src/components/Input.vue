<script setup lang="ts">
import { ref, watch } from "vue";
import { cityFetch } from "../helpers/cityFetchList.ts";
import { LocationsData } from "../../types/suggestedList";

const message = ref("");
const suggestedList = ref<LocationsData | null>(null);
const emit = defineEmits(["findCity"]);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

interface HTMLElementRef extends HTMLElement {
  focus(): void;
}

const vFocus = {
  mounted: (el: HTMLElementRef) => el.focus(),
};

const fetchCityList = async () => {
  const result = await cityFetch(message);
  suggestedList.value = result;
};
fetchCityList();

const handleSubmit = (city: string) => {
  emit("findCity", city);
  message.value = "";
  suggestedList.value = null;
};

watch(message, () => {
  // Перевіряємо чи вже є активний таймер, якщо та то очищаємо його
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Запускаємо таймер, який викликає `fetchCityList` через 0.5 с
  debounceTimer = setTimeout(fetchCityList, 500);
});
</script>

<template>
  <form @submit.prevent="handleSubmit(message)" type="submit" class="form">
    <div class="input-container">
      <input
        v-focus
        v-model.trim="message"
        type="text"
        placeholder="type city name here"
        class="input"
      />
      <ul v-if="suggestedList" class="suggestions">
        <li v-for="el in suggestedList" @click="handleSubmit(el.name)">
          {{ el.name }}
        </li>
      </ul>
    </div>
  </form>
</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  @media only screen and (min-width: 768px) {
    justify-content: center;
  }
}

.input-container {
  position: relative;
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: 500px;
  }
}

input {
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  color: #777474;
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: 500px;
  }
}

ul.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;

  @media only screen and (min-width: 768px) {
    width: 500px;
  }
}

ul.suggestions li {
  padding: 8px 10px;
  cursor: pointer;
}

ul.suggestions li:hover {
  background-color: #f0f0f0;
}

input:focus,
input:hover {
  border-color: #666;
}

input::placeholder {
  color: #999;
  font-family: "Palanquin Dark", sans-serif;
}
</style>
