<template>
  <div class="flex flex-col items-center justify-center">  
    <UAvatar size="3xl" :src="avatarSrc" />
    <div class="flex text-center p-3">
      <label class="font-semi-bold text-sm text-blue-500" for="single">
        {{ uploadAvatarApi.loading.value ? 'Uploading ...' : 'Edit profile image' }}
      </label>
      <input
        class="absolute left-1/3 flex-shrink w-1/2 hidden"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploadAvatarApi.loading.value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUploadAvatarApi } from '~/composables/api/profiles/useUploadAvatarApi';
import { useGetAvatarApi } from '~/composables/api/profiles/useGetAvatarApi';
import { useUpsertProfileApi } from '~/composables/api/profiles/useUpsertProfileApi';

const props = defineProps<{postId: string | undefined }>()
const emit = defineEmits(['upload', 'update:path'])

const uploadAvatarApi = useUploadAvatarApi()
const getAvatarApi = useGetAvatarApi()
const upsertProfileApi = useUpsertProfileApi()

const path = defineModel<string>()
const files = ref()

const avatarSrc = computed(() => {
  return getAvatarApi.data.value ? URL.createObjectURL(getAvatarApi.data.value) : undefined
})

const uploadAvatar = async (evt: any) => {
  files.value = evt.target.files
  if (!files.value || files.value.length === 0) {
    throw new Error('You must select an image to upload.')
  }

  let file = files.value[0]
  const fileExt = file.name.split('.').pop()
  const filePath = `${Math.random()}.${fileExt}`
  file = await resizeAvatar(file, fileExt)

  uploadAvatarApi.params.value.file = file
  uploadAvatarApi.params.value.filePath = filePath
}

watch(() => uploadAvatarApi.success.value, (success) => {
  if(success && props.postId) {
    upsertProfileApi.params.value.profileForm = {
      id: props.postId, 
      avatar_url: uploadAvatarApi.params.value.filePath  
    }
  }
})

watch(path, (newPath) => {
  if(newPath) getAvatarApi.params.value.path = newPath
}, 
{ immediate: true }
)

const toast = useToast()

watch(() => upsertProfileApi.success.value, (success) => { 
  if (success) {
    path.value = uploadAvatarApi.params.value.filePath 
    toast.add({title: 'Your avatar has been updated successfully', color: 'blue'})
  }
})

watch(() => upsertProfileApi.error.value, (error) => {
  if(error) toast.add({title: 'Your avatar hasn\'t been updated successfully', color: 'red'})
})

</script>