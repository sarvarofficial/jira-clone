<script setup lang="ts">
import {useAuthStore} from "~/store/auth.store";
import {ACCOUNT} from "~/libs/appwrite";
import {useLoadingStore} from "~/store/loading.store";
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
  <UPopover  mode="hover"  :popper="{placement: 'bottom'}">
    <UAvatar
        :alt="authStore.currentUser.username.toUpperCase()" class="bg-gray-100" size="md"/>
    <template #content>
      <div class=" p-4 w-72 bg-white dark:bg-black rounded-md">
        <p class="text-neutral-600 text-sm font-600 ">{{authStore.currentUser.email}}</p>
        <div class="flex items-center justify-start py-1">
      <div class="rounded-sm bg-gray-300 p-2">
        <UAvatar
            :alt="authStore.currentUser.username.toUpperCase()" class="bg-gray-100 m-0" size="md"/>
      </div>
          <p class="capitalize text-md font-bold ml-2">{{authStore.currentUser.username}}'s Documents</p>
        </div>
        <USeparator class="py-3"/>
        <NuxtLink to="/profile">
          <UButton class="w-full" color="secondary" variant="soft">
            Profile
          </UButton>
        </NuxtLink>
          <UButton class="w-full mt-3" color="error" variant="soft" @click="logOut">
            Log out
          </UButton>


      </div>
    </template>
  </UPopover>
</template>


<style scoped>

</style>