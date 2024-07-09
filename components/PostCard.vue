<template>
  <div v-if="post" class="post-card">
    <div class="center-line justify-between">
      <div class="post-card-profile-line font-light">
        <UAvatar class="m-2" :src="avatarSrc" size="sm" />       
        <div>{{  post.full_name }}</div>
      </div>
      <UPopover>
        <UButton size="2xs" color="grey" icon="i-mdi-dots-vertical" variant="ghost" />
        <template #panel>
          <div class="p-1">
            <UButton :disabled="!ownPost" size="2xs" color="grey" variant="ghost" @click="deletePost">Delete</UButton>
          </div>
        </template>
      </UPopover>
    </div>
   

    <div class="post-card-body">{{ post.body }}</div>

    <div class="post-card-actions">
      <div @click="likePost()" class="post-card-likes">
        <UIcon class="mx-2" name="i-mdi-emoticon-excited-outline" />
        <div>{{ post.user_likes?.length }} likes</div> 
      </div>

      <div class="post-card-comments" @click="openComments">
        <UIcon class="mx-2" name="i-mdi-message-outline" />
        <div>{{ comments.length }} comments</div>
      </div>
    </div>

    <div v-if="showComments" class="post-card-comments-section">
      <AddCommentCard
        v-model="showComments" 
        @add-comment="addComment" />

      <template v-for="i of commentsToDisplay" :key="i-1">
        <CommentLine v-if="comments[i-1]" :comment="comments[i-1]" />
      </template>
      <div v-if="isShowMoreComments" class="comments-section-more-btn self-center">
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
import type { Post, PostInfo } from '~/models/Post';

import { useAuthStore } from '~/store/useAuthStore';

import { useGetAvatarApi } from '~/composables/api/profiles/useGetAvatarApi';
import { usePostCommentApi } from '~/composables/api/usePostCommentApi';
import { useGetCommentsApi } from '~/composables/api/useGetCommentsApi';
import { useUpdatePostApi } from '~/composables/api/posts/useUpdatePostApi';
import { useGetPostApi } from '~/composables/api/posts/useGetPostApi';
import { useDeletePostApi } from '~/composables/api/posts/useDeletePostApi';

//const post = defineModel<PostInfo>()
const props = defineProps<{post?: PostInfo}>()
const authStore = useAuthStore()

const getAvatarApi = useGetAvatarApi()
const postCommentApi = usePostCommentApi()
const getCommentsApi = useGetCommentsApi()
const updatePostApi = useUpdatePostApi()
const getPostApi = useGetPostApi()
const deletePostApi = useDeletePostApi()

const commentsToDisplay = ref(3)
const showComments = ref(false)

if (props.post?.id)
  getCommentsApi.params.value.post_id = props.post?.id

if (props.post?.avatar_url)
  getAvatarApi.params.value.path = props.post.avatar_url

const avatarSrc = computed(() => getAvatarApi.data.value ? URL.createObjectURL(getAvatarApi.data.value) : undefined)
const comments = computed(() => getCommentsApi.data.value || [])
const ownPost = computed(() => authStore.user?.id === props.post?.user_id)
const isShowMoreComments = computed(() => commentsToDisplay.value < comments.value.length)
const isLiked = computed(() => authStore.user?.id ? props.post?.user_likes?.includes(authStore.user?.id) : false)

function likePost() {
  if (props.post?.user_likes && authStore.user?.id) {

    if (!isLiked.value) {
      updatePostApi.params.value.post = { 
        id: props.post.id, 
        user_likes: [...props.post.user_likes, authStore.user?.id], 
        updated_at: new Date() 
      } 
    } else if (isLiked.value) {
      updatePostApi.params.value.post = { 
        id: props.post.id, 
        user_likes: props.post.user_likes.filter(userId => userId !== authStore.user?.id), 
        updated_at: new Date()
      } 
    }}
}

function openComments() {
  showComments.value = !showComments.value
  if (!showComments.value) {
    commentsToDisplay.value = 3
  }
}

function showMoreComments() {
  commentsToDisplay.value += 3
}

function addComment(body: string) {
  commentsToDisplay.value++
  if (props.post?.id && authStore.user?.id) {
    postCommentApi.params.value.comment = { 
      body, 
      post_id: props.post.id, 
      user_id: authStore.user?.id, 
      updated_at: new Date() 
    }
    postCommentApi.execute()
  }
}

function deletePost() {
  if (ownPost) {
    deletePostApi.params.value.postId = props.post?.id
    deletePostApi.execute()
  }
}

watchEffect(() => {
  if (comments.value.length && commentsToDisplay.value > comments.value.length) 
    commentsToDisplay.value = comments.value.length
})

watch(() => updatePostApi.success.value, (success) => {
  if (success) {
    getPostApi.params.value.postId = props.post?.id
    getPostApi.execute()
  }
})

/*watch(() => getPostApi.success.value, (success) => {
  if (success && getPostApi.data.value) 
    props.post = getPostApi.data.value
  else 
    props.post = undefined
  debugger
})*/

watch(() => deletePostApi.success.value, (success) => {
  if (success) {
    getPostApi.params.value.postId = props.post?.id
    getPostApi.execute()
  }
})

watch(() => postCommentApi.success.value, (success) => {
  if (success) {
    getCommentsApi.params.value.post_id = props.post?.id
    getCommentsApi.execute()
  }
})

</script>