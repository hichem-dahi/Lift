<template>
  <div class="py-1 center-line justify-between w-1/2"> 
    <UButton @click="router.go(-1)" size="xl" color="grey" variant="ghost" icon="i-mdi-chevron-left" />
    <div class="font-semi-bold">Profile</div> 
  </div>
  <hr>

  <div class="center-line justify-center p-4 mt-3">
    <div class="flex flex-col items-center justify-center">  
      <UAvatar size="xl" src="https://avatars.githubusercontent.com/u/739984?v=4" />
      <div class="font-semi-bold text-sm text-blue-500 p-3">Edit profile image</div>
    </div>
  </div>

  <div class="p-4">
    <template v-for="(_,key) in formUser" :key="key">
      <ProfileLine 
        v-if="ProperProfileFormKeys[key]"
        :key="key" 
        :formKey="key"
        v-model="formUser[key]"
        />
    </template>
  </div>
</template>

<script setup lang="ts">
import usersJson from '@/data/users.json'
import { ProperProfileFormKeys, type FormUser } from '~/models/User';

const router = useRouter()
const usersData = ref(usersJson)

const formUser = reactive<FormUser>(usersData.value[0])

watch(formUser, (newForm) => {
  console.log('====================================');
  console.log('send post req, param: newForm', newForm);
  console.log('====================================');
})
</script>