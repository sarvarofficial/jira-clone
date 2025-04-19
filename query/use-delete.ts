import {useMutation} from "@tanstack/vue-query";
import {DATABASE} from "~/libs/appwrite";
import {DB_ID, DEALS_COL_ID} from "~/constants";


export const useDelete = (refetch: Function) => {
    const toast = useToast();
    const {isPending, mutate} = useMutation({
        mutationKey: ["delete-deals"],
        mutationFn: (id: string) => DATABASE.deleteDocument(DB_ID, DEALS_COL_ID, id),
        onSuccess: () => {
            refetch();
            toast.add(
                {
                    title: "Success",
                    description: "Successfully deleted document",
                })
        },
        onError: (err) => {
            toast.add(
                {
                    title: "Errr",
                    description: `Failed to delete document ${err.message}`,
                    color: "error"
                })
        }
    })
    return { isPending, mutate };
}