<template>
  <NuxtPage></NuxtPage>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (route.path === '/')
    router.push('/feed')
})
</script>