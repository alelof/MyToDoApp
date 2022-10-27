<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const isSignUp = ref(false)

</script>

<template>
    <main class="w-100 text-center h-100 d-flex flex-column justify-content-center">
        <sign-up v-if="isSignUp" />
        <sign-in v-else />
        <a id="msg" class="link-primary" @click="isSignUp = !isSignUp">
            {{
            isSignUp
            ? "Already have an account? Log In"
            : "Don't have an account yet? Sign Up"
            }}
        </a>
    </main>
</template>

<style scoped>
#msg{
    margin-bottom: 5rem;
}

</style>
