import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserDB } from "../types/user";
import { createSession, getCurrentSession } from "../actions/session";
import { useCurrentUser } from "./useCurrentUser";

interface Response {
    user: UserDB;
    isLoading: boolean;
    error: Error | null;
    fetchUserAgain: () => void;
}

export const useGetUser = (): Response => {
    const queryClient = useQueryClient();
    const setError = useCurrentUser((state) => state.setError);

    const { data: userData, isLoading, error } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const user = await getCurrentSession();

            if (user) return user;

            const newUser = await createSession();

            if (!newUser) {
                setError("Failed to create a new user session.");
            }

            return newUser;
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const fetchUserAgain = () => {
        queryClient.invalidateQueries({ queryKey: ['session'] });
        queryClient.refetchQueries({ queryKey: ['session'] });
    }

    return {
        user: userData,
        isLoading,
        error,
        fetchUserAgain,
    };
};