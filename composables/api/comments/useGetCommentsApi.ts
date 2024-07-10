import { supabase } from "~/supabase/supabase"

export interface getCommentsParams {
  post_id: string | undefined
}

export function useGetCommentsApi() {
  const params = ref<getCommentsParams>({
    post_id: ''
  })

  const query = async () => supabase
    .from('commentsinfo').select('id, body, post_id, user_id, created_at, updated_at, full_name, username, avatar_url')
    .eq('post_id', params.value.post_id)

  const state = useAsyncData(`commentsinfo-${Math.random()}`, () => query(), { watch: [() => params.value.post_id], default: undefined, immediate: false });

  const data = computed(() => state.data.value?.data)
  const error = computed(() => state.error.value)
  const loading = computed(() =>  state.status.value == 'pending' ? true : false)
  const success = computed(() =>  state.status.value == 'success' ? true : false)

  return { data, error, success, execute: state.execute, loading, params };
}