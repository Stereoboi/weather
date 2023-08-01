<script setup lang="ts">
import { WeatherData } from "../../types/weatherFetch";
const emit = defineEmits(["switch"]);

const switchChart = (name: string) => emit("switch", name);
const IMG_URL = import.meta.env.VITE_IMG_URL;
defineProps<{
  cardData: WeatherData;
  hideButton: boolean;
}>();
</script>

<template>
  <div class="card-wrapper">
    <div class="first-line">
      <p>
        <font-awesome-icon :icon="['fas', 'location-dot']" class="fa-1x" />
        {{ cardData.name }},{{ cardData.sys.country }}
      </p>
      <p>{{ cardData.weather[0].description.toUpperCase() }}</p>
    </div>
    <div class="second-line">
      <p class="temp">{{ Math.ceil(cardData.main.temp) }} °C</p>
      <img
        :src="`${IMG_URL}${cardData.weather[0].icon}@2x.png`"
        :alt="cardData.weather[0].description"
        class="image"
      />
    </div>
    <div class="third-line">
      <p class="badge">
        <font-awesome-icon
          :icon="['fas', 'droplet']"
          style="margin-right: 5px"
        />
        {{ cardData.main.humidity }}%
      </p>
      <p class="badge">
        <font-awesome-icon
          :icon="['fas', 'wind']"
          class="fa-1x"
          style="margin-right: 5px"
        />
        {{ Math.ceil(cardData.wind.speed) }} km/h
      </p>
      <p class="badge">
        <font-awesome-icon
          :icon="['fas', 'cloud']"
          style="margin-right: 5px"
        />{{ cardData.clouds.all }}%
      </p>
    </div>
    <div class="btn-wrapper">
      <slot name="one-day" v-if="!hideButton">
        <button>one</button>
      </slot>
      <slot name="five-days" v-if="!hideButton">
        <button @click="switchChart(cardData.name)">five</button>
      </slot>
      <slot name="remove-favorite" v-if="!hideButton">
        <button>rem</button>
      </slot>
    </div>
  </div>
</template>

<style>
.image {
  width: 120px;
  height: 120px;
}

.temp {
  font-size: 50px;
  margin: 0;
}
.badge {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(47, 60, 79);
  padding: 5px;
  margin-right: 10px;
  border-radius: 8px;
  font-size: small;
  @media only screen and (min-width: 560px) {
    font-size: medium;
  }
}

.first-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.second-line {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
}

.third-line {
  display: flex;
  align-items: center;
  justify-content: center;
  /* justify-content: space-between; */
}

.btn-wrapper {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
}
</style>
