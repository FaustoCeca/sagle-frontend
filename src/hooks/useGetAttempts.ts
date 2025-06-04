import { useQuery } from "@tanstack/react-query";
import { getAttemptsIds } from "../actions/getters";
import { useGetSagas } from "./useGetSagas";
import type { Saga } from "../types/game";

interface Response {
    attemptedIds: number[];
    attemptedSagas?: Saga[];
    isLoading: boolean
    error: Error | null
}


export const useGetAttempts = (): Response => {
    const { data: attemptedIds, isLoading, error } = useQuery({
        queryKey: ["attemptsIds"],
        queryFn: getAttemptsIds,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    const { sagas } = useGetSagas();

    if (isLoading) {
        return { attemptedIds: [], isLoading, error: null };
    }

    if (error) {
        return { attemptedIds: [], isLoading: false, error };
    }

    if (!attemptedIds || attemptedIds.length === 0) {
        return { attemptedIds: [], isLoading: false, error: new Error("No attempted IDs found") };
    }


    const filteredSagas = sagas
        .filter(saga => attemptedIds.includes(saga.id))
        .sort((a, b) => {
            // Sort based on the position of the ids in attemptedIds array
            return attemptedIds.indexOf(b.id) - attemptedIds.indexOf(a.id);
        });

    if (filteredSagas.length === 0) {
        return { attemptedIds: [], isLoading: false, error: null };
    }

    return { attemptedIds, isLoading: false, error: null, attemptedSagas: filteredSagas };
}