import { supabase } from "~/supabase/supabase"

export function useGetPostsApi() {
  const query = async () => supabase
    .from('posts')
    .select(`id, body, user_id(id, username, full_name, avatar_url), user_likes, updated_at, created_at`)

  const state = useAsyncData('posts', () => query(), { default: undefined, immediate: false});

  const data = computed(() => state.data.value?.data)
  const error = computed(() => state.error.value)
  const loading = computed(() =>  state.status.value == 'pending' ? true : false)
  const success = computed(() =>  state.status.value == 'success' ? true : false)

  return { data, error, success, execute: state.execute, loading };
}