import { useQuery } from "@tanstack/react-query"
import { getSagas } from "../actions/getters"
import type { Saga } from "../types/game"

interface Response {
    sagas: Saga[];
    isLoading: boolean;
    error: Error | null;
}

export const useGetSagas = (): Response => {
    const {data, isLoading, error} = useQuery({
        queryKey: ["sagas"],
        queryFn: getSagas,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60, // 1 hour
    })

    if (isLoading) {
        return { sagas: [], isLoading, error: null }
    }

    if (error) {
        return { sagas: [], isLoading: false, error }
    }

    return { sagas: data, isLoading: false, error: null }
}