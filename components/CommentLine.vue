<template> 
  <div :class="comment.recent ? 'post-card-recent-comment-line' : 'post-card-comment-line'">
    <UAvatar class="m-1" size="2xs" :src="avatarSrc" />       
    <div class="mr-1">{{ comment.full_name }}: </div>
    <div class="comment-body">
      {{ comment.body }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetAvatarApi } from '~/composables/api/profiles/useGetAvatarApi';
import type { CommentInfo } from '~/models/Post';


const props = defineProps<{comment: CommentInfo}>()
const getAvatarApi = useGetAvatarApi()

if(props.comment?.avatar_url)
  getAvatarApi.params.value.path = props.comment?.avatar_url

const avatarSrc = computed(() => getAvatarApi.data.value ? URL.createObjectURL(getAvatarApi.data.value) : undefined)
</script>~/composables/api/profiles/useGetAvatarApi