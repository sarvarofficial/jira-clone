import {useQuery} from "@tanstack/vue-query";
import type {EnumStatus, IDeal} from "~/types";
import {DATABASE} from "~/libs/appwrite";
import {DB_ID, DEALS_COL_ID} from "~/constants";
import {Query} from "appwrite";
import {useAuthStore} from "~/store/auth.store";


export const useDeals = (status: EnumStatus) => {
    const {currentUser} = useAuthStore()

    return useQuery({
        queryKey: ['deals', status],
        queryFn: () => DATABASE.listDocuments(DB_ID, DEALS_COL_ID, [
            Query.equal("user_id", currentUser.id),
            Query.equal("status", status),
        ]),
        select: data => {
            const deals = data.documents as unknown as IDeal[]

            return deals.map(deal => ({
                $createdAt: deal.$createdAt,
                $id: deal.$id,
                name: deal.name,
                description: deal.description,
                status: deal.status,
            }))
        },
    })
}