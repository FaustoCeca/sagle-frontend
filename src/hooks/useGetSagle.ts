import { useQuery } from "@tanstack/react-query";
import { getSagle } from "../actions/getters";

export const useGetSagle = () => {
        const { data: sagle, isLoading, error } = useQuery({
        queryKey: ['sagle'],
        queryFn: getSagle,
      });
    
    return {
        sagle,
        isLoading,
        error,
    }
}