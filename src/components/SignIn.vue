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

const handleSignIn = async () => {
  try {
    await userStore.signIn(email.value, password.value);
    if (!user.value) {
      email.value = '';
      password.value = '';
      router.push({ path: '/auth' });
    } else {
      router.push({ path: '/dashboard' });
    }
  } catch (e) {
    alert(e);
    console.log(e);
  }
}
</script>

<template>
  <main class="form-signin w-100 mx-auto">
    <img class="mb-4" src="../assets/edit.png" alt="" width="72" height="57">
    <h1 class="h3 mb-3 fw-normal">Please log in</h1>
    <form @submit.prevent="handleSignIn">
      <div class="form-floating">
        <input type="email" id="email" class="form-control" placeholder="name@example.com" v-model="email">
        <label for="email">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" id="password" class="form-control" placeholder="Password" v-model="password" />
        <label for="password">Password</label>
      </div>
      <div>
        <button type="submit" class="w-100 mt-3 btn btn-lg btn-primary">Log in</button>
      </div>
    </form>
  </main>
</template>

<style>
.form-signin {
  max-width: 330px;
  padding: 15px;
  ;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>