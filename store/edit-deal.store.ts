import type {IDeal} from "~/types";

const  initialState :{deal:IDeal|null; isOpen:boolean}={
    deal:null,
    isOpen:false
}


export const useEditStore=defineStore("EDIT_DEAL",{
    state:()=>initialState,
    actions:{
        clear(){
            this.$patch(initialState);
        },
        setEditDeal(deal:IDeal){
            this.deal = deal;
            this.isOpen = true;
        },
        toggle(){
            this.isOpen=!this.isOpen
        }
    }
})