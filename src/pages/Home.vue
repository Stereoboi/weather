<script setup lang="ts">
// import { ref } from "vue";
import Input from "../components/Input.vue";
import { weatherFetch } from "../helpers/weatherFetch";

const findCity = async (city: string) => {
  const result = await weatherFetch(city);
  console.log(result);
};
</script>

<template>
  <h1>HOME PAGE</h1>
  <Input @findCity="findCity" />
</template>

<style></style>
