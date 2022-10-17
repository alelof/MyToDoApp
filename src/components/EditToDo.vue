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




console.log("id",id.value, title)
/********** como lo del user store */
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)



const modifyTask = async (id, title) => {
    try {
        await taskStore.editTask(id,title);
        alert("sucesfully modified");
        router.push({ path: '/dashboard' });
    } catch (e) {
        console.log(e);
    }
}


</script>

<template>
    <h3>EDIT PAGE</h3>
    <form @submit.prevent="modifyTask(id,title)">
        <div>
            <label for="task">To do:</label>
            <input id="title" type="text" v-model="title" />
        </div>
        <div>
            <button type="submit"> Update </button>
        </div>
        </form>

</template>

