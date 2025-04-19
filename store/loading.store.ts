

export const useLoadingStore= defineStore('LOADING',{
    state:()=>({
        isLoading:true
    }),
    actions:{
        set(isLoading:boolean,){
            this.$patch({isLoading})
        }
    }
})