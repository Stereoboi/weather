<script setup lang="ts">
import { onMounted, ref } from "vue";
import { WeatherData } from "../../types/weatherFetch";
import FavoriteCard from "../components/FavoriteCard.vue";
import Modal from "../components/Modal.vue";
import Chart from "../components/Chart.vue";
import { dailyTempFetch } from "../helpers/weatherFetch";

const favoriteCities = ref<WeatherData[] | null>(null);
const showModal = ref(false);
const cityToDelete = ref<WeatherData | null>(null);
const weeklyTemp = ref<{ [key: string]: WeatherData[] | null }>({});

onMounted(() => {
  const favoriteData = localStorage.getItem("FAVORITE_DATA");
  if (favoriteData) {
    favoriteCities.value = JSON.parse(favoriteData);
  }
});

// Метод для відкриття модального вікна та збереження міста, яке користувач хоче видалити
const showConfirmationModal = (city: WeatherData) => {
  // console.log(city.name);

  cityToDelete.value = city;
  showModal.value = true;
};

// Метод для закриття модального вікна
const hideConfirmationModal = () => {
  cityToDelete.value = null;
  showModal.value = false;
};

const removeData = (city: WeatherData) => {
  // console.log(city);

  favoriteCities.value = favoriteCities.value!.filter(
    (item) => item.name !== city.name
  );

  isAdded(city);
  localStorage.setItem("FAVORITE_DATA", JSON.stringify(favoriteCities.value));
  hideConfirmationModal();
  // console.log("Data removed from favoriteCities:", favoriteCities.value);
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

const fiveDaysWeather = async (name: string) => {
  const fiveDaysData = await dailyTempFetch(name);
  console.log(fiveDaysData);

  let indices = [0, 8, 16, 24, 32, 39];
  const filteredData = fiveDaysData.list.filter(
    (_: WeatherData, index: number) => indices.includes(index)
  );

  weeklyTemp.value = {
    ...weeklyTemp.value,
    [name]: filteredData,
  };
};

const oneDaysWeather = (name: string) => {
  weeklyTemp.value = {
    ...weeklyTemp.value,
    [name]: null,
  };
};
</script>

<template>
  <h2 class="title">Favorite cities</h2>
  <div class="workspace-wrapper">
    <div v-for="el in favoriteCities" :key="el.name">
      <div class="workspace-card-wrapper">
        <FavoriteCard :cardData="el" :hideButton="false">
          <template #one-day>
            <button @click="oneDaysWeather(el.name)" class="favorite-btn">
              One day weather
            </button>
          </template>
          <template #five-days>
            <button @click="fiveDaysWeather(el.name)" class="favorite-btn">
              Five days weather
            </button>
          </template>
          <template #remove-favorite>
            <button @click="showConfirmationModal(el)" class="favorite-btn">
              Remove from favorite
            </button>
          </template>
        </FavoriteCard>
        <div v-if="!weeklyTemp[el.name]">
          <Chart :tempData="el.tempData" :name="el.name" />
        </div>
        <div v-else>
          <Chart :tempData="weeklyTemp[el.name]" :name="el.name" />
        </div>
      </div>
    </div>
  </div>

  <Modal
    v-if="showModal && cityToDelete"
    @confirm="removeData(cityToDelete)"
    @cancel="hideConfirmationModal"
  />
</template>

<style>
.title {
  text-align: center;
  color: rgb(30, 37, 49);
}

.workspace-wrapper {
  margin-top: 30px;

  @media only screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1px;
    grid-row-gap: 1em;
  }
}

.workspace-card-wrapper {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  color: white;
  padding: 25px;
  background-color: rgb(80, 96, 121);
  border-radius: 8px;
  max-width: 500px;
  @media only screen and (min-width: 1024px) {
    margin-bottom: 0px;
  }
}

/* Загальні стилі кнопок */
button {
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgb(80, 96, 121);
  color: white;
}

button:hover {
  background-color: rgb(47, 60, 79);
}

.favorite-btn {
  color: #ffffff;
  background-color: rgb(47, 60, 79);
}

.favorite-btn:not(:last-child) {
  margin-right: 3px;
}

.favorite-btn:hover {
  background-color: rgb(27, 35, 48);
}
</style>
