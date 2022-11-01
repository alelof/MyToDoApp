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
let taskList = reactive(tasks)

onMounted(async () => {
  try {
    await taskStore.fetchTasks()
  } catch (e) {
    console.log(e)
  }
});
</script>

<template>
  <Header></Header>
  <section>
    <NewToDo></NewToDo>
  </section>

  <section>
    <h4 class="mb-3">My tasks </h4>
    <div id="cardContainer" class="row row-cols-1 row-cols-md-4 g-4">
      <Card v-for="(task, index) in taskList" :index="index" :task="task" />
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

#cardContainer {
  margin-bottom: 3rem;
}

@media only screen and (max-width: 392px) {
  #cardContainer {
    margin-bottom: 4rem;
  }
}
</style>