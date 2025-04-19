<script setup lang="ts">

import {useCurrentDealStore} from "~/store/current-deal.store";

const store=useCurrentDealStore()
const isLocalOpen = computed({
  get: () => store.isOpen,
  set: value => (store.isOpen = value),
})

</script>

<template>
  <USlideover
      v-model:open="isLocalOpen"
      :ui="{
        overlay: 'bg-transparent pointer-events-none',
        wrapper: 'z-50',
        content: 'z-50'
        }"
  >
    <template #content>
      <div class="h-full m-4 " >
      <SlideoverTop/>
    <USeparator class="my-5" />
        <SlideoverComments />

      </div>
    </template>
  </USlideover>
</template>

<style scoped>

</style>