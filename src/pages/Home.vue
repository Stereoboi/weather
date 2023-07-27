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

onMounted(() => {
  const workspaceData = localStorage.getItem("WORKSPACE_DATA");

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
const addData = () => {
  if (cardData.value && chosenCities.value.length <= 4) {
    if (chosenCities.value.includes(cardData.value)) {
      alert("alredy exist");
      return;
    }
    chosenCities.value.push(cardData.value);
    localStorage.setItem("WORKSPACE_DATA", JSON.stringify(chosenCities.value));
    console.log("Data added to chosenCities:", chosenCities.value);
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
          <button @click="addData">Add to workspace</button>
        </template>
        <template #make-favorite>
          <button>Add to favorite</button>
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
          <button>Add to favorite</button>
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
