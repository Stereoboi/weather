<script setup lang="ts">
import { ref } from "vue";
import Input from "../components/Input.vue";
import Modal from "../components/Modal.vue";
import { weatherFetch } from "../helpers/weatherFetch";
import { WeatherData } from "../../types/weatherFetch";
import Card from "../components/Card.vue";
import { onMounted } from "vue";

const cardData = ref<WeatherData | null>(null);
const isDataLoaded = ref(false);
const showModal = ref(false);
const cityToDelete = ref<WeatherData | null>(null);
const chosenCities = ref<WeatherData[]>([]);
const favoriteCities = ref<WeatherData[]>([]);

onMounted(() => {
  const workspaceData = localStorage.getItem("WORKSPACE_DATA");
  const favoriteData = localStorage.getItem("FAVORITE_DATA");
  if (favoriteData) {
    favoriteCities.value = JSON.parse(favoriteData);
  }
  if (workspaceData) {
    chosenCities.value = JSON.parse(workspaceData);
  }
});

// Метод для відкриття модального вікна та збереження міста, яке користувач хоче видалити
const showConfirmationModal = (city: WeatherData) => {
  cityToDelete.value = city;
  showModal.value = true;
};

// Метод для закриття модального вікна
const hideConfirmationModal = () => {
  cityToDelete.value = null;
  showModal.value = false;
};

const findCity = async (city: string) => {
  const result = await weatherFetch(city);
  cardData.value = result;
  isDataLoaded.value = true;
};
// const addDataToWorkspace = () => {
//   if (cardData.value && chosenCities.value.length <= 4) {
//     if (chosenCities.value.includes(cardData.value)) {
//       alert("alredy exist");
//       return;
//     }
//     chosenCities.value.push(cardData.value);
//     localStorage.setItem("WORKSPACE_DATA", JSON.stringify(chosenCities.value));
//     console.log("Data added to chosenCities:", chosenCities.value);
//   }
// };

const addDataToWorkspace = () => {
  if (cardData.value && chosenCities.value.length <= 4) {
    const cityExists = chosenCities.value.some(
      (city) => city && city.name === cardData.value!.name
    );

    if (cityExists) {
      alert("City already exists in workspace");
      return;
    }

    chosenCities.value.push(cardData.value);
    localStorage.setItem("WORKSPACE_DATA", JSON.stringify(chosenCities.value));
    console.log("Data added to chosenCities:", chosenCities.value);
  }
};

// const addToFavorite = (data: WeatherData) => {
//   console.log(favoriteCities.value);

//   if (favoriteCities.value.length <= 4) {
//     if (favoriteCities.value.includes(data)) {
//       alert("alredy exist");

//       return;
//     }
//     favoriteCities.value.push(data);
//     localStorage.setItem("FAVORITE_DATA", JSON.stringify(favoriteCities.value));
//     console.log("Data added to chosenCities:", favoriteCities.value);
//   }
// };

const addToFavorite = (data: WeatherData) => {
  if (favoriteCities.value.length <= 4) {
    const cityExists = favoriteCities.value.some(
      (city) => city.name === data.name
    );

    if (cityExists) {
      alert("City already exists in favorites");
      return;
    }

    favoriteCities.value.push(data);
    localStorage.setItem("FAVORITE_DATA", JSON.stringify(favoriteCities.value));
    console.log("Data added to favoriteCities:", favoriteCities.value);
  }
};
const removeData = (city: WeatherData) => {
  chosenCities.value = chosenCities.value.filter(
    (item) => item.name !== city.name
  );
  localStorage.setItem("WORKSPACE_DATA", JSON.stringify(chosenCities.value));
  hideConfirmationModal();
  console.log("Data removed from chosenCities:", chosenCities.value);
};
</script>

<template>
  <div>
    <h1>HOME PAGE</h1>
    <Input @findCity="findCity" />

    <div v-if="isDataLoaded && cardData">
      <Card :cardData="cardData" :hideButton="false">
        <template #add-button>
          <button @click="addDataToWorkspace">Add to workspace</button>
        </template>
        <template #make-favorite>
          <button @click="addToFavorite(cardData)">Add to favorite</button>
        </template>
      </Card>
    </div>
    <p v-else-if="isDataLoaded">Sorry, no data available.</p>
  </div>
  <div v-if="chosenCities.length > 0" class="wrapper">
    <h2>Chosen Cities</h2>
    <div v-for="city in chosenCities" :key="city.name">
      <Card :cardData="city" :hideButton="true">
        <template #remove-workspace>
          <button @click="showConfirmationModal(city)">
            remove from workspace
          </button>
        </template>
        <template #make-favorite-ws>
          <button @click="addToFavorite(city)">Add to favorite</button>
        </template>
      </Card>
    </div>
  </div>

  <Modal
    v-if="showModal && cityToDelete"
    @confirm="removeData(cityToDelete)"
    @cancel="hideConfirmationModal"
  />
</template>

<style>
.wrapper {
  display: flex;
}
</style>
