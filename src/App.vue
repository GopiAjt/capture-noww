<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
header {
  top: 0%;
  position: sticky;
  z-index: 1;
}

header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.266);
  filter: blur(10px);
  /* blur the background image */
  z-index: -1;
  /* move pseudo-element behind content */
}


.p-button {
  position: initial;
}

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

.p-tabpanels {
  padding: 4% 0%;
}

.p-panel {
  margin: 3% 1%;
}

.p-tablist {
  /* top: 9%; */
  position: sticky;
}

@media (max-width: 575px) {
  .p-card-body {
    padding: 5px;
    width: 100%;
  }

  .p-tablist-tab-list {
    justify-content: space-between;
    width: 100%;
  }
}
</style>
<!-- <div class="wrapper">
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
</div> -->