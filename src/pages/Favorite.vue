<script setup lang="ts">
import { onMounted, ref } from "vue";
import { WeatherData } from "../../types/weatherFetch";
import FavoriteCard from "../components/FavoriteCard.vue";
import Modal from "../components/Modal.vue";
import Chart from "../components/Chart.vue";
const favoriteCities = ref<WeatherData[] | null>(null);
const showModal = ref(false);
const cityToDelete = ref<WeatherData | null>(null);

onMounted(() => {
  const favoriteData = localStorage.getItem("FAVORITE_DATA");
  if (favoriteData) {
    favoriteCities.value = JSON.parse(favoriteData);
  }
});

// Метод для відкриття модального вікна та збереження міста, яке користувач хоче видалити
const showConfirmationModal = (city: WeatherData) => {
  console.log(city.name);

  cityToDelete.value = city;
  showModal.value = true;
};

// Метод для закриття модального вікна
const hideConfirmationModal = () => {
  cityToDelete.value = null;
  showModal.value = false;
};

const removeData = (city: WeatherData) => {
  console.log(city);

  const result = (favoriteCities.value = favoriteCities.value!.filter(
    (item) => item.name !== city.name
  ));
  console.log(result);
  isAdded(city);
  localStorage.setItem("FAVORITE_DATA", JSON.stringify(favoriteCities.value));
  hideConfirmationModal();
  console.log("Data removed from favoriteCities:", favoriteCities.value);
};

const isAdded = (data: WeatherData) => {
  const workspaceData = localStorage.getItem("WORKSPACE_DATA");
  const LSData = JSON.parse(workspaceData ?? "[]");

  for (const city of LSData) {
    if (city.name === data.name) {
      city.isFavorite = false;

      break; // Місто знайдено, вийдіть з циклу, щоб оновити тільки перше збігове місто
    }
  }
  localStorage.setItem("WORKSPACE_DATA", JSON.stringify(LSData));
};
</script>

<template>
  <p>FAVORITE PAGE</p>
  <div v-for="el in favoriteCities" :key="el.name">
    <FavoriteCard :cardData="el" :hideButton="false">
      <template #one-day>
        <button>One day weather</button>
      </template>
      <template #five-days>
        <button>Five days weather</button>
      </template>
      <template #remove-favorite>
        <button @click="showConfirmationModal(el)">Remove from favorite</button>
      </template>
    </FavoriteCard>
    <Chart :tempData="el.tempData" :name="el.name" />
  </div>

  <Modal
    v-if="showModal && cityToDelete"
    @confirm="removeData(cityToDelete)"
    @cancel="hideConfirmationModal"
  />
</template>

<style></style>
