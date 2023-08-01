<script setup lang="ts">
import { ref } from "vue";
import Input from "../components/Input.vue";
import Modal from "../components/Modal.vue";
import Chart from "../components/Chart.vue";
import { weatherFetch, dailyTempFetch } from "../helpers/weatherFetch";
import { WeatherData, WeatherItem } from "../../types/weatherFetch";
import Card from "../components/Card.vue";

import { onMounted } from "vue";

// import Chart from "../components/Chart.vue";

const cardData = ref<WeatherData | null>(null);
const tempData = ref<WeatherItem[]>([]);
const isDataLoaded = ref(false);
const showModal = ref(false);
const cityToDelete = ref<WeatherData | null>(null);
const workspaceCities = ref<WeatherData[]>([]);
const favoriteCities = ref<WeatherData[]>([]);

onMounted(() => {
  const workspaceData = localStorage.getItem("WORKSPACE_DATA");
  const favoriteData = localStorage.getItem("FAVORITE_DATA");
  if (favoriteData) {
    favoriteCities.value = JSON.parse(favoriteData);
  }
  if (workspaceData) {
    workspaceCities.value = JSON.parse(workspaceData);
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

// запит до АРІ для отримання погодних даних
const findCity = async (city: string) => {
  const result = await weatherFetch(city);
  const resultTemp = await dailyTempFetch(city);
  // moment(resultTemp.list[0].dt).format("MMM Do YY");
  // console.log(moment.unix(resultTemp.list[2].dt).format("Do , h"));
  // console.log(resultTemp);

  cardData.value = result;
  tempData.value = resultTemp.list.slice(0, 8);
  isDataLoaded.value = true;
};
// функція додавання погодної картки до робочого середовища
const addDataToWorkspace = () => {
  if (cardData.value && workspaceCities.value.length <= 4) {
    const cityExists = workspaceCities.value.some(
      (city) => city && city.name === cardData.value!.name
    );

    if (cityExists) {
      alert("City already exists in workspace");
      return;
    }

    isFavorite(cardData.value);
    cardData.value.tempData = tempData.value;
    // console.log(cardData.value);
    workspaceCities.value.push(cardData.value);
    localStorage.setItem(
      "WORKSPACE_DATA",
      JSON.stringify(workspaceCities.value)
    );
    // console.log("Data added to workspaceCities:", workspaceCities.value);
  }
};

/*
isFavorite - ця функція використовується
для перевірки того чи є обране місто додане в категорію улюблених.
Для того щоб була змога відображати правильний стан кнопки.
логіка наступна :
1-якщо користувач додає місто вперше то favoriteCities.value буде пустим масивом,
а отже картка створиться в workspace із неактивними значеннями кнопок і isFavorite буде відсутнім.
2-якщо користувач додав місто до колекції favorite але видалив її з workspace та потім знову додає
те ж саме місто до workspace то функція isFavorite провіряє чи в колекції favorite присутнє це місто
 і якщо так воно і є то ми записуємо значення isFavorite = true; в об'єк із даними про це місто,
 що дозволяє відобразити кнопку в правильному доданому стані і запобігти повторного додавання міста
*/

const isFavorite = (data: WeatherData) => {
  // console.log(favoriteCities.value);

  for (const city of favoriteCities.value) {
    if (city.name === data.name) {
      data.isFavorite = true;
      break; // Місто знайдено, виходимо з циклу, щоб оновити лиш перше місто
    }
  }
  // localStorage.setItem("WORKSPACE_DATA", JSON.stringify(favoriteCities.value));
};

const addToFavorite = (data: WeatherData) => {
  if (favoriteCities.value.length <= 4) {
    const cityExists = favoriteCities.value.some(
      (city) => city.name === data.name
    );

    if (cityExists) {
      alert("City already exists in favorites");
      return;
    }

    if (!data.tempData) {
      data.tempData = tempData.value;
    }
    data.isFavorite = true;

    isAdded(data);
    favoriteCities.value.push(data);
    localStorage.setItem("FAVORITE_DATA", JSON.stringify(favoriteCities.value));
    // console.log("Data added to favoriteCities:", favoriteCities.value);
  }
};

/*
isAdded - ця функція використовується
для перевірки того чи є обране місто додане в категорію робочого середовища(workspace).
Для того щоб була змога відображати правильний стан кнопки.
логіка наступна :
1- при додаванні міста в улюблені ми провіряємо колекцію workspace для того
щоб додати до об'єкту із данимим isFavorite = true; щоб на робочому середовищі( workspace)
кнопки відображали стан погодної картки
*/

const isAdded = (data: WeatherData) => {
  // console.log(workspaceCities.value);

  for (const city of workspaceCities.value) {
    if (city.name === data.name) {
      city.isFavorite = true;

      break; // Місто знайдено, вийдіть з циклу, щоб оновити тільки перше місто
    }
  }
  localStorage.setItem("WORKSPACE_DATA", JSON.stringify(workspaceCities.value));
};

const removeData = (city: WeatherData) => {
  workspaceCities.value = workspaceCities.value.filter(
    (item) => item.name !== city.name
  );
  localStorage.setItem("WORKSPACE_DATA", JSON.stringify(workspaceCities.value));
  hideConfirmationModal();
  // console.log("Data removed from workspaceCities:", workspaceCities.value);
};
</script>

<template>
  <div>
    <Input @findCity="findCity" />
    <div v-if="isDataLoaded && cardData" class="search-card-wrapper">
      <Card :cardData="cardData" :hideButton="false">
        <template #add-button>
          <button @click="addDataToWorkspace" class="workspace-btn">
            To workspace
          </button>
        </template>
        <template #make-favorite>
          <button @click="addToFavorite(cardData)" class="favorite-btn">
            To favorite
          </button>
        </template>
      </Card>
    </div>
    <p v-else-if="isDataLoaded">Sorry, no data available.</p>
  </div>
  <div v-if="workspaceCities.length > 0">
    <h2 class="title">Workspace</h2>
    <div class="workspace-wrapper">
      <div v-for="city in workspaceCities" :key="city.name">
        <div class="workspace-card-wrapper">
          <Card :cardData="city" :hideButton="true">
            <template #remove-workspace>
              <button
                @click="showConfirmationModal(city)"
                class="workspace-btn"
              >
                Remove
              </button>
            </template>
            <template #make-favorite-ws>
              <button
                v-if="!city.isFavorite"
                @click="addToFavorite(city)"
                class="favorite-btn"
              >
                Add to favorite
              </button>
              <span v-else class="favorite-msg">Added to favorite</span>
            </template>
          </Card>
          <Chart :tempData="city.tempData" :name="city.name" />
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
.search-card-wrapper {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  color: white;
  padding: 25px;
  background-color: rgb(80, 96, 121);
  border-radius: 8px;
  max-width: 500px;
}

.workspace-wrapper {
  margin-top: 30px;
  margin-bottom: 30px;

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

.workspace-btn {
  color: #ffffff;
  background-color: rgb(47, 60, 79);
}

.workspace-btn:hover {
  background-color: rgb(27, 35, 48);
}

.favorite-btn {
  background-color: rgb(47, 60, 79);
  color: #ffffff;
}

.favorite-btn:hover {
  background-color: rgb(27, 35, 48);
}

.favorite-msg {
  color: rgba(75, 192, 192, 1);
  background-color: rgb(47, 60, 79);
  padding: 10px;
  border-radius: 8px;
}
</style>
