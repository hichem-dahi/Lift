<template> 
  <div :class="comment.recent ? 'post-card-recent-comment-line' : 'post-card-comment-line'">
    <UAvatar class="m-1" size="2xs"  src="https://avatars.githubusercontent.com/u/739984?v=4" />       
    <div class="mr-1">{{ name }}: </div>
    <div class="comment-body">
      {{ comment.body }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '~/models/Post';

import usersJson from '@/data/users.json'

const usersData = ref(usersJson)
const props = defineProps<{comment: Comment}>()

const name = computed(() => { 
  const user = usersData.value.find(item => item.id === props.comment?.userId)
  return props.comment ? `${user?.first_name} ${user?.last_name}` : ''
})
</script>