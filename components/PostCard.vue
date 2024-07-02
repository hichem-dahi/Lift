<template>
  <div class="post-card">
    <div class="post-card-profile-line font-light">
      <UAvatar class="m-2" src="https://avatars.githubusercontent.com/u/739984?v=4" size="sm"/>       
      <div>Name</div>
    </div>
    
    <div class="post-card-body">Something funny</div>

    <div class="post-card-actions">
      <div @click="likePost()" class="post-card-likes-line">
        <UIcon class="mx-2" name="i-mdi-emoticon-excited-outline" />
        <div>3 likes</div> 
      </div>
      <div @click="showComments = !showComments" class="post-card-comments-line">
        <UIcon class="mx-2" name="i-mdi-message-outline" />
        <div>2 comments</div>
      </div>
    </div>

    <CommentLine v-if="showComments" />
  </div>
</template>

<script setup lang="ts">
const showComments = ref(false)

function likePost() {

}
</script>