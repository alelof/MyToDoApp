<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user.js'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  try {
    // Call to fetch user
    await userStore.fetchUser()
    if (!user.value) {
      // Not logged user. Redirect them to Log in page
      router.push({ path: '/auth' })
    } else {
      // Logged user. Redirect their dashboard
      router.push({ path: '/dashboard' })
    }
  } catch (e) {
    console.log(e)
  }
});
</script>
  
<template>
  <div class="app-main">
    <router-view /> <!-- Your routes will load inside of these tags -->
  </div>
</template>
  
<style scoped>
.app-main {
  height: 100vh;
}
</style>