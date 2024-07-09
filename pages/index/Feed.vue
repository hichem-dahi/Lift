<template>
  <FeedBar />
  <div class="feed-wrapper">
    <NewPostCard />
    <PostCard v-for="post in postsStore.posts" :key="post.id" :post="post" :class="post.id" />
  </div>
</template>

<script setup lang="ts">
import { useGetPostsApi } from '~/composables/api/posts/useGetPostsApi';
import { usePostsStore } from '~/store/usePostsStore';

const postsStore = usePostsStore()

const getPostsApi = useGetPostsApi()
getPostsApi.execute()

watch(() => getPostsApi.success.value, (success) => {
  if (success && getPostsApi.data.value) {
    postsStore.posts = getPostsApi.data.value
  }
})

</script>
