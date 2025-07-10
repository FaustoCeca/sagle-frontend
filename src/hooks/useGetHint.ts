import { useMutation } from "@tanstack/react-query";
import { getHint } from "../actions/getHint";
import type { Hint } from "../types/game";

interface Response {
    fetchHint: () => Promise<string>;
    hint: Hint | null;
    isPending: boolean;
    error: Error | null;
}

export const useGetHint = (): Response => {
    const {data, isPending, error, mutateAsync} = useMutation({
        mutationFn: getHint,
    })

    return {
        hint: data,
        isPending,
        error: error as Error | null,
        fetchHint: mutateAsync
    }
}