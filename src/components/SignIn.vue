<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const email = ref('');
const password = ref('');

console.log('email:', email.value)

const handleSignIn = async () => {
  console.log("sign In -  click en boton!!!!")
  try {
    console.log('email: ', email)
    console.log('pass: ', password)
    await userStore.signIn(email.value, password.value);
    if (!user.value) {
      // how to reset the fieldss?!?!?!
      router.push({ path: '/' }); //antes /auth

    } else {
      // continue to dashboard
      router.push({ path: '/dashboard' });
    }
  } catch (e) {
    alert(e);
    console.log(e);
  }
}
</script>

<template>
  <div>
    <h2>Sign in to your account</h2>
    <form @submit.prevent="handleSignIn">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div>
        <button type="submit">Log in</button>
      </div>
    </form>
  </div>
</template>