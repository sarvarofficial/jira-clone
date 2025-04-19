<script setup lang="ts">
import {useEditStore} from "~/store/edit-deal.store";
import type {FormError, FormSubmitEvent} from "@nuxt/ui";
import {useMutation} from "@tanstack/vue-query";
import {DATABASE} from "~/libs/appwrite";
import {DB_ID, DEALS_COL_ID} from "~/constants";

const toast = useToast()

const props = defineProps({
  refetch: {
    type: Function,
    required: true
  }
})
const store = useEditStore()
const isLocalOpen = computed({
  get: () => store.isOpen,
  set: value => (store.isOpen = value),
})

const state = reactive({
  name: store.deal?.name,
  description: store.deal?.description,
})
watch(
    () => store.deal,
    () => {
      state.name = store.deal?.name
      state.description = store.deal?.description
    }
)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({name: 'name', message: 'Required'})
  if (!state.description) errors.push({name: 'description', message: 'Required'})
  return errors
}

const {isPending, mutate} = useMutation({
  mutationKey: ['edit-deal', store.deal?.$id],
  mutationFn: (data: { id: string; name: string; description: string }) =>
      DATABASE.updateDocument(DB_ID, DEALS_COL_ID, data.id, {name: data.name, description: data.description}),
  onSuccess: () => {
    props.refetch();
    isLocalOpen.value = false

    toast.add({
      title: 'Success',
      description: 'Deal updated successfully',
    })
  },
  onError: (err) => {
    toast.add({
      title: 'Error',
      description: `Something went wrong ${err.message}`,
      color: 'error',
    })
  },

})

async function onSubmit(event: FormSubmitEvent<any>) {
  const {name, description} = event.data;
  mutate({
    id: store.deal?.$id!,
    name,
    description,

  })
}
</script>

<template>
  <UModal v-model:open="isLocalOpen" title="Modal with footer"
          description="This is useful when you want a form in a Modal." :ui="{content: 'rounded' }">

    <template #content>
      <div class=" mx-3 p-4 rounded-md bg-gray-100 dark:bg-gray-900">
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


  </UModal>
</template>

