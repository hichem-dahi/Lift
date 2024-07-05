<template>
  <div class="add-comment-card">
    <UInput     
      class="flex-grow"  
      color="blue" 
      size="xs" 
      placeholder="comment" 
      v-model="commentBody" />
    <UButton 
      class="px-1 py-0 mx-1"
      color="blue" 
      size="xl" 
      @click="submitComment" 
      icon="i-mdi-chevron-right" 
      variant="ghost" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['add-comment'])

const commentBody = ref('')

function submitComment() {
  if (commentBody.value) {
    emit('add-comment', commentBody.value)
    commentBody.value = ''
  }
}
</script>
