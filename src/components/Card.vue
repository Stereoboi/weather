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
