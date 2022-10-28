<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<template>
  <Header></Header>
  <main>
    <router-view />
  </main>
  <Footer></Footer>
</template>
