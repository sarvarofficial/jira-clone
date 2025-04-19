<script setup lang="ts">
import {useDeals} from "~/query/use-deals";
import {EnumStatus} from "~/types";
import {useCurrentDealStore} from "~/store/current-deal.store";
import {useDelete} from "~/query/use-delete";
import {useEditStore} from "~/store/edit-deal.store";

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
const {setEditDeal}=useEditStore()

const {data, isLoading, refetch}=useDeals(EnumStatus.produced)

const {isPending, mutate}=useDelete(refetch)

const  handleDel=(id:string)=>{
  const confirm=window.confirm(`Are you sure you want to delete this deal?`)
  if(confirm){
    mutate(id)
  }
}
</script>

<template>


  <div class="flex items-center  justify-between mx-12">
    <h1 class="text-4xl font-bold ">Produced</h1>
    <SharedCreateDeal :status="EnumStatus.produced" :refetch="refetch" />
  </div>
  <USeparator/>
  <div class="grid grid-cols-4 gap-2 mx-2" v-if="isLoading">
    <div class="my-3 dark:bg-gray-900 bg-gray-300 rounded-md p-2 animation" v-for="(item,index) in Array.from({length: 4})" :key="index">
      <USkeleton class=" w-10/12 h-4"/>
      <USkeleton class=" w-full h-1 my-3"/>
      <USkeleton class=" w-full h-8"/>
      <USkeleton class=" w-full h-6 mt-3"/>
    </div>
  </div>

  <div v-else>
    <div v-if="data?.length">
      <div class="grid grid-cols-4 gap-2 mx-2">
        <div class="mt-3 bg-gray-100  dark:bg-gray-900 rounded-md animation "
             v-for="card in (data)"
             :key="card.$id"
             role="button"
             draggable="true">
          <div class="flex items-center mx-2">
            <span class="font-bold text-lg uppercase">{{ card.name }}</span>
          </div>
          <USeparator class="my-2"/>
          <div class="opacity-55 text-sm line-clamp-1">
            {{ card.description }}
          </div>
          <div class="flex items-center mt-3 mx-2 gap-3">
            <UButton color="secondary" @click="()=>setEditDeal(card)">Edit</UButton>
            <UButton color="error" @click="()=>handleDel(card.$id)" :disabled="isPending">Delete</UButton>
          </div>
          <UButton @click="()=>set(card)" color="secondary" variant="ghost"
                   class="group w-full mt-3 flex justify-center items-center text-center hover:underline">
            <span>Learn more</span>
            <Icon name="material-symbols-light:arrow-right-alt-rounded"
                  class="group-hover:translate-x-2 transform"/>
          </UButton>
        </div>
        <Slideover/>
        <SharedModal :refetch="refetch"/>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col mt-5  items-center justify-center">
        <NuxtImg src="/no-data.svg" width="300" height="300"/>
      </div>
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