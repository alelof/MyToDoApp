<script setup>
/*

const props = defineProps({
  user: { type: Object, },
  timestamp: { type: String, },
  message: { type: String, },
}); */

import { ref } from 'vue';
import { supabase } from '../supabase';
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { useTaskStore } from '../stores/tasks.js'
import { reactive } from 'vue'
import EditToDo from './EditToDo.vue'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

/********** como lo del user store */
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

let taskList = reactive(tasks);
let show = ref(false);

defineProps({ task: Object })

const remove = async (taskId) => {
    try {
        await taskStore.deleteTask(taskId);
        console.log("Llamando a deleteTask: pasando param: ", taskId);
        await taskStore.fetchTasks();
    } catch (e) {
        console.log(e);
    }
}

</script>
<template>
    <div className="card">
        <h3>{{task.title}}</h3>
        <p>Completed: {{task.is_complete}}</p>
        <p>{{task.inserted_at}}</p>
        
        <!--
            <div class="btn"><img class="icon" @click="modifyTask(task.id, task.title)" src="../assets/edit.png"></div>
            <td class="btn"><img class="icon" @click="modifyTask(task.id, task.title); show=true"
                        src="../assets/edit.png"></td> 
                    
                    , params: { id: task.id }, query: { mytask:task} 
                
                -->
        <router-link :to="{ name: 'edit', params: { id: task.id }, query: { title:task.title} }"
            class="text-decoration-none text-reset">
            <div class="btn"><img class="icon" src="../assets/edit.png"></div>
        </router-link>

        <td class="btn"><img class="icon" @click="remove(task.id)" src="../assets/bin.png"></td>
    </div>
</template>

<style scoped>
.card {
    border: 2px solid rgb(89, 0, 255);
    border-radius: 12px;
    padding: 5px;
    width: 50%;
}

.icon {
    width: 30px;
    height: 30px;

}

.btn {
    margin: 0;
    cursor: pointer;
}
</style>
