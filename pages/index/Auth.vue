<template>
  <div class="auth-page h-screen w-screen flex flex-col items-center justify-center p-8 max-w-xl">
    <div class="home-logo">   
      <img width="60" class="m-4" :src="logo"> 
      <h1 class="font-semibold text-4xl text-gray-500">Mingles</h1> 
    </div>
    <div v-if="!isSignUp" class="flex flex-col items-center justify-center w-full">
      <h1 class="text-lg font-semibold">Create an account</h1>
      <h3 class="text-sm p-2">Enter your email to sign up for this app</h3>
      <UInput 
        class="my-2 w-full" 
        size="xl" 
        v-model="form.email"></UInput>
      <UButton 
        block 
        class="mt-4 mb-2" 
        color="black" size="xl" 
        :loading="loading"
        @click="sendOtpCode">Sign up with email</UButton>
      <div class="center-line my-4 w-full">
        <hr class="flex-grow">
        <p class="text-md text-gray-400 px-2">Or continue with</p>
        <hr class="flex-grow">
      </div>
      <UButton 
        block 
        color="red" 
        size="xl"
        @click="authWithGoogle" 
        icon="i-mdi-google">Sign up with google</UButton>
    </div>
    <div v-else class="w-full items-center justify-center">
      <SignUp v-model="form"></SignUp>
    </div>
  </div>
</template>

<script setup lang="ts">
import { authWithGoogle } from '~/supabase/oauth';
import { supabase } from '~/supabase/supabase';

import logo from '@/public/hkinect-logo.svg'

const router = useRouter()
const loading = ref(false)

const isSignUp = ref(false)
const form = reactive({
  otp: '',
  full_name: '',
  username: '',
  email: '',
  bio: ''
})

onMounted(() => {
  supabase.auth.onAuthStateChange(event => {
    if (event ==='SIGNED_IN') {
      router.push('/feed')
    } 
  })
})

async function sendOtpCode() {
  loading.value = true
  const { error } = await supabase.auth.signInWithOtp({
    email: form.email,
    options: {
      shouldCreateUser: false,
    },
  })
  if (!error)
    isSignUp.value = true  
  
  loading.value = false
}
</script>