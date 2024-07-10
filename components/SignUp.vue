<template>
  <div v-if="form" class="py-4">
    <UForm :schema="schemaRef" :state="form" class="space-y-4" @submit="nextStep">

    <div v-if="step === 1" class="w-full">
      <UFormGroup label="Password" name="password">
        <UInput v-model="form.password" type="password" />
      </UFormGroup>
      <UFormGroup label="Confirm password" name="confirm_password">
        <UInput v-model="form.confirm_password" type="password" />
      </UFormGroup>
    </div>

    <div v-else-if="step === 2" class="w-full">
      <UFormGroup label="First name" name="first_name">
        <UInput v-model="form.first_name" />
      </UFormGroup>
      <UFormGroup label="Last name" name="last_name">
        <UInput v-model="form.last_name" />
      </UFormGroup>
    </div>

    <div v-else-if="step === 3">
      <UFormGroup label="Username" name="username">
        <UInput v-model="form.username" />
      </UFormGroup>
    </div>
   
    <div v-else-if="step === 4">
      <UFormGroup label="Bio" name="bio">
        <UInput v-model="form.bio" />
      </UFormGroup>
    </div>

    <div class="flex justify-end mt-8">
      <UButton 
        color="gray"
        variant="ghost"
        @click="previousStep">Previous</UButton>
      <UButton 
        color="black" 
        type="submit"
        :loading="signUpApi.loading.value || upsertProfileApi.loading.value"
        >Next</UButton>
    </div>
  </UForm>
  </div>
</template>

<script setup lang="ts">
import {object, string } from 'yup'

import type { FormUser } from '~/models/User';

import { useAuthStore } from '~/store/useAuthStore';

import { useUpsertProfileApi } from '~/composables/api/profiles/useUpsertProfileApi';
import { useSignUpApi } from '~/composables/api/auth/useSignUpApi';

const step = ref(1)

const schemaRef = computed(() => {
  return object({
    email: string().email('Invalid email').required('Required'),
    password: step.value === 1 ? string().min(8, 'Must be at least 8 characters').required('Required') : string().nullable(),
    confirm_password: step.value === 1 ? string()
      .test('password-should-match', 'Passwords must match', function(value) {
        return this.parent.password === value;
      }) : string().nullable(),
    first_name: step.value === 2 ? string().required('Required') : string().nullable(),
    last_name: step.value === 2 ? string().required('Required') : string().nullable(),
    username: step.value === 3 ? string().required('Required') : string().nullable(),
    bio: step.value === 4 ? string() : string().nullable(),
  });
})
const form = defineModel<FormUser>()

const authStore = useAuthStore()

const upsertProfileApi = useUpsertProfileApi()
const signUpApi = useSignUpApi()

function previousStep() {
  step.value--
}

function nextStep() {
  if (step.value === 1 && form.value?.email && form.value.password && form.value.confirm_password) {
    signUpApi.params.email = form.value.email
    signUpApi.params.password = form.value.password
    signUpApi.execute()
  } else if(step.value === 2) {
    step.value++
  } else if (step.value === 3) {
    upsertProfileApi.params.value.profileForm = { 
      full_name: `${form.value?.first_name} ${form.value?.last_name}`, 
      username: form.value?.username, 
      email: form.value?.email,
    }
  }
}

watch(() => signUpApi.success.value, (success) => {
  if (success) {
    if (signUpApi.data.value?.session)
      authStore.session = signUpApi.data.value?.session
    step.value++
  }
})

watch(() => upsertProfileApi.success.value, (success) => {
  if (success) step.value++
})  
</script>