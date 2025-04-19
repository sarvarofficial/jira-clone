import type {IDeal} from "~/types";

const  initialState :{deal:IDeal|null; isOpen:boolean}={
    deal:null,
    isOpen:false
}


export const useCurrentDealStore=defineStore("CURRENT_DEAL",{
    state:()=>initialState,
    actions:{
        clear(){
            this.$patch(initialState);
        },
        set(deal:IDeal){
            this.deal = deal;
            this.isOpen = true;
        },
        toggle(){
            this.isOpen=!this.isOpen
        }
    }
})