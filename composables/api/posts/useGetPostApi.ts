import { supabase } from "~/supabase/supabase"

export interface getPostparams {
  postId: string | undefined
}

export function useGetPostApi() {
  const params = ref<getPostparams>({
    postId: undefined
  })

  const query = async () => params.value.postId ? supabase
    .from('postsinfo')
    .select(`id, body, user_id, username, full_name, avatar_url, user_likes, updated_at, created_at`)
    .eq('id', params.value.postId).single() : undefined

  const state = useAsyncData(`posts-${params.value.postId}`, () => query(), { default: undefined, immediate: false });

  const data = computed(() => state.data.value?.data)
  const error = computed(() => state.error.value)
  const loading = computed(() =>  state.status.value == 'pending' ? true : false)
  const success = computed(() =>  state.status.value == 'success' ? true : false)

  return { data, error, success, execute: state.execute, loading, params };
}