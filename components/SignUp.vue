<template>
  <div v-if="form" class="py-4">
    <UInput v-if="step === 1" size="3xl" class="w-full" placeholder="Enter Code"
      v-model="form.otp" />
    <UInput v-if="step === 2" size="3xl" class="w-full" placeholder="Display name"
      v-model="form.full_name" />
    <UInput v-else-if="step === 3" size="3xl" class="w-full" placeholder="Username"
      v-model="form.username" />
    <UTextarea v-else-if="step === 4" block size="3xl" class="w-full" placeholder="Bio"
      v-model="form.bio" /> 
    <div class="flex justify-end mt-8">
      <UButton color="gray" variant="ghost" @click="previousStep">Previous</UButton>
      <UButton color="black" @click="nextStep">Next</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '~/supabase/supabase';
import type { FormUser } from '~/models/User';

import { useAuthStore } from '~/store/useAuthStore';
import { useUpsertProfileApi } from '~/composables/api/profiles/useUpsertProfileApi';

const form = defineModel<FormUser>()

const authStore = useAuthStore()
const upsertProfileApi = useUpsertProfileApi()

const step = ref(1)

function previousStep() {
  step.value--
}

function nextStep() {
  step.value++
}

watch(step, async (newStep) => {
  if (newStep === 2 && form.value?.email && form.value.otp) {
    const { data: { session }, error: error1 } = await supabase.auth.verifyOtp({
      email: form.value.email,
      token: form.value.otp,
      type: 'email',
   })

  if (session)
    authStore.session = session
  } else if (newStep === 4) {
    upsertProfileApi.params.value.profileForm = { 
      full_name: form.value?.full_name, 
      username: form.value?.username, 
      email: form.value?.email,
    }
  }
})
</script>