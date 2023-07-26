<script setup lang="ts">
import { ref } from "vue";
const message = ref("");
const emit = defineEmits(["findCity"]);
const handleSubmit = (city: string) => {
  emit("findCity", city);

  message.value = "";
};
</script>

<template>
  <input v-model.trim="message" type="text" placeholder="type smth" />
  <button @click="handleSubmit(message)">Find</button>
</template>

<style></style>
