<script setup lang="ts">

</script>

<template>
  <div class="fixed top-0 left-0 w-72 h-screen border-r border-r-gray-200 bg-gray-300 dark:bg-gray-900 pt-4">

    <div class="flex flex-col ">
      <NuxtLink to="/" class="flex items-center space-x-1 pt-2 ml-2 mb-6">
        <NuxtImg src="./logo.svg" alt="Logo"/>
        <span class="text-2xl font-medium">Jira software</span>
      </NuxtLink>
      <SharedSidebarItems />
    </div>
  </div>
</template>

<style scoped>

</style>