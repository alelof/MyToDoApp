<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user.js'
import Footer from './components/Footer.vue';

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' }); //antes /auth
      console.log("no estás logeado");
      console.log(user.value);
    } else {
      // continue to dashboard
      router.push({ path: '/dashboard' });
      console.log("estás logeado");
      console.log(user.value);
    }
  } catch (e) {
    console.log(e);
  }
});

</script>
  
<template>
    <div class="app-main">
      <router-view /> <!-- your routes will load inside of these tags -->
    </div>
</template>
  
<style scoped>
.app-main{
  height: 100vh;
}
</style>