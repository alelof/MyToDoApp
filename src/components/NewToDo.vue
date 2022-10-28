<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { onMounted } from 'vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user.js'
import { useTaskStore } from '../stores/tasks.js'
import ModalWait from './ModalWait.vue'

//User store
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

//Task store
const taskStore = useTaskStore()

//Displaying errors in banner
const { errors } = storeToRefs(taskStore)
let errorMsg = reactive(errors)
let isError = ref(false)
onMounted(async () => {
  errorMsg.value = null
});
const showError = computed({
  set: (value) => {
    isError.value = value
  }
})

//Showing waiting animation
let loading = ref(false)
const triggerModal = computed({
  set: (value) => {
    loading.value = value
  }
})

//Creating new task
const title = ref('')

const createNew = async () => {

  const newTask = {
    user_id: user.value.id,
    title: title,
    is_complete: false,
    inserted_at: new Date(),
  }
  try {
    triggerModal.value = true
    await taskStore.createTask(newTask)
    await taskStore.fetchTasks()
    triggerModal.value = false
    title.value = ''
    if (errorMsg.value != null) {
      showError.value = true
    }
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <form class="mt-3 mb-4" @submit.prevent="createNew">
    <div class="d-flex flex-row flex-wrap justify-content-start align-items-baseline">
      <span id="taskLabel" class="my-2 fs-6 text me-3" for="task">New task </span>
      <input id="title" type="textarea" class="my-2 me-3 form-control w-auto" v-model="title"
        placeholder="E.g. Feed the cat" />
      <button id="myCreateBtn" type="submit" class="my-2 btn btn-warning"> Create </button>
    </div>
  </form>

  <!-- Error banner-->
  <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="isError">
    <strong> {{ errorMsg }} </strong> Task should be at least 4 characters long.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
      @click="isError = !isError"></button>
  </div>

  <!-- Waiting animation -->
  <ModalWait v-if="loading"></ModalWait>
</template>

<style scoped>
#myCreateBtn {
  background-color: #e9c46a;
  border-color: #e9c46a;
}

#myCreateBtn:hover {
  background-color: #dfa926;
}

@media only screen and (max-width: 510px) {
  #taskLabel {
    display: none;
  }
}
</style>


