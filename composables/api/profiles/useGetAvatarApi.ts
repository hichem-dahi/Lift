import { supabase } from "~/supabase/supabase";

export function useGetAvatarApi() {
  const params = ref({
    path: ''
  })

  const query = async () => params.value.path ? supabase.storage.from('avatars').download(params.value.path) : undefined

  const state = useAsyncData(`avatar-${params.value.path}`, () => query(), { watch: [() => params.value.path], lazy: true, default: undefined})
  
  const data = computed(() => state.data.value?.data)
  const error = computed(() => state.error.value)
  const loading = computed(() =>  state.status.value == 'pending' ? true : false)
  const success = computed(() =>  state.status.value == 'success' ? true : false)

  return { data, error, success, loading, execute: state.execute, params}
}