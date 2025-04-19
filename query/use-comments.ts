import { useQuery } from '@tanstack/vue-query'
import { Query } from 'appwrite'
import { COMMENTS_COL_ID, DB_ID } from '~/constants'
import { DATABASE } from '~/libs/appwrite'
import { useCurrentDealStore } from '~/store/current-deal.store'

export const useComments = () => {
    const storeDeal = useCurrentDealStore()
    const dealId = storeDeal.deal?.$id as string

    return useQuery({
        queryKey: ['comments', dealId],
        queryFn: () =>
            DATABASE.listDocuments(DB_ID, COMMENTS_COL_ID, [
                Query.equal('deal', dealId),
            ]),
        select: data => data.documents,
    })
}