<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useUserStore } from '../stores/user.js'

const userStore = useUserStore()

const email = ref('')
const password = ref('')

//Displaying errors in banner
let isError = ref(false)
const showError = computed({
  set: (value) => {
    isError.value = value
  }
})

//Signin up
const handleSignUp = async () => {
  try {
    if (email.value) {
      await userStore.signUp(email.value, password.value)
      alert("Thanks for registering. Check your mail and come back!")
    }
    else {
      showError.value = true
    }
  } catch (e) {
    console.log(e)
  }
};
</script>

<template>
  <main class="form-signin w-100 mx-auto">
    <!-- Sign up form-->
    <img class="logo mb-4" src="../assets/logo.png" alt="">
    <h1 class="h3 mb-3 fw-normal">Create an account</h1>
    <form @submit.prevent="handleSignUp">
      <div class="form-floating">
        <input type="email" id="email" class="form-control" placeholder="name@example.com" v-model="email">
        <label for="email">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" id="password" class="form-control" placeholder="Password" v-model="password" />
        <label for="password">Password</label>
      </div>
      <div>
        <button type="submit" class="w-100 mt-3 btn btn-lg btn-primary myBtn">Create account</button>
      </div>
    </form>

    <!-- Error banner-->
    <div class="alert alert-danger alert-dismissible fade show mt-2" role="alert" v-if="isError">
      <strong> Error. </strong> Please provide an email.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
        @click="isError = !isError"></button>
    </div>
  </main>
</template>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
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

.logo {
  width: 90%;
}

.myBtn {
  background-color: #4d67b4;
  border-color: #4d67b4;

}

.myBtn:hover {
  background-color: #1C2541;
  border-color: #1C2541;
}
</style>