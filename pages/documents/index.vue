  <script setup lang="ts">
  import {DB_ID, DEALS_COL_ID, statuses} from "~/constants";
  import {useStatusQuery} from "~/query/use-status-query";
  import {useMutation} from "@tanstack/vue-query";
  import {DATABASE} from "~/libs/appwrite";
  import type {IColumn, IDeal} from "~/types";
  import {useCurrentDealStore} from "~/store/current-deal.store";

  definePageMeta({
    layout: 'documents',
    layoutTransition: {
      name: 'slide-in'
    }
  })
  useHead({
    title: 'Auth | Jira',
  })

  const {set}=useCurrentDealStore()
  const dragCardRef=ref<IDeal|null>(null);
  const sourceColumnRef=ref<IColumn|null>(null)
  const isMoving=ref(false)

  const {data, isLoading, refetch} = useStatusQuery()

  const {isPending, mutate} = useMutation({
    mutationKey: ['moveCard'],
    mutationFn: ({cardId, status}: {
      cardId: string;
      status: string
    }) => DATABASE.updateDocument(DB_ID, DEALS_COL_ID, cardId, {status}),
    onSuccess:()=> refetch()
  })


  const handleDrop = (column:IColumn) => {
    isMoving.value = false;
    if (dragCardRef.value&&sourceColumnRef.value) {
      mutate({cardId:dragCardRef.value.$id, status:column.status})
    }
  }
  const handleDragStart = (card:IDeal, column:IColumn) => {
    isMoving.value = true;
    dragCardRef.value = card;
    sourceColumnRef.value = column;
  }

</script>

<template>
  <div class="grid grid-cols-4 mt-8 mx-4 gap-4" v-if="isLoading">

    <USkeleton class="h-8 w-full dark:bg-gray-900 bg-gray-200"/>
    <USkeleton class="h-8 w-full dark:bg-gray-900 bg-gray-200"/>
    <USkeleton class="h-8 w-full dark:bg-gray-900 bg-gray-200"/>
    <USkeleton class="h-8 w-full dark:bg-gray-900 bg-gray-200"/>

    <UiDealsLoader/>
    <UiDealsLoader/>
    <UiDealsLoader/>
    <UiDealsLoader/>

  </div>
  <div class="grid grid-cols-4 mt-8 mx-4 space-x-4" v-else>

    <div v-for="(col,index) in data" :key="index"
         class="text-center"
         :class="isMoving && 'border-l-2 border-r-2 border-dotted h-screen dark:border-gray-900 border-gray-200'"
         @dragover.prevent @drop="()=>handleDrop(col)">
      <UButton class="justify-center w-full" color="secondary" variant="outline">
        <span class="font-bold">{{ col.name }}</span>
        <span class="text-sm text-neutral-500">{{ col.items.length }}</span>
      </UButton>
      <SharedCreateDeal :status="col.status" :refetch="refetch"/>
      <div class="my-3 bg-gray-100  dark:bg-gray-900 rounded-md animation "
           v-for="(card,index) in (col.items)"
           :key="index"
           role="button"
           @dragstart="()=>handleDragStart(card,col)"
           :class="isPending && 'opacity-50 cursor-not-allowed'"
           draggable="true">
        <div class="flex items-center mx-2">
          <span class="font-bold text-lg uppercase">{{ card.name }}</span>
        </div>
        <USeparator class="my-2"/>
        <div class="opacity-55 text-sm line-clamp-1">
          {{ card.description }}
        </div>
        <UButton @click="()=>set(card)" color="secondary" variant="ghost" class="group w-full my-3 flex justify-center items-center text-center hover:underline">
          <span>Learn more</span>
          <Icon name="material-symbols-light:arrow-right-alt-rounded"
                class="group-hover:translate-x-2 transform"/>
        </UButton>
      </div>
      <Slideover />
    </div>
  </div>
</template>

<style scoped>
@keyframes show {
  from {
    transform: scale(0.5) translateX(-30px);
    opacity: 0.4;
  }
  to {
    transform: scale(1) translateX(0);
    opacity: 1;
  }
}

.animation {
  animation: show .3s ease-in-out;
}
</style>