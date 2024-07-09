<template>
  <div class="py-1 center-line justify-between w-1/2"> 
    <UButton @click="router.go(-1)" size="xl" color="grey" variant="ghost" icon="i-mdi-chevron-left" />
    <div class="font-semi-bold">Profile</div> 
  </div>
  <hr>
  <div class="flex justify-end">
    <UButton size="2xs"  variant="ghost" color="blue" @click="signOut()">sign out</UButton>
  </div>

  <div class="center-line justify-center p-2">
    <Avatar v-if="authStore.user?.avatar_url" v-model:path="authStore.user.avatar_url" @upload="updateProfile" :size="10" />
  </div>

  <div class="p-4">
    <template v-if="profileForm" v-for="(_, key) in profileForm" :key="key">
      <ProfileLine 
        v-if="ProperProfileInfoKeys[key]"
        :formKey="key"
        @update-profile="updateProfile"
        v-model="profileForm[key]" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '~/supabase/supabase';

import { ProperProfileInfoKeys } from '~/models/User';

import { useAuthStore } from '~/store/useAuthStore';
import { useUpsertProfileApi } from '~/composables/api/profiles/useUpsertProfileApi';


const router = useRouter()
const authStore = useAuthStore()

const { error, loading, params } = useUpsertProfileApi()

const profileForm = computed(() => { 
  return authStore.user ? { ...authStore.user } : undefined
})

function updateProfile() {
  if (profileForm.value)
    params.value.profileForm = {...profileForm.value, updated_at: new Date()}
}

async function signOut() {
  await supabase.auth.signOut()
}
</script>~/composables/api/profiles/useUpdateProfileApi