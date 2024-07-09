<template>
  <NuxtPage></NuxtPage>
</template>

<script setup lang="ts">
import { supabase } from '~/supabase/supabase';
import { useAuthStore } from '~/store/useAuthStore';

import { useGetAvatarApi } from '~/composables/api/profiles/useGetAvatarApi';
import { useGetProfileApi } from '~/composables/api/profiles/useGetProfileApi';

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const getProfileApi = useGetProfileApi()
const getAvatarApi = useGetAvatarApi()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    if (data.session) {
      authStore.session = data.session
    }
  })

  supabase.auth.onAuthStateChange(async (_, _session) => {
    if (_session) {
      authStore.session = _session
      if (route.path === '/')
        router.push('/feed')
    } else {
      router.push('/auth')
    }
  })
})

watch(() => authStore.session, (newSession) => {
  if (newSession) {
    getProfileApi.userId.value = newSession.user.id
  } 
})

watch(() => getProfileApi.data.value, (profileData) => {
  if (profileData) {
    authStore.user = profileData
  }
})

watch(() => authStore.user, (newUser) => {
  if (newUser?.avatar_url)
    getAvatarApi.params.value.path = newUser?.avatar_url
}, 
{ deep: true, immediate: true }
)

watch(() => getAvatarApi.success.value, (success) => {
  if(success && getAvatarApi.data.value)
    authStore.avatar = URL.createObjectURL(getAvatarApi.data.value)
})
</script>