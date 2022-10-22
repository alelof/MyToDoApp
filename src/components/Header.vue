<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const letMeOut = async () => {
  try {
    await userStore.signOut();
    await router.push("/auth");
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <div class="px-3 py-2 bg-dark text-white">
    <div class="container d-flex align-items-center just justify-content-between justify-content-lg-start">
      <a href="/dashboard" class="align-items-center my-lg-0 me-lg-auto text-white">LOGO
      </a>
      <button type="button" class="btn btn-light text-dark me-2" @click.prevent="letMeOut">Sign out</button>
    </div>
  </div>

  <div class="px-3 py-2 border-bottom ">
    <div class="container d-flex flex-wrap justify-content-center">
      <div class="lead">Hi <span class="font-weight-bold">{{user.email}} </span>, welcome to your dashboard</div>
    </div>
  </div>
</template>