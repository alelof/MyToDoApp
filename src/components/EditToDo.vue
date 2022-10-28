<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { onMounted } from 'vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../stores/tasks.js'

//For router link
const router = useRouter()

// Data from task
const route = useRoute()
const id = ref(route.params.id)
const title = ref(route.query.title)
const newTitle = ref('')

//Displaying errors in banner
const taskStore = useTaskStore()
const { errors } = storeToRefs(taskStore)
let errorMsg = reactive(errors)
let isError = ref(false)

onMounted(async () => {
    errorMsg.value = null
});

const showError = computed({
    set: (value) => {
        isError.value = value
    }
})

const modifyTask = async (id, newTitle) => {
    try {
        if (newTitle) {
            await taskStore.editTask(id, newTitle)
            newTitle = ''
            if (errorMsg.value != null) {
                //Display error
                showError.value = true
            }
            else {
                //Redirect to dashboard after successful edit
                router.push({ path: '/dashboard' })
            }
        }
        else {
            errorMsg.value = "Oops! Something went wrong, please try again. "
            showError.value = true
        }
    } catch (e) {
        console.log(e)
    }
}
</script>

<template>
    <main class="w-100 h-100 d-flex flex-column justify-content-center">
        <div class="form-signin w-100 mx-auto">
            <div class="text-muted mt-2">Current content</div>
            <div class="text fs-6 card bg">
                <div class="card-body">
                    {{ title }}
                </div>
            </div>
            <form class="mt-4" @submit.prevent="modifyTask(id, newTitle)">
                <div>
                    <label class="text-muted" for="task">New content</label>
                    <input id="title" type="text" class="form-control" placeholder="E.g. Feed the cat"
                        v-model="newTitle" />
                </div>
                <div class="d-flex justify-content-between align-items-baseline">
                    <router-link to="/dashboard" tag="button">&lt; Go back </router-link>
                    <button id="myEditBtn" class="mt-3 btn btn-warning" type="submit"> Edit task </button>
                </div>
            </form>

            <!-- Error banner-->
            <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert" v-if="isError">
                <strong> {{ errorMsg }} </strong> Task should be at least 4 characters long.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    @click="isError = !isError"></button>
            </div>
        </div>
    </main>
</template>

<style scoped>
.form-signin {
    max-width: 330px;
    padding: 15px;
}

.bg {
    background-color: rgba(0, 0, 0, 0.03);
}

#myEditBtn {
    background-color: #e9c46a;
    border-color: #e9c46a;
}

#myEditBtn:hover {
    background-color: #dfa926;
}
</style>