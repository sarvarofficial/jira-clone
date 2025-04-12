<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import {ACCOUNT, UNIQUE_ID} from "~/libs/appwrite";
import {useAuthStore} from "~/store/auth.store";

const state = reactive({
  email: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  return errors
}

const toast = useToast()
const router = useRouter()
const  authStore=useAuthStore();
async function onSubmit(event: FormSubmitEvent<typeof state>) {
await login(event.data)
}
defineProps({
  onchangeAuth:{
    type: Function,
    required: true
  }
})

const isLoading=ref(false)

async function login(payload:any) {
  try {
    isLoading.value = true;
    // await ACCOUNT.createEmailPasswordSession(payload.email, payload.password)
    const res= await ACCOUNT.get();
    authStore.setUserInfo({username: res.name, email: res.email, status: res.status})
    await router.push('/')
    toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  }catch(err: any){
    console.log(err.message)
      toast.add({title: 'Error', description: err.message, color:'error',})
  }finally {
    isLoading.value = false;
  }

}
</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4 " @submit="onSubmit">
    <UFormField label="Email" name="email" >
      <UInput v-model="state.email" class="w-full" color="secondary" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" class="w-full" color="secondary" />
    </UFormField>
  <div class="text-sm text-neutral-500">
    Not register yet?
    <span class="hover:underline text-blue-500 cursor-pointer" role="button" @click="onchangeAuth">Sign up</span>
  </div>
    <UButton type="submit"
             class="w-full flex items-center justify-center "
             color="secondary"
             :disabled="isLoading">
      <template v-if="isLoading">
        <Icon name="svg-spinners:3-dots-move"/>
      </template>
      <template v-else>
        Login
      </template>
    </UButton>

  </UForm>
</template>

