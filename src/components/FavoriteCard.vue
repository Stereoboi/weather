<script setup lang="ts">
import { WeatherData } from "../../types/weatherFetch";

defineProps<{
  cardData: WeatherData;
  hideButton: boolean;
}>();
</script>

<template>
  <h2>{{ cardData.name }}</h2>
  <p>Weather: {{ cardData.weather[0].description }}</p>
  <p>Temperature: {{ cardData.main.temp }} °C</p>
  <p>Humidity: {{ cardData.main.humidity }}%</p>
  <slot name="one-day" v-if="!hideButton">
    <button>one</button>
  </slot>
  <slot name="five-days" v-if="!hideButton">
    <button>five</button>
  </slot>
  <slot name="remove-favorite" v-if="!hideButton">
    <button>rem</button>
  </slot>
</template>

<style></style>
