<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const email = ref('');
const password = ref('');

let email2 = ref('');
let password2 = ref('');

console.log('email:', email.value)


const handleSignIn = async () => {
  console.log("sign In -  click en boton!!!!")
  try {
    console.log('email2: ', email2)
    console.log('pass2: ', password2)
    await userStore.signIn(email2.value, password2.value);
    if (!user.value) {
      // how to reset the fieldss?!?!?!
      router.push({ path: '/auth' });
      
    } else {
      // continue to dashboard
      router.push({ path: '/dashboard' });
    }
  } catch (e) {
    alert(e);
    console.log(e);
  }
}


const handleSignUp = async () => {
  console.log("sign UP - click en boton!!!!")
  try {
    await userStore.signUp(email.value, password.value);
    alert("Thanks for registering. Check your mail and come back!")
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
}


</script>



<template>
  <!--
  <div>
    <h1>sign Up</h1>
    <form @submit.prevent="handleSignUp">
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
-->
  <div>
    <h1>Or sign IN</h1>
    <form id="sIn" @submit.prevent="handleSignIn">
      <div>
        <label for="email2">Email</label>
        <input id="email2" type="email" placeholder="Your email" v-model="email2" />
      </div>
      <div>
        <label for="password2">Password</label>
        <input id="password2" type="password" v-model="password2" />
      </div>
      <div>
        <button type="submit">Log in</button>
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
