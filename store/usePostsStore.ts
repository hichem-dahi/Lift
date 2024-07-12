import type { Post } from "~/models/Post"

export const usePostsStore = defineStore('postsStore', () => {
  const posts = ref<Post[]>([])

  return { posts }
})


