<template>
  <div class="flex flex-col items-center justify-center">  
    <UAvatar size="xl" :src="avatarSrc" />
    <div class="text-center p-3" :style="{ width: size + 'em' }">
      <label class="font-semi-bold text-sm text-blue-500"for="single">
        {{ uploadAvatarApi.loading.value ? 'Uploading ...' : 'Edit profile image' }}
      </label>
      <input
        style="visibility: hidden; position: absolute"
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

const props = defineProps<{ path: string, size: number }>()
const emit = defineEmits(['upload', 'update:path'])

const uploadAvatarApi = useUploadAvatarApi()
const getAvatarApi = useGetAvatarApi()

const { path, size } = toRefs(props)
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
  if(success) {
    emit('update:path', uploadAvatarApi.params.value.filePath)
    emit('upload')
  }
})

watch(path, (newPath) => {
  if(newPath) getAvatarApi.params.value.path = newPath
}, 
{ immediate: true })

</script>~/composables/api/profiles/useGetAvatarApi~/composables/api/profiles/useUploadAvatarApi