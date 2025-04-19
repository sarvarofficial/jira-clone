import {ACCOUNT} from "~/libs/appwrite";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const router = useRouter()
    if(to.path === '/auth') {
        try {
            (await ACCOUNT.get())

            await router.push('/')
        }catch(err) {

        }
    }

    }
)