<template>
  <header>
    <Navbar/>
  </header>
  <CategoryOptions/>
  <MainContainer/>
  <footer>
    <Footer></Footer>
  </footer>
</template>

<script setup>
import Navbar from '@/components/NavBar.vue'
import MainContainer from '@/components/MainContainer.vue'
import Footer from '@/components/Footer.vue'
import CategoryOptions from '@/components/CategoryOptions.vue'
</script>
