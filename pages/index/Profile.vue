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
    <Avatar v-if="profileForm?.avatar_url" 
      v-model:path="profileForm.avatar_url" 
      :postId="profileForm.id"
      :size="10" />
  </div>

  <div v-if="profileForm" class="p-4">
    <template v-for="(_, key) in profileForm" :key="key">
      <ProfileLine 
        v-if="ProperProfileInfoKeys[key]"
        :formKey="key"
        :postId="profileForm?.id"
        v-model="profileForm[key]" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '~/supabase/supabase';
import { ProperProfileInfoKeys, type User } from '~/models/User';
import { useAuthStore } from '~/store/useAuthStore';

const router = useRouter()
const authStore = useAuthStore()

const profileForm = ref<User>()

watchEffect(() => {
  profileForm.value = authStore.user
})

async function signOut() {
  await supabase.auth.signOut()
}
</script>