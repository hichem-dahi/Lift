import { supabase } from "~/supabase/supabase";


export function useSignUpApi() {
  const params = reactive({ email: '', password: '' })

  const query = () => supabase.auth.signUp({
    email: params.email,
    password: params.password
  })

  const state = useAsyncData(query, { immediate: false, lazy: false })

  const data = computed(() => state.data.value?.data)
  const error = computed(() => state.error.value)
  const loading = computed(() =>  state.status.value == 'pending' ? true : false)
  const success = computed(() =>  state.status.value == 'success' ? true : false)

  return { data, error, success, execute: state.execute, loading, params };
}