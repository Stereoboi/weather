<script setup lang="ts">
import { WeatherData } from "../../types/weatherFetch";

defineProps<{
  cardData: WeatherData;
}>();
</script>

<template>
  <h2>{{ cardData.name }}</h2>
  <p>Weather: {{ cardData.weather[0].description }}</p>
  <p>Temperature: {{ cardData.main.temp }} °C</p>
  <p>Humidity: {{ cardData.main.humidity }}%</p>
  <slot name="add-button">
    <button>Add</button>
  </slot>
  <slot name="make-favorite">
    <button>Add</button>
  </slot>
</template>

<style></style>
