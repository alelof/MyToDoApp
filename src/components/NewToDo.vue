<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { useTaskStore } from '../stores/tasks.js'

let open = ref(false)

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

/********** como lo del user store */
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
    console.log("Llamando a createtask, pasando el objeto ", newTask);
    await taskStore.fetchTasks();
    title.value = '';
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
}

</script>

<template>
  <div>
        <h2>Create Task</h2>
        <form @submit.prevent="createNew">
          <div>
            <label for="task">Add a to do: </label>
            <input id="title" type="textarea" v-model="title" placeholder="E.g. Feed the cat" />
            <button type="submit" > Add </button>
          </div>
        </form>
      </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: azure;
}
</style>