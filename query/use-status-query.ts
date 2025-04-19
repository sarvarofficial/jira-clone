import {useQuery} from '@tanstack/vue-query'
import {DATABASE} from "~/libs/appwrite";
import {DB_ID, DEALS_COL_ID, statuses} from "~/constants";
import {Query} from "appwrite";
import {useAuthStore} from "~/store/auth.store";
import type {IColumn } from "~/types";

export const useStatusQuery = () => {
    const {currentUser} = useAuthStore()
    return useQuery({
        queryKey: ['deals'],
        queryFn:async () => {
            return DATABASE.listDocuments(DB_ID, DEALS_COL_ID, [
                Query.equal('user_id', currentUser.id)
            ])
        },
        select: (data) => {
            const newBoard: IColumn[] =statuses.map(item=>({
                ...item,
                items:[]
            }))

         const deals=data.documents;
            for(const deal of deals){
                const column=newBoard.find(item=>item.status === deal.status);
                if(column){
                    column.items.push({
                        $id:deal.$id,
                        $createdAt:deal.$createdAt,
                        name: deal.name,
                        description: deal.description,
                        status:deal.status
                    })
                }
            }
            return newBoard;
        }
       },
    )
}