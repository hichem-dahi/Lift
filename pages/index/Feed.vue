<template>
  <FeedBar />
  <div class="feed-wrapper">
    <NewPostCard />
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup lang="ts">
import posts from '@/data/posts.json'
</script>
