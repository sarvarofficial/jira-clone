<script setup lang="ts">
import {useAuthStore} from "~/store/auth.store";

const authStore=useAuthStore()
</script>

<template>
  <div class="h-[10vh] fixed top-0 left-0 right-0 bg-gray-100 dark:bg-gray-900 z-50">
    <div class="container mx-auto flex items-center h-full justify-between">
      <NuxtLink to="/" class="flex items-center space-x-1">
        <NuxtImg src="./logo.svg" alt="Logo"/>
        <span class="text-2xl font-medium">Jira software</span>
      </NuxtLink>
      <div class="flex items-center justify-end">

        <template v-if="authStore.currentUser.status">

          {{authStore.currentUser.username}}
        </template>
        <SharedThemeMode/>
        <NuxtLink to="/auth" class="flex items-center space-x-2 ml-2">
          <UButton color="secondary">
            Get it free
          </UButton>
        </NuxtLink>
        <NuxtLink to="/auth" class="flex items-center space-x-2 ml-2">
          <UButton color="secondary" variant="soft">Sign in</UButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>