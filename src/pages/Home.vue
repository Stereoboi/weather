<script setup lang="ts">
import { ref } from "vue";
import Input from "../components/Input.vue";
import { weatherFetch } from "../helpers/weatherFetch";
import { WeatherData } from "../../types/weatherFetch";
import Card from "../components/Card.vue";

const cardData = ref<WeatherData | null>(null);
const isDataLoaded = ref(false);

const findCity = async (city: string) => {
  const result = await weatherFetch(city);
  cardData.value = result;
  isDataLoaded.value = true;
};
</script>

<template>
  <div>
    <h1>HOME PAGE</h1>
    <Input @findCity="findCity" />

    <div v-if="isDataLoaded && cardData">
      <Card :cardData="cardData">
        <template #add-button>
          <button>Add to workspace</button>
        </template>
        <template #make-favorite>
          <button>Add to favorite</button>
        </template>
      </Card>
    </div>
    <p v-else-if="isDataLoaded">Sorry, no data available.</p>
  </div>
</template>

<style></style>
