<template>
  <div class="feedbar">  
    <div class="logo-bar">   
      <img width="45" class="logo" :src="logo"> 
      <h4 class="font-semibold text-gray-500">Mingles</h4> 
    </div>
    <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
      <UButton icon="i-mdi-menu"  color="grey" variant="ghost"></UButton>
      <template #item="{ item }">
        <span class="truncate">{{ item.label }}</span>
        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
      </template>
    </UDropdown>
  </div>
  <hr>
</template>

<script setup lang="ts">
import logo from '@/public/hkinect-logo.svg'

const items = [
  [{
    label: 'Profile',
    icon: 'i-mdi-account',
    to: '/profile'
  }]
]
</script>