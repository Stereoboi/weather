import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import Notifications from "@kyvg/vue3-notification";

// 1. Імпортуємо необхідні частини бібліотеки Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faWind,
  faCloud,
  faDroplet,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

// 2. Додаємо іконки до бібліотеки
library.add(faWind, faCloud, faDroplet, faLocationDot);

// 3. Створюємо інстанс додатку та встановлюємо компонент font-awesome-icon
const app = createApp(App);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon); // Підключаємо компонент
app.use(Notifications);
app.mount("#app");
