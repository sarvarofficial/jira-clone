<script setup lang="ts">
import {sidebarItems} from "~/constants";
import { useRoute } from 'vue-router'
const route = useRoute()

</script>

<template>
  <NuxtLink v-for="(item, index) in sidebarItems" :key="index" :to="item.url">
    <UButton color="secondary" :variant="item.url===route.fullPath? 'solid':'ghost'" class="flex justify-start w-full rounded-none py-3 pl-4">
      <Icon :name="item.icon" size="18" />
      <span class="ml-2">{{ item.name }}</span>
    </UButton>
  </NuxtLink>
</template>

<style scoped>

</style>