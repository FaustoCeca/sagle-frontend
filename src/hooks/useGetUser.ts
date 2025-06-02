import { useQuery } from "@tanstack/react-query";
import { registerUser } from "../actions/register";

export const useGetUser = () => {
    const { isLoading, error, data: userData } = useQuery({
    queryKey: ['register'],
    queryFn: registerUser,
    // Only try once and don't retry on error
    retry: false,
    // Don't refetch automatically
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

    return {
        isLoading,
        error,
        user: userData || null,
    };
}