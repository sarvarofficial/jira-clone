<script setup lang="ts">
import {ACCOUNT} from "~/libs/appwrite";
import {useAuthStore} from "~/store/auth.store";
import {useLoadingStore} from "~/store/loading.store";
const authStore=useAuthStore()
const loaderStore=useLoadingStore()
const toast=useToast()
onMounted(()=>{
  ACCOUNT.get().then(result=>{
    console.log(result)
    authStore.setUserInfo({
      id: result.$id,
      username: result.name,
      email: result.email,
      status: result.status,
    },);
  }).catch(err=>{
    toast.add(err.message)
  }).finally(()=>{
    loaderStore.set(false)
  })
})
</script>

<template>

<UiLoader v-if="loaderStore.isLoading"/>
<template v-else>
  <LayoutsMainNavbar/>

  <section class=" bg-white dark:bg-black h-screen">
    <slot/>
  </section>
</template>
</template>

<style scoped>

</style>