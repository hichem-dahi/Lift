import { supabase } from "~/supabase/supabase"
import type { Post } from "~/models/Post"

export interface postPostParams {
  post: Post | undefined
}

export function useUpsertPostApi() {
  const params = ref<postPostParams>({
    post: undefined
  })

  const query = async () => params.value.post ? 
    supabase.from('posts').upsert(params.value.post) : undefined

  const state = useAsyncData(() => query(), { watch: [() => params.value.post], immediate: false, lazy: true })

  const data = computed(() => state.data.value?.data)
  const error = computed(() => state.error.value)
  const loading = computed(() =>  state.status.value == 'pending' ? true : false)
  const success = computed(() =>  state.status.value == 'success' ? true : false)


  return { data, error, success, loading, params }
}