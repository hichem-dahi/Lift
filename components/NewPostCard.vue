<template>
  <UCard class="new-post-card">
    <div class="new-post-title">Create post</div>

    <div class="new-post-body">
      <UAvatar class="new-post-body-avatar" src="https://avatars.githubusercontent.com/u/739984?v=4" size="sm"/>       
      <UTextarea class="new-post-body-input" v-model="postBody" placeholder="Write..." />
    </div>

    <div class="new-post-input-actions"> 
      <UButton @click="submitPost" size="xs" class="btn" color="blue" variant="soft">Post</UButton> 
    </div>
  </UCard>
</template>

<script setup lang="ts">
import postsJson from '@/data/posts.json'

const postsData = ref(postsJson)
const postBody = ref('')

function submitPost() {
  postsData.value.unshift({id: 1, body: postBody.value, userId: 1, commentsId: [], likes: 0, numberOfComments: 0})
  debugger
}
</script>