<template>
  <div :class="`${isLongForm ? 'profile-long-form' : 'profile-short-form'}`">
    <div class="w-2/6 py-1">{{ title }}</div>

    <div class="w-3/6">
      <UInput v-if="!isLongForm" 
        :disabled="!isModify" 
        :variant="isModify ? 'outline': 'non'"  
        size="xs" 
        v-model.trim="proxyValue" />
      <UTextarea v-else 
        :disabled="!isModify" 
        :variant="isModify ? 'outline': 'non'"  
        size="xs" 
        v-model.trim="proxyValue" />
    </div>

    <div class="profile-form-actions flex items-start justify-end w-1/6">
      <UButton v-if="!isModify" 
        class="profile-form-icon"
        @click="isModify = true"  
        size="md" 
        color="grey" 
        variant="ghost" 
        icon="i-mdi-chevron-right" />

      <div v-else class="center-line">
        <UButton class="profile-form-icon" 
          @click="cancelChange()" 
          size="xs" 
          color="grey" 
          :disabled="loading"
          variant="ghost" 
          icon="i-mdi-close" />
        <UButton class="profile-form-icon" 
          @click="confirmChange()" 
          size="xs" 
          :loading="loading"
          color="grey" 
          variant="ghost" 
          icon="i-mdi-check" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUpdateProfileApi } from '~/composables/api/profiles/useUpdateProfileApi';
import { ProperProfileInfoKeys, type User} from '~/models/User';

const props = defineProps<{formKey: keyof User, postId: string | undefined}>()
const model = defineModel<any>()

const toast = useToast()
const { error, success, loading, params } = useUpdateProfileApi()

const proxyValue = ref(model.value)
const isModify = ref(false)

const title = computed(() => ProperProfileInfoKeys[props.formKey])
const isLongForm = computed(() => props.formKey.includes('bio') || false)

function confirmChange() {
  model.value = proxyValue.value
  nextTick(() => {
    isModify.value = false
    params.value.profileForm = { id: props.postId, [props.formKey]: model.value, updated_at: new Date() }
  })
}

function cancelChange() {
  proxyValue.value = model.value || ''
  isModify.value = false
}

watch(success, (success) => {
  if(success) toast.add({ title: 'Your profile has been updated successfully', color: 'green' })
})

watch(error, (error) => {
  if(error) toast.add({ title: 'Your profile hasn\'t been updated successfully', color: 'red' })
})

</script>