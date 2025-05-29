import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../actions/getters"

export const useGetCategories = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60, // 1 hour
    })

    if (isLoading) {
        return { categories: [], isLoading, error: null }
    }

    if (error) {
        return { categories: [], isLoading: false, error }
    }

    return { categories: data, isLoading: false, error: null }
}