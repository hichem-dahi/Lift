<template>
  <FeedBar />
  <div class="feed-wrapper">
    <NewPostCard />
    <PostCard v-for="(_,i) in posts" :key="i" v-model="posts[i]"  />
  </div>
</template>

<script setup lang="ts">
import { useGetPostsApi } from '~/composables/api/posts/useGetPostsApi';
import { usePostsStore } from '~/store/usePostsStore';

const postsStore = usePostsStore()

const posts = computed(() => postsStore.posts)

const getPostsApi = useGetPostsApi()
getPostsApi.execute()


watch(() => getPostsApi.success.value, (success) => {
  if (success && getPostsApi.data.value) {
    postsStore.posts = getPostsApi.data.value
  }
})

</script>
