import { useQuery } from "@tanstack/react-query";
import { getAttempts } from "../actions/getters";
import { useGetUser } from "./useGetUser";
import type { AttemptResult } from "../types/game";

interface Response {
    attempts: AttemptResult[];
    isLoading: boolean;
    error: Error | null;
}

/**
 * Single source of truth for the player's attempts today.
 *
 * BUG-06: the grid is derived only from this query (no parallel store that an
 * effect could overwrite with stale data on win).
 * BUG-07: the query only runs once a session exists, and an empty list is a
 * normal state — never an error or a console warning.
 */
export const useGetAttempts = (): Response => {
    const { user } = useGetUser();

    const { data, isLoading, error } = useQuery({
        queryKey: ["attempts"],
        queryFn: getAttempts,
        enabled: !!user,
        refetchOnWindowFocus: false,
    });

    return {
        attempts: data ?? [],
        isLoading,
        error: error as Error | null,
    };
};
