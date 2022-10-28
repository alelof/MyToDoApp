<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../stores/tasks.js'
import { computed } from 'vue'
import moment from 'moment'
import ModalWait from './ModalWait.vue'

const taskStore = useTaskStore()

defineProps({ task: Object })

//Showing waiting animation
let loading = ref(false);
const triggerModal = computed({
    set: (value) => {
        loading.value = value
    }
})

const completed = async (taskId, isComplete) => {
    try {
        triggerModal.value = true
        isComplete = !isComplete
        await taskStore.toogleCompleted(taskId, isComplete)
        await taskStore.fetchTasks()
        triggerModal.value = false 
    } catch (e) {
        console.log(e)
    }
}

const remove = async (taskId) => {
    try {
        triggerModal.value = true
        await taskStore.deleteTask(taskId)
        await taskStore.fetchTasks()
        triggerModal.value = false
    } catch (e) {
        console.log(e)
    }
}
</script>
<template>
    <!-- Card for COMPLETED task-->
    <div class="col" v-if="task.is_complete == true">
        <div class="card h-100">
            <div class="d-inline-flex p-2 justify-content-end blocked">
                <img class="icon" src="../assets/checked.png" @click="completed(task.id, task.is_complete)"
                    title="Task completed">
                <router-link :to="{ name: 'edit', params: { id: task.id }, query: { title: task.title } }"
                    class="text-decoration-none text-reset">
                    <img class="icon" src="../assets/edit.png" title="Edit task">
                </router-link>
                <img class="icon" @click="remove(task.id)" src="../assets/bin.png" title="Delete task">
            </div>
            <div class="card-body blocked">
                <p class="card-text">{{ task.title }}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Created on: {{ moment(task.inserted_at).format("ddd, MMM Do YYYY, h:mm a")}}</small>
            </div>
        </div>
    </div>

    <!-- Card for NOT COMPLETED task -->
    <div class="col" v-else>
        <div class="card h-100">
            <div class="d-inline-flex p-2 justify-content-end">
                <img class="icon" src="../assets/check.png" @click="completed(task.id, task.is_complete)"
                    title="Mark as completed">
                <router-link :to="{ name: 'edit', params: { id: task.id }, query: { title: task.title } }"
                    class="text-decoration-none text-reset">
                    <img class="icon" src="../assets/edit.png" title="Edit task">
                </router-link>
                <img class="icon" @click="remove(task.id)" src="../assets/bin.png" title="Delete task">
            </div>
            <div class="card-body">
                <p class="card-text">{{ task.title }}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Created on: {{ moment(task.inserted_at).format("ddd, MMM Do YYYY, h:mma")}}</small>
            </div>
        </div>
    </div>

    <!-- Waiting animation -->
    <ModalWait v-if="loading"></ModalWait>
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

.blocked {
    background-color: rgba(0, 0, 0, 0.03);
    color: rgba(0, 0, 0, 0.50)
}
</style>
