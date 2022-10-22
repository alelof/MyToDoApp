<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { useTaskStore } from '../stores/tasks.js'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const title = ref('');

const createNew = async () => {

const newTask = {
    user_id: user.value.id,
    title: title,
    is_complete: false,
    inserted_at: new Date(),
  }

  try {
    await taskStore.createTask(newTask);
    await taskStore.fetchTasks();
    title.value = '';
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
}

</script>

<template>
  <div class="mt-3 mb-4">
    <div class="d-flex flex-wrap justify-content-start align-items-baseline">
      <form @submit.prevent="createNew">
        <label class="text me-3" for="task">Create new task </label>
        <input id="title" type="textarea" class="form-control w-auto d-inline" v-model="title" placeholder="E.g. Feed the cat" />
        <button type="submit" class="ms-3 btn btn-outline-primary"> Create </button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>