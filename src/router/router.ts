import Home from "../pages/Home.vue";
import Favorite from "../pages/Favorite.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/favorite", name: "Favorite", component: Favorite },

  // Додайте інші роути, які вам потрібні
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
