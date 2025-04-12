
interface User {
    id: string,
    username: string,
    email: string,
    status: boolean,
}




const authState: { user: User } = {
    user: {
        id: '',
        username: '',
        email: '',
        status: false
    },

}

export const useAuthStore = defineStore("AUTH", {
    state: () => authState,
    getters: {
        currentUser: state => state.user,

    },


    actions: {


         setUserInfo( user:any ) {
           this.user = user;
         },
         clearUserInfo(  ) {
             this.user = authState.user;
         }
    },
})