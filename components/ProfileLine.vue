<template>
  <div :class="`${isLongForm ? 'profile-long-form' : 'profile-short-form'}`">
    <div class="w-2/6 py-1">{{ title }}</div>

    <div class="w-3/6">
      <UInput v-if="!isLongForm" 
        :disabled="!isModify" 
        :variant="isModify ? 'outline': 'non'"  
        size="xs" 
        v-model.trim="valueTmp" />
      <UTextarea v-else 
        :disabled="!isModify" 
        :variant="isModify ? 'outline': 'non'"  
        size="xs" 
        v-model.trim="valueTmp" />
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
          variant="ghost" 
          icon="i-mdi-close" />
        <UButton class="profile-form-icon" 
          @click="confirmChange()" 
          size="xs" 
          color="grey" 
          variant="ghost" 
          icon="i-mdi-check" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProperProfileInfoKeys, type User} from '~/models/User';

const props = defineProps<{formKey: keyof User}>()
const emits = defineEmits(['update-profile'])
const value = defineModel<any>()

const valueTmp = ref(value.value)
const isModify = ref(false)

const title = computed(() => ProperProfileInfoKeys[props.formKey])

const isLongForm = computed(() => props.formKey.includes('bio') || false)

function confirmChange() {
  value.value = valueTmp.value
  isModify.value = false
  emits('update-profile')
}

function cancelChange() {
  valueTmp.value = value.value 
  isModify.value = false
}
</script>