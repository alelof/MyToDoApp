<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user.js'
import { useTaskStore } from '../stores/tasks.js'
import { reactive } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const taskStore = useTaskStore()
const { tasks, errors } = storeToRefs(taskStore)
let errorsToNull = reactive(errors)
let tasksToNull = reactive(tasks)

const letMeOut = async () => {
  try {
    await userStore.signOut()
    await router.push("/auth")
    errorsToNull.value = null //Deleting errors when sign signOut
    tasksToNull.value = null
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div id="myBgColor" class="px-3 py-2 text-white">
    <div class="container d-flex align-items-center just justify-content-between justify-content-lg-start">
      <a href="/dashboard" class="align-items-center my-lg-0 me-lg-auto text-white">
        <img src="../assets/logoHeader.png" alt="">
      </a>
      <button type="button" id="signOutBtn" class="btn btn-light me-2" @click.prevent="letMeOut">Sign out</button>
    </div>
  </div>

  <div class="px-3 py-2 border-bottom ">
    <div class="container d-flex flex-wrap justify-content-center">
      <div class="lead">Hi <span class="font-weight-bold">{{ user.email }} </span>, welcome to your dashboard</div>
    </div>
  </div>
</template>

<style scoped>
#myBgColor {
  background-color: #1C2541;
}

#signOutBtn {
  font-size: 0.8rem;
}
</style>