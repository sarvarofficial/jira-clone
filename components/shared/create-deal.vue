<script setup lang="ts">
import type {FormError, FormSubmitEvent} from '@nuxt/ui'
import {useMutation} from "@tanstack/vue-query";
import type {ICreateDeal} from "~/types";
import {DATABASE, UNIQUE_ID} from "~/libs/appwrite";
import {DB_ID, DEALS_COL_ID} from "~/constants";
import {useAuthStore} from "~/store/auth.store";


const props = defineProps({
  status:{
    type: String,
    default:'todo',
    required:true,

  },
  refetch:{
    type:Function,
    required:true,
  }
})

const state = reactive({
  name: undefined,
  description: undefined,
})
const {currentUser}=useAuthStore()
const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({name: 'name', message: 'Required'})
  if (!state.description) errors.push({name: 'description', message: 'Required'})
  return errors
}

const toast = useToast()

const {isPending, mutate} = useMutation({
  mutationKey: ['create-deal'],
  mutationFn: (data: ICreateDeal) =>
      DATABASE.createDocument(DB_ID, DEALS_COL_ID, UNIQUE_ID, data),
  onSuccess: () =>{
    props.refetch();
    state.name=undefined;
    state.description=undefined;
    toast.add({
      title: 'Success',
      description: 'Deal created successfully',
    })
  },
  onError: (err) =>{
    toast.add({
      title: 'Error',
      description: `Something went wrong ${err.message}`,
      color:'error',
    })
  }
})

async function onSubmit(event: FormSubmitEvent<any>) {
  const {name, description}=event.data;
    mutate({
      name,
      description,
      status:props.status,
      user_id:currentUser.id
    })
}
</script>

<template>
  <UPopover>

    <UButton color="secondary" variant="ghost" class="opacity-75 hover:opacity-100 mt-3">
      <Icon name="radix-icons:plus-circled" size="35"/>

    </UButton>
    <template #content>
      <div class="w-80 p-4 bg-gray-100 dark:bg-gray-900">
        <UForm :validate="validate" :state="state" class="space-y-4 " @submit="onSubmit">
          <UFormField label="Name" name="name">
            <UInput v-model="state.name" class="w-full"/>
          </UFormField>

          <UFormField label="Description" name="description">
            <UTextarea v-model="state.description" type="text" class="w-full"/>
          </UFormField>

          <UButton type="submit"
                   class="w-full flex items-center justify-center "
                   color="secondary"
                   :disabled="isPending">
            <template v-if="isPending">
              <Icon name="svg-spinners:3-dots-move"/>
            </template>
            <template v-else>
              Submit
            </template>
          </UButton>
        </UForm>
      </div>
    </template>
  </UPopover>

</template>

<style scoped>

</style>