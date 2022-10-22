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
  <form class="mt-3 mb-4" @submit.prevent="createNew">
    <div class="d-flex flex-row flex-wrap justify-content-start align-items-baseline">
      <span class="fs-6 text me-3" for="task">New task </span>
      <input id="title" type="textarea" class="form-control w-auto" v-model="title" placeholder="E.g. Feed the cat" />
      <button id="myCreateBtn" type="submit" class="ms-3 btn btn-warning"> Create </button>
    </div>
  </form>
</template>

<style scoped>
#myCreateBtn {
  background-color: #e9c46a;
  border-color: #e9c46a;
}

#myCreateBtn:hover {
  background-color: #dfa926;
}
</style>



}

.buttonClass:hover {
  
}
              