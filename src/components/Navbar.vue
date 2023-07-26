<script setup lang="ts"></script>

<template>
  <div class="navbar">
    <p>Weather</p>
    <nav>
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Favorite' }">Favorite</router-link>
    </nav>
  </div>
  <router-view></router-view>
</template>

<style>
.navbar {
  display: flex;
  align-items: center;
}
</style>
