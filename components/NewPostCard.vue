<template>
  <UCard class="new-post-card">
    <div class="new-post-title">Create post</div>

    <div class="new-post-body">
      <UAvatar class="new-post-body-avatar" :src="authStore.avatar" size="sm"/>       
      <UTextarea class="new-post-body-input" v-model="postBody" placeholder="Write..." />
    </div>

    <div class="new-post-input-actions"> 
      <UButton 
        size="xs" 
        class="btn" 
        color="grey"
        variant="soft" 
        @click="submitPost" 
        :loading="upsertPostApi.loading.value">Post</UButton> 
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/useAuthStore';
import { usePostsStore } from '~/store/usePostsStore';

import { useGetAvatarApi } from '~/composables/api/profiles/useGetAvatarApi';
import { useUpsertPostApi } from '~/composables/api/posts/useUpsertPostApi';
import { useGetPostsApi } from '~/composables/api/posts/useGetPostsApi';

const authStore = useAuthStore()
const postsStore = usePostsStore()

const getAvatarApi = useGetAvatarApi()
const upsertPostApi = useUpsertPostApi()
const getPostsApi = useGetPostsApi()

const postBody = ref('')

function submitPost() {
  if (authStore.user?.id && postBody.value)
  upsertPostApi.params.value.post = { 
    user_id: authStore.user?.id, 
    body: postBody.value, 
    created_at: new Date(), 
    updated_at: new Date()}
}

watch(() => upsertPostApi.success.value, (success) => {
  if (success) {
    getPostsApi.execute()
  }
})

watch(() => getPostsApi.success.value, (success) => {
  if (success && getPostsApi.data.value) {
    postsStore.posts = getPostsApi.data.value
  }
})

watch(() => authStore.user, (newUser) => {
  if (newUser?.avatar_url)
    getAvatarApi.params.value.path = newUser?.avatar_url
}, 
{ deep: true, immediate: true }
)

const toast = useToast()

watch(() => upsertPostApi.success.value, (success) => {
  if(success) toast.add({ title: 'Your post has been added successfully', color: 'blue', timeout: 1})
})

watch(() => upsertPostApi.error.value, (error) => {
  if(error) toast.add({ title: 'Your post hasn\'t been added', color: 'red', timeout: 1})
})
</script>