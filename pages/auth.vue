<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  layoutTransition: {
    name: 'slide-in'
  }
})
useHead({
  title: 'Auth | Jira',
})



const isLogin=ref(false)

const toggleAuth = () => {isLogin.value =!isLogin.value}
</script>

<template>
  <div class="flex justify-center items-center relative h-screen w-full  ">
    <NuxtImg src="/bg-auth.jpg" class="absolute inset-0 h-full w-full"/>
    <div class="absolute w-full h-full z-10 inset-0 bg-white/40 dark:bg-black/40"></div>
    <UCard class="absolute z-50 w-1/2" :ui="{body:'flex gap-4 items-center justify-center'}">
      <div class="flex-1 space-y-4">
        <h1 class="text-2xl font-bold">
          <template v-if="isLogin">Login</template>
          <template v-else>Register</template>
          </h1>
        <p class="opacity-70">Please use the following credentials to</p>
        <AuthLogin v-if="isLogin" :onchangeAuth="toggleAuth" />
        <AuthRegister v-else  :onchangeAuth="toggleAuth"/>
      </div>
      <USeparator label="OR" orientation="vertical" class="h-48"/>
      <div class="flex-1 space-y-4 flex flex-col justify-center ">
        <UButton color="neutral" block size="lg">
          <UIcon name="mdi:github" class="w-5 h-5"/>
          Login with GitHub
        </UButton>
        <UButton color="neutral" block size="lg">
          <UIcon name="mdi:google" class="w-5 h-5"/>
          Login with Google
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<style scoped>

</style>