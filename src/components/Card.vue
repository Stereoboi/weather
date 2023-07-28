<script setup lang="ts">
import { WeatherData } from "../../types/weatherFetch";
// import { onMounted } from "vue";
const props = defineProps<{
  cardData: WeatherData;
  hideButton: boolean;
}>();

const IMG_URL = import.meta.env.VITE_IMG_URL;

console.log(props.cardData);
</script>

<template>
  <h2>{{ cardData.name }}</h2>
  <img
    :src="`${IMG_URL}${cardData.weather[0].icon}@2x.png`"
    :alt="cardData.weather[0].description"
  />
  <p>Weather: {{ cardData.weather[0].description }}</p>
  <p>Temperature: {{ cardData.main.temp }} °C</p>
  <p>Humidity: {{ cardData.main.humidity }}%</p>
  <slot name="add-button" v-if="!hideButton">
    <button>workspace</button>
  </slot>
  <slot name="make-favorite" v-if="!hideButton">
    <button>make fav</button>
  </slot>
  <slot name="remove-workspace" v-if="hideButton">
    <button>rem</button>
  </slot>
  <slot name="make-favorite-ws" v-if="hideButton">
    <button>rem</button>
  </slot>
</template>

<style></style>
