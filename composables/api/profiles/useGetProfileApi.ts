import { supabase } from "~/supabase/supabase"

export function useGetProfileApi() {
  const userId = ref()

  const query = async () => userId.value ? supabase
    .from('profiles')
    .select(`id, full_name, email, avatar_url, bio`)
    .eq('id', userId.value)
    .single() : undefined;

  const state = useAsyncData('profile', () => query(), { watch: [userId], default: undefined });

  const data = computed(() => state.data.value?.data)
  const error = computed(() => state.error.value)
  const loading = computed(() =>  state.status.value == 'pending' ? true : false)

  
  return { data, error, userId, execute: state.execute, loading };
}