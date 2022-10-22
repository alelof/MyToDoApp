<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useTaskStore } from '../stores/tasks.js'

const router = useRouter()

const route = useRoute()
const id = ref(route.params.id)
const title = ref(route.query.title)
const newTitle = ref('')

const taskStore = useTaskStore()

const modifyTask = async (id, newTitle) => {
    try {
        await taskStore.editTask(id, newTitle);
        alert("sucesfully modified");
        router.push({ path: '/dashboard' });
    } catch (e) {
        console.log(e);
    }
}
</script>

<template>
    <main class="w-100 h-100 d-flex flex-column justify-content-center">
        <div class="form-signin w-100 mx-auto">
            <div class="text-muted mt-2">Current content</div>
            <div class="card">
                <div class="card-body">
                    {{title}}
                </div>
            </div>
            <form class="mt-4" @submit.prevent="modifyTask(id,newTitle)">
                <div>
                    <label class="text-muted" for="task">New content</label>
                    <input id="title" type="text" class="form-control" placeholder="new task" v-model="newTitle" />
                </div>
                <div class="d-flex justify-content-between align-items-baseline">
                    <router-link to="/dashboard" tag="button">&lt; Go back </router-link>
                    <button class="mt-3" type="submit"> Edit task </button>
                </div>
            </form>
        </div>
    </main>
</template>

<style scoped>
.form-signin{
  max-width: 330px;
  padding: 15px;;
}
</style>