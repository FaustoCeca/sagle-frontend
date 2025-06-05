import { useQuery, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../actions/register";
import type { UserDB } from "../types/user";

interface Response {
    user: UserDB;
    isLoading: boolean;
    error: Error | null;
    fetchUserAgain: () => void;
}

export const useGetUser = (): Response => {
    const queryClient = useQueryClient();
    
    const { data: userData, isLoading, error } = useQuery({
        queryKey: ['register'],
        queryFn: registerUser,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const fetchUserAgain = () => {
        queryClient.invalidateQueries({ queryKey: ['register'] });
        queryClient.refetchQueries({ queryKey: ['register'] });
    }

    return {
        user: userData,
        isLoading,
        error,
        fetchUserAgain, // refetch
    };
};