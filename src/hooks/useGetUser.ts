import { useQuery, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../actions/register";

export const useGetUser = () => {
    const queryClient = useQueryClient();
    
    const { data: userData, isLoading, error } = useQuery({
        queryKey: ['register'],
        queryFn: registerUser,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const fetchUserAgain = queryClient.invalidateQueries({
        queryKey: ['register'],
    });

    return {
        user: userData,
        isLoading,
        error,
        fetchUserAgain, // refetch
    };
};