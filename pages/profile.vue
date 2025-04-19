<script setup lang="ts">
 import {useAuthStore} from "~/store/auth.store";
 import {useLoadingStore} from "~/store/loading.store";
 import {ACCOUNT} from "~/libs/appwrite";

 const {currentUser}=useAuthStore()

 const router=useRouter();
 const authStore = useAuthStore()
 const loadingStore=useLoadingStore()
 const logOut =async () =>  {
   loadingStore.set(true)
   await ACCOUNT.deleteSession('current')
   await router.push('/auth')
   authStore.clearUserInfo()
   loadingStore.set(false)
 }
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <UCard class="w-1/2">
      <h1 class="text-2xl font-bold">Profile. </h1>
      <USeparator class="my-2" />
      <div class="flex items-center gap-2">
        <UAvatar :alt="currentUser.username" class="uppercase" size="xl"/>
        <div class="flex flex-col gap-1">
          <p class="text-gray-400">
            Name: <span class="text-gray-100 font-bold">
            {{ currentUser.username }}
          </span>
          </p>   <p class="text-gray-400">
            Email: <span class="text-gray-100 font-bold">
            {{ currentUser.email }}
          </span>
          </p>
        </div>
      </div>
      <UButton class="w-full mt-3" color="error" variant="soft" @click="logOut">
        Log out
      </UButton>
    </UCard>
  </div>
</template>

<style scoped>

</style>