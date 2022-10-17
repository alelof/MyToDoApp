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

console.log('email:', email.value)

const handleSignUp = async () => {
  console.log("sign UP - click en boton!!!!")
  try {
    await userStore.signUp(email.value, password.value);
    alert("Thanks for registering. Check your mail and come back!");
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
};
</script>

<template>
  <div>
    <h2>Sign up for an account</h2>
    <form @submit.prevent="handleSignUp">
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