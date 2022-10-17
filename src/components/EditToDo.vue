<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { useTaskStore } from '../stores/tasks.js'

let open = ref(false)

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const route = useRoute()
const id = ref(route.params.id);
const title = ref(route.query.title);
const newTitle = ref('');

/********** como lo del user store */
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)



const modifyTask = async (id, newTitle) => {
    try {
        await taskStore.editTask(id,newTitle);
        alert("sucesfully modified");
        router.push({ path: '/dashboard' });
    } catch (e) {
        console.log(e);
    }
}


</script>

<template>
    <h3>EDIT PAGE</h3>
    <p>{{title}}</p>
    <form @submit.prevent="modifyTask(id,newTitle)">
        <div>
            <label for="task">To do:</label>
            <input id="title" type="text" v-model="newTitle" />
        </div>
        <div>
            <button type="submit"> Update! </button>
        </div>
        </form>
        <router-link to="/dashboard" tag="button">Cancel</router-link>

</template>

