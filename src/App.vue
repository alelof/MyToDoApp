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
    <section>
      <h1>I'm in app.vue</h1>
      <div>
      <router-view  /> <!-- class="app-main" your routes will load inside of these tags -->    
    </div>
    </section>
  </template>
  