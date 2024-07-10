import type { User } from "~/models/User";
import { supabase } from "~/supabase/supabase";

export interface updateProfileParams {
  profileForm: User | undefined
}

export function useUpdateProfileApi() {
  const params = ref<updateProfileParams>({
    profileForm: undefined
  })

  const query = async () => params.value.profileForm ? supabase.from('profiles').update(params.value.profileForm) : undefined

  const state = useAsyncData(() => query(), { watch: [() => params.value.profileForm], immediate: false, lazy: true })

  const data = computed(() => state.data.value?.data)
  const error = computed(() => state.error.value)
  const loading = computed(() =>  state.status.value == 'pending' ? true : false)
  const success = computed(() =>  state.status.value == 'success' ? true : false)

  return { data, error, loading, success, params }
}