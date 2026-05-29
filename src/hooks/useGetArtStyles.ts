import { useQuery } from "@tanstack/react-query";
import { getArtStyles } from "../actions/getters";
import type { ArtStyles } from "../types/game";

interface Response {
    artStyles: ArtStyles[]
    isLoading: boolean
    error: Error | null
}


export const useGetArtStyles = (): Response => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["artStyles"],
        queryFn: getArtStyles,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    if (isLoading) {
        return { artStyles: [], isLoading, error: null };
    }

    if (error) {
        return { artStyles: [], isLoading: false, error };
    }

    return { artStyles: data ?? [], isLoading: false, error: null };
}