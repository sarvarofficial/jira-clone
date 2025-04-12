<script setup lang="ts">
import type {FormError, FormSubmitEvent} from '@nuxt/ui'
import {ACCOUNT, UNIQUE_ID} from "~/libs/appwrite";
import {useAuthStore} from "~/store/auth.store";

const state = reactive({
  username: undefined,
  email: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.username) errors.push({name: 'username', message: 'Required'})
  if (!state.email) errors.push({name: 'email', message: 'Required'})
  if (!state.password) errors.push({name: 'password', message: 'Required'})
  return errors
}

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  await register(event.data)
}

defineProps({
  onchangeAuth: {
    type: Function,
    required: true,
  }
})
const isLoading = ref(false)

async function register(payload: any) {
  try {
    isLoading.value = true;
    const res = await ACCOUNT.create(UNIQUE_ID, payload.email, payload.password, payload.username);
    // await ACCOUNT.createEmailPasswordSession(payload.email, payload.password)
    authStore.setUserInfo({username: res.name, email: res.email, status: res.status})
    await router.push('/')
  } catch (err: any) {
    toast.add({title: 'Error', description: err.message, color: 'error',})
  } finally {
    isLoading.value = false;
  }

}

</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4 " @submit="onSubmit">
    <UFormField label="Username" name="username">
      <UInput v-model="state.username" class="w-full" color="secondary"/>
    </UFormField>

    <UFormField label="Email" name="email">
      <UInput v-model="state.email" class="w-full" color="secondary"/>
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" class="w-full" color="secondary"/>
    </UFormField>
    <div class="text-sm text-neutral-500">
      Already have account?
      <span class="hover:underline text-blue-500 cursor-pointer" role="button" @click="onchangeAuth">Sign in</span>
    </div>

    <UButton type="submit"
             class="w-full flex items-center justify-center "
             color="secondary"
             :disabled="isLoading">
      <template v-if="isLoading">
        <Icon name="svg-spinners:3-dots-move"/>
      </template>
      <template v-else>
        Register
      </template>
    </UButton>
  </UForm>
</template>

