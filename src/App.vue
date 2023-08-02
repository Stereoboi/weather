<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <notifications />
  <div class="container">
    <Navbar />
  </div>
</template>

<style scoped>
.container {
  min-width: 360px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: transparent;

  padding: 0 1rem 0 1rem;
  @media only screen and (min-width: 1024px) {
    padding: 0 5rem 0 5rem;
  }
}
</style>
