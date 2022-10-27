<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../stores/tasks.js'
import { reactive } from 'vue'
import NewToDo from './NewToDo.vue'
import Card from './Card.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
let taskList = reactive(tasks);

onMounted(async () => {
  try {
    await taskStore.fetchTasks();
  } catch (e) {
    console.log(e);
  }
});


function printy (){
  console.log('hey you!')
  }
</script>

<template>
  <Header></Header>
  <section>
    <NewToDo />
  </section>
  
  <section>
    <h4 class="mb-3">My tasks </h4>
    <div class="row row-cols-1 row-cols-md-4 g-4 mb-5">
      <Card v-for="(task, index) in taskList" :index="index" :task="task"/>
    </div>
  </section>
  <Footer></Footer>

</template>

<style scoped>
section {
  padding: 5px;
  max-width: 90%;
  margin: auto;
}

svg {
  width: 20px;
  height: 20px;
}
</style>


color para el boton:  289F91