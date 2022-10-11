
  
  <script>
  import { ref } from "vue";
  import { supabase } from "../supabase";

  import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '../stores/user.js'
  
  const router = useRouter()
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  /*
  export default {
    setup() {
      const email = ref("");
      const password = ref("");
  
      const handleSignup = async () => {
        try {
          // Use the Supabase provided method to handle the signup
          const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          });
          if (error) throw error;
        } catch (error) {
          alert(error.error_description || error.message);
        }
      };
  
      return {
        email,
        password,
        handleSignup,
      };
    },
  };
*/
  </script>

<template>
  <div>
    <h2>Sign up for an account</h2>
    <!-- <form @submit.prevent="handleSignup"> -->
      <form>  
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div>
        <button type="submit">Sign up</button>
      </div>
    </form>
  </div>
</template>