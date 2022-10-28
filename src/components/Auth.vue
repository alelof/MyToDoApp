<script setup>
import { ref } from 'vue'
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'

const isSignUp = ref(false)
</script>

<template>
    <!-- Parent component that switches between SignIn and SignUp component -->
    <main class="w-100 text-center h-100 d-flex flex-column justify-content-center">
        <sign-up v-if="isSignUp" />
        <sign-in v-else />
        <a class="mb-5" @click="isSignUp = !isSignUp">
            {{
        isSignUp
            ? "Already have an account? Log In"
            : "Don't have an account yet? Sign Up"
            }}
        </a>
    </main>
</template>