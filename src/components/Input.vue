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
  // Перевіряємо, чи вже є активний таймер, якщо так, то очищаємо його
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Запускаємо таймер, який викликає `fetchCityList` через 500 мс
  debounceTimer = setTimeout(fetchCityList, 500);
});
</script>

<template>
  <input v-focus v-model.trim="message" type="text" placeholder="type smth" />
  <button @click="handleSubmit(message)">Find</button>

  <ul v-if="suggestedList">
    <li v-for="el in suggestedList" @click="handleSubmit(el.name)">
      {{ el.name }}
    </li>
  </ul>
</template>

<style></style>
