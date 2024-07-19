<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
.p-button {
  color: black;
}

.p-button-outlined {
  color: black;

}
</style>
<style>
.rating-div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.p-card-body {
  width: 100%;
}

.p-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.p-card-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.p-tablist-tab-list {
  justify-content: space-evenly;
}

@media (max-width: 575px) {
  .p-card-body {
    padding: 5px;
    width: 100%;
  }

  .p-tablist-tab-list {
    justify-content: space-between;
  }
}
</style>
<!-- <div class="wrapper">
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
</div> -->