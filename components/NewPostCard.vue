<template>
  <UCard class="new-post-card">
    <div class="new-post-title">Create post</div>

    <div class="new-post-body">
      <UAvatar class="new-post-body-avatar" src="https://avatars.githubusercontent.com/u/739984?v=4" size="sm"/>       
      <UTextarea class="new-post-body-input" v-model="postBody" placeholder="Write..." />
    </div>

    <div class="new-post-input-actions"> 
      <UButton size="xs" class="btn" color="blue" variant="soft">Post</UButton> 
    </div>
  </UCard>
</template>

<script setup lang="ts">
const postBody = ref('')
</script>