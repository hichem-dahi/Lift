<template>
  <div v-if="post" class="post-card">
    <div class="post-card-profile-line font-light">
      <UAvatar class="m-2" src="https://avatars.githubusercontent.com/u/739984?v=4" size="sm" />       
      <div>{{ name }}</div>
    </div>
    
    <div class="post-card-body">{{ post.body }}</div>

    <div class="post-card-actions">
      <div @click="likePost()" class="post-card-likes">
        <UIcon class="mx-2" name="i-mdi-emoticon-excited-outline" />
        <div>{{ post.likes }} likes</div> 
      </div>

      <div class="post-card-comments" @click="openComments">
        <UIcon class="mx-2" name="i-mdi-message-outline" />
        <div>{{ post.numberOfComments }} comments</div>
      </div>
    </div>

    <div v-if="showComments" class="post-card-comments-section">
      <AddCommentCard
        v-model="showComments" 
        @add-comment="addComment" />

      <template v-for="i of commentsToDisplay" :key="i-1">
        <CommentLine v-if="comments[i-1]" :comment="comments[i-1]" />
      </template>

      <div v-if="commentsToDisplay < comments.length" class="comments-section-more-btn self-center">
        <div class="text-center">...</div>
        <UButton class="self-center" 
          size="lg"
          color="grey" 
          icon="i-mdi-chevron-down" 
          variant="ghost" 
          @click="showMoreComments" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment, Post } from '~/models/Post';

import usersJson from '@/data/users.json'
import commentsJson from '@/data/comments.json'

const props = defineProps<{ post?: Post}>()

const usersData = ref(usersJson)
const commentsData = ref<Comment[]>(commentsJson)

const commentsToDisplay = ref(3)
const showComments = ref(false)
const isLike = ref(false)

const name = computed(() => { 
  const user = usersData.value.find(item => item.id === props.post?.userId)
  return props.post ? `${user?.first_name} ${user?.last_name}` : ''
})

const comments = computed(() => {
  if (props.post) 
    return commentsData.value.filter(item => props.post?.id === item.postId)
  else return []
})

if(commentsToDisplay.value > comments.value.length) {
  commentsToDisplay.value = comments.value.length
}

function likePost() {
  if(!isLike.value && props.post)
    props.post.likes++
  else if(isLike.value && props.post)
    props.post.likes--
}

function openComments() {
  showComments.value = !showComments.value
}

function showMoreComments() {
  commentsToDisplay.value += 3
  if (comments.value.length <= commentsToDisplay.value + 3)
    commentsToDisplay.value = comments.value.length
}

function addComment(body: string) {
  commentsToDisplay.value++
  if (props.post?.id)
    commentsData.value.unshift({id: 1, body, userId: 1, postId: props.post?.id, recent: true})
}
</script>