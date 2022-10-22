<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { useTaskStore } from '../stores/tasks.js'

import moment from 'moment';

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

defineProps({ task: Object })

const completed = async (taskId, isComplete) => {
    try {
        isComplete = !isComplete;
        await taskStore.toogleCompleted(taskId, isComplete);
        await taskStore.fetchTasks();
    } catch (e) {
        console.log(e);
    }
}

const remove = async (taskId) => {
    try {
        await taskStore.deleteTask(taskId);
        await taskStore.fetchTasks();
    } catch (e) {
        console.log(e);
    }
}
</script>
<template>
    <div class="col" v-if="task.is_complete == true">
        <div class="card h-100">
            <div class="d-inline-flex p-2 justify-content-end blocked">
                <img class="icon" src="../assets/checked.png" @click="completed(task.id,task.is_complete)"
                    title="Task completed">
                <router-link :to="{ name: 'edit', params: { id: task.id }, query: { title:task.title} }"
                    class="text-decoration-none text-reset">
                    <img class="icon" src="../assets/edit.png" title="Edit task">
                </router-link>
                <img class="icon" @click="remove(task.id)" src="../assets/bin.png" title="Delete task">
            </div>
            <div class="card-body blocked">
                <p class="card-text">{{task.title}}</p>
            </div>   
            <div class="card-footer">
                <small class="text-muted">Created on: {{ task.inserted_at.substr(0,10) }}</small>
                <!-- | moment('MMMM Do YYYY') -->
                <!--<small class="text-muted">Created on: {{ task.inserted_at.substr(0,10) }}</small>  -->
            </div>
        </div> <!-- si blocked-->
    </div>
    <div class="col" v-else>
        <div class="card h-100">
            <div class="d-inline-flex p-2 justify-content-end">
                <img class="icon" src="../assets/checked.png" @click="completed(task.id,task.is_complete)"
                    title="Task completed" v-if="task.is_complete == true">
                <img class="icon" src="../assets/check.png" @click="completed(task.id,task.is_complete)"
                    title="Mark as completed" v-else>
                <router-link :to="{ name: 'edit', params: { id: task.id }, query: { title:task.title} }"
                    class="text-decoration-none text-reset">
                    <img class="icon" src="../assets/edit.png" title="Edit task">
                </router-link>
                <img class="icon" @click="remove(task.id)" src="../assets/bin.png" title="Delete task">
            </div>
            <div class="card-body">
                <p class="card-text">{{task.title}}</p>
            </div>   
            <div class="card-footer">
                <small class="text-muted">Created on: {{ task.inserted_at.substr(0,10) }}</small>
                <!-- | moment('MMMM Do YYYY') -->
                <!--<small class="text-muted">Created on: {{ task.inserted_at.substr(0,10) }}</small>  -->
            </div>
        </div> <!-- si blocked-->
    </div>
</template>

<style scoped>
.icon {
    width: 24px;
    height: 24px;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
    padding: 1px;
    border-radius: 3px;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.icon:hover {
    background-color: #e9c46a;

}

.blocked{
    background-color: rgba(0, 0, 0, 0.03);
    color: rgba(0, 0, 0, 0.50) 
}
</style>
