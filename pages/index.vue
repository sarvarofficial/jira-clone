<script setup lang="ts">
import {tabs} from "@/constants";
import {templates} from "@/constants";
import {useAuthStore} from "~/store/auth.store";


useHead({
  title: 'Jira Software',
})
const {currentUser} = useAuthStore()

</script>

<template>
  <main class="pb-24">
    <!--  HERO SECTION  -->
    <section
        class="flex items-center justify-between h-[100vh] pt-[10vh]  bg-gradient-to-t from-white to-blue-500 dark:from-black dark:to-blue-800">
      <div class="flex-col pl-20 space-y-3">
        <h1 class="text-5xl">Move fast, stay aligned, and build better - together</h1>
        <p>The #1 software development tool used by agile teams</p>
        <template v-if="currentUser.status">
          <NuxtLink to="/documents">
            <UButton color="secondary" variant="outline"> Documents</UButton>
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/auth" >
            <UButton color="secondary"> Try it free</UButton>
          </NuxtLink>
        </template>
      </div>

      <NuxtImg src="./hero.webp"/>
    </section>
    <!--  HERO SECTION END  -->

    <!--  TABS SECTION START  -->
    <section>
      <h1 class="text-4xl font-medium px-4">
        All from a single source of truth
      </h1>
      <div class="flex justify-start ">
        <UTabs :items="tabs" class="mt-6 px-4 items-start justify-start"
               :ui="{
              list: 'w-auto',
              trigger: 'shrink-0  basis-auto w-auto max-w-auto',
              // label: 'text-center'
              }"
               color="secondary">
          <template #content="{ item }">
            <div class="flex  justify-between gap-6 mt-8">
              <div class="w-[40%]">
                <h1 class="text-4xl font-bold">{{ item.label }}</h1>
                <p class="mt-6 text-xl">{{ item.description }}</p>
                <div
                    class="py-4 mt-12 rounded-r-full flex flex-col gap-2 bg-gradient-to-r from-white to-blue-500 dark:from-black dark:to-blue-800">
                  <Icon name="bxs:quote-alt-left" class="text-7xl"/>
                  <p class="text-lg pl-2">{{ item.credentials.text }}</p>
                  <div class="pl-2 opacity-70">
                    <p class="font-bold">{{ item.credentials.username }}</p>
                    <p class="text-sm">{{ item.credentials.company }}</p>
                  </div>
                </div>
              </div>
              <NuxtImg :src="item.image" class="w-[60%]"/>
            </div>
          </template>
        </UTabs>
      </div>
    </section>
    <!--    Some shit   -->
    <section>
      <h1 class="text-4xl font-medium mt-20 text-center">Easier than ever</h1>
      <div class="flex justify-between items-center max-w-xl mx-auto mt-4">
        <div class="w-16 h-16 rounded-full bg-blue-500 dark:bg-blue-800 flex items-center justify-center">
          <Icon name="material-symbols:file-copy" class="text-4xl text-white"/>
        </div>
        <div class="h-2 flex-1  bg-gradient-to-r from-blue-500 to-bg-gray-500 dark:from-bg-blue-800 dark:to-gray-800 ">

        </div>

        <div class="w-16 h-16 rounded-full bg-gray-500 dark:bg-gray-800 flex items-center justify-center">
          <Icon name="material-symbols-light:linked-services" class="text-4xl text-white"/>

        </div>
      </div>

      <div class="grid grid-cols-2 mt-20">
        <div class="bg-blue-500 dark:bg-blue-800 p-8">
          <div class="flex flex-col space-y-2 items-center">
            <h1 class="text-2xl font-medium">Templates give you a head start</h1>
            <p class="text-xl">
              Get started with ready-made template</p>
          </div>
          <div v-for="(item, index) in templates" :key="index">
            <div class="flex flex-col mt-5">
              <div class="flex bg-gray-500 dark:bg-gray-800 h-20">
                <div class="flex justify-center items-center bg-blue-500/30 dark:bg-blue-800/30 p-3 h-full">
                  <NuxtImg :src="item.image" class="w-12"/>
                </div>
                <div class="flex flex-col p-2 justify-between">
                  <h1 class="text-xl font-bold">{{ item.name }}</h1>
                  <div class="group flex  items-center hover:underline" role="button">
                    <span>Learn more</span>
                    <Icon name="material-symbols-light:arrow-right-alt-rounded"
                          class="group-hover:translate-x-2 transform"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
              class="py-4 mt-12 rounded-r-full flex flex-col gap-2 bg-gradient-to-l from-gray-500 to-blue-500 dark:from-from-gray-800 dark:to-blue-800">
            <Icon name="bxs:quote-alt-left" class="text-7xl"/>
            <p class="text-lg pl-2">
              You can decide how you are working as a team first and then let
              the software work around you."
            </p>
            <div class="pl-2 opacity-70">
              <p class="font-bold">MARIA BONORCHIS</p>
              <p class="text-sm">AGILE DELIVERY MANAGER, CANCER RESEARCH UK</p>
            </div>
          </div>
        </div>
        <div class="bg-gray-500 dark:bg-gray-800 p-8">
          <div class="flex flex-col space-y-6 items-center">
            <div class="text-center">

              <h1 class="text-2xl font-medium">Then customize as you grow</h1>
              <p class="text-xl text-center">Jira adapts to the way you work, not other way around. Start simple
                customize, as you go</p>
            </div>
            <NuxtImg src="./product.webp"/>
          </div>
        </div>

      </div>

    </section>
  </main>


</template>

<style scoped>

</style>