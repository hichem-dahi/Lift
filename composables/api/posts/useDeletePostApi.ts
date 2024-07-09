import { supabase } from "~/supabase/supabase"

export interface deletePostParams {
  postId: string | undefined
}

export function useDeletePostApi() {
  const params = ref<deletePostParams>({
    postId: undefined
  })

  const query = async () => params.value.postId ? supabase
    .from('posts')
    .delete()
    .eq('id', params.value.postId): undefined

  const state = useAsyncData(`posts-${params.value.postId}`, () => query(), { default: undefined, immediate: false });

  const data = computed(() => state.data.value?.data)
  const error = computed(() => state.error.value)
  const loading = computed(() =>  state.status.value == 'pending' ? true : false)
  const success = computed(() =>  state.status.value == 'success' ? true : false)

  return { data, error, success, execute: state.execute, loading, params };
}