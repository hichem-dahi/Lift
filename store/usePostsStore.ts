import type { PostInfo } from "~/models/Post"

export const usePostsStore = defineStore('postsStore', () => {
  const posts = ref<PostInfo[]>([])

  return { posts }
})


