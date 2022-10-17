<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { useTaskStore } from '../stores/tasks.js'
import { reactive } from 'vue'
import NewToDo from './NewToDo.vue'
import EditToDo from './EditToDo.vue'
import Card from './Card.vue';

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

/********** como lo del user store */
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

let taskList = reactive(tasks);
let show = ref(false);

const letMeOut = async () => {
  try {
    await userStore.signOut();
    await router.push("/auth"); //antes push a /auth
    //aqui poner un validador
  } catch (e) {
    console.log(e);
  }
}

/*
const modifyTask = async (taskId, title) => {
    try {
        show = true;
        //await taskStore.deleteTask(taskId);
        console.log("Llamando a modifyTask: pasando param: ", taskId, title);
        //await taskStore.fetchTasks();
    } catch (e) {
        console.log(e);
    }
}
*/

onMounted(async () => {
  try {
    await taskStore.fetchTasks(); // here we call fetch user
    console.log("on mounted fetch task:");
    console.log(tasks.value);
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <section><h3>Hola: {{user.email}}, este es tu dashboard</h3>
  <button @click.prevent="letMeOut">Sign out</button>
</section>

<section>
  <NewToDo />
</section>

<section>
  <p>Y aqui tu lista de tareas</p>
  <div>
    <Card v-for="(task, index) in taskList" :index="index" :task="task" />
  </div>
  <!--
    <Card v-for="task in taskList"  :key="task.id"/>  
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Is Complete</th>
        <th>Date created</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in taskList" :key="task.id">
        <td>{{task.title}}</td>
        <td>{{task.is_complete}}</td>
        <td>{{task.inserted_at}}</td>
        <td class="btn"><img class="icon" @click="modifyTask(task.id, task.title)" src="../assets/edit.png"></td>
        <td class="btn"><img class="icon" @click="modifyTask(task.id, task.title); show=true" src="../assets/edit.png"></td>
        <td class="btn"><img class="icon" @click="remove(task.id)" src="../assets/bin.png"></td>

      </tr>
    </tbody>
  </table>


  <NewToDo :key="id" :title="title" /> -->
</section>


</template>

<style scoped>
section {
    border: 1px solid lightgray;
    border-radius: 12px;
    padding: 5px;
}

.reverseOrder {
  display: flex;
  flex-direction: column-reverse; 
}
</style>