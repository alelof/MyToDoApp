<!--<script>
  /*
  import { ref } from "vue";
  import SignUp from "./SignUp.vue";
  import SignIn from "./SignIn.vue";
  export default {
    components: { SignUp, SignIn },
    setup() {
      const isSignUp = ref(true);
  
      return {
        isSignUp,
      };
    },
  };

*/
</script> -->

<script>

import { ref } from 'vue';
import { supabase } from '../supabase';
import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '../stores/user.js'
  
  //const router = useRouter()
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  export default {
    setup() {
      const email = ref('');
      const password = ref('');
    
      console.log('email:',email.value)
      

      const handleIt = async () => {
        console.log("clicke en boton!!!!")
        try {
          await userStore.signUp(email.value,password.value);
          //aqui poner un validador
        } catch (e) {
          
          console.log(e);
        } 
      }


    return {
        email,
        password,
        handleIt,
      };
    },
  };

</script>

<template>
  <div>
    <h1>sign Up</h1>
    <form @submit.prevent="handleIt">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" placeholder="Your email" v-model="email" />
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

      <!--
    <div>
      <h1>No estas loggeado</h1>
      <sign-up v-if="isSignUp" />
      <sign-in v-else />
      <button @click="isSignUp = !isSignUp">
        {{
          isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account yet? Sign Up"
        }}
      </button>
    </div>
    -->
</template>

<style>

</style>
