import { supabase } from "~/supabase/supabase";

export function useVerifyCodeApi() {
  const params = reactive({ email: '', code: '' })

  const query = () => supabase.auth.verifyOtp({
    email: params.email,
    token: params.code,
    type: 'email'
  })

  const state = useAsyncData(query, { immediate: false, lazy: false })

  const data = computed(() => state.data.value?.data)
  const error = computed(() => state.error.value)
  const loading = computed(() =>  state.status.value == 'pending' ? true : false)
  const success = computed(() =>  state.status.value == 'success' ? true : false)

  return { data, error, success, execute: state.execute, loading, params };


}