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

const isSignUp = ref(false);

</script>

<template>
    <div>
        <h1>auth web page</h1>
        <sign-up v-if="isSignUp" />
        <sign-in v-else />
        <button @click="isSignUp = !isSignUp">
            {{
            isSignUp
            ? "Already have an account? Log In"
            : "Don't have an account yet? Sign Up"
            }}
        </button>
    </div>

</template>

<style>

</style>
