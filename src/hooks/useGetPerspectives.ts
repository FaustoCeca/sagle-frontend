import { useQuery } from "@tanstack/react-query"
import { getPerspectives } from "../actions/getters"

export const useGetPerspectives = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ["perspectives"],
        queryFn: getPerspectives,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60, // 1 hour
    })

    if (isLoading) {
        return { perspectives: [], isLoading, error: null }
    }

    if (error) {
        return { perspectives: [], isLoading: false, error }
    }

    return { perspectives: data, isLoading: false, error: null }
}