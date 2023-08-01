<template>
  <div class="navbar-container">
    <nav class="navbar">
      <a href="/" class="logo">Weather</a>
      <router-link
        :to="{ name: 'Home' }"
        class="link"
        :class="{ 'active-link': $route.name === 'Home' }"
      >
        Home
      </router-link>
      <router-link
        :to="{ name: 'Favorite' }"
        class="link"
        :class="{ 'active-link': $route.name === 'Favorite' }"
      >
        Favorite
      </router-link>
    </nav>
  </div>
  <router-view></router-view>
</template>

<style>
.link {
  text-decoration: none;
  padding: 5px;
  cursor: pointer;
  color: black;
}

.link:last-child {
  margin-left: 21px;
}

.active-link {
  background-color: rgb(47, 60, 79);
  color: white;
  border-radius: 8px;
}

.logo {
  text-decoration: none;
  color: rgb(47, 60, 79);
  font-family: "Cherry Bomb One", cursive;
  font-size: 30px;
  padding: 10px;
  width: 75%;
  margin: 0;
  /* cursor: pointer; */
}

.navbar-container {
}

.navbar {
  display: flex;
  align-items: center;
}
</style>
