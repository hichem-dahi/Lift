import { supabase } from "~/supabase/supabase"
import type { Post } from "~/models/Post"

export interface postPostParams {
  post: Post | undefined
}

export function useUpdatePostApi() {
  const params = ref<postPostParams>({
    post: undefined,
  })

  const query = async () => params.value.post ? 
    supabase
      .from('posts').update(params.value.post)
      .eq('id', params.value.post.id)
      .select()
      : undefined

  const state = useAsyncData(() => query(), { watch: [() => params.value.post], immediate: false, lazy: true })

  const data = computed(() => state.data.value?.data?.[0])
  const error = computed(() => state.error.value)
  const loading = computed(() =>  state.status.value == 'pending' ? true : false)
  const success = computed(() =>  state.status.value == 'success' ? true : false)


  return { data, error, success, loading, params }
}