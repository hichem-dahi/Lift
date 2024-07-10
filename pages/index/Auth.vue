<template>
  <div class="auth-page h-screen w-screen flex flex-col items-center justify-center p-8 max-w-xl">
    <div class="home-logo">   
      <img width="60" class="m-4" :src="logo"> 
      <h1 class="font-semibold text-4xl text-gray-500">Mingles</h1> 
    </div>
    <div v-if="!isSignUp" class="flex flex-col items-center justify-center w-full">
      <h1 class="text-lg font-semibold">Create an account</h1>
      <h3 class="text-sm p-2">Enter your email to sign up for this app</h3>

      <div class="w-full">
        <UForm :schema="schema" :state="form" @submit="signUp">
          <UFormGroup name="email">
            <UInput 
              class="my-2 w-full" 
              size="xl" 
              v-model="form.email" /> 
          </UFormGroup>
          <UButton 
            block 
            class="mt-4 mb-2" 
            color="black" 
            size="xl" 
            type="submit"> Sign up with email</UButton>
        </UForm>

      </div>
      
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
import logo from '@/public/hkinect-logo.svg'
import { object, string } from 'yup';
import type { FormUser } from '~/models/User';
import { authWithGoogle } from '~/supabase/oauth';

const isSignUp = ref(false)
const form = reactive<FormUser>({
  password: '',
  confirm_password: '',
  full_name: '',
  username: '',
  email: '',
  bio: ''
})
const schema = object({
  email: string().email('Invalid email').required('Required')
})

async function signUp() {
  if (form.email)
    isSignUp.value = true
}

</script>