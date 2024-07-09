import { supabase } from "~/supabase/supabase"
import type { Comment } from "~/models/Post"

export interface postCommentParams {
  comment: Comment | undefined
}

export function usePostCommentApi() {
  const params = ref<postCommentParams>({
    comment: undefined
  })

  const query = async () => params.value.comment ? 
    supabase.from('comments').upsert(params.value.comment) : undefined

  const state = useAsyncData(() => query(), { immediate: false, lazy: true })

  const data = computed(() => state.data.value?.data)
  const error = computed(() => state.error.value)
  const loading = computed(() =>  state.status.value == 'pending' ? true : false)
  const success = computed(() =>  state.status.value == 'success' ? true : false)

  return { data, error, success, loading, params, execute: state.execute }
}