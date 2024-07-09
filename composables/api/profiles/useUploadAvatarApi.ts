import { supabase } from "~/supabase/supabase";

export function useUploadAvatarApi() {
  const params = ref({
    filePath: '',
    file: undefined
  })

  const query = async () => params.value.file && params.value.filePath ? 
    supabase.storage.from('avatars').upload(params.value.filePath, params.value.file) : undefined

  const state = useAsyncData(() => query(), { watch: [() => params.value.file], immediate: false, lazy: true})
  
  const data = computed(() => state.data.value?.data)
  const error = computed(() => state.error.value)
  const loading = computed(() =>  state.status.value == 'pending' ? true : false)
  const success = computed(() => state.status.value == 'success' ? true : false)

  return { data, error, loading, success, execute: state.execute, params}
}