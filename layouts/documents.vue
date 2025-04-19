<script setup lang="ts">
import {useAuthStore} from "~/store/auth.store";
import {useLoadingStore} from "~/store/loading.store";
import {ACCOUNT} from "~/libs/appwrite";

const authStore = useAuthStore()
const loaderStore = useLoadingStore()
const toast = useToast()

onMounted(() => {
  ACCOUNT.get().then(result => {
    authStore.setUserInfo({
      id: result.$id,
      username: result.name,
      email: result.email,
      status: result.status,
    },);
  }).catch(err => {
    toast.add(err.message)
  }).finally(() => {
    loaderStore.set(false)
  })
})

</script>

<template>
  <UiLoader v-if="loaderStore.isLoading"/>
  <template v-else>
    <layouts-sidebar/>
    <layouts-documents-navbar/>
    <section class="min-h-screen bg-white dark:bg-black pl-72 pt-[10vh]">
      <slot/>
    </section>
  </template>
</template>

<style scoped>

</style>