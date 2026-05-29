import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSagle } from "../actions/getters";
import type { Saga } from "../types/game";

interface Response {
  sagle: Saga | null;
  isLoading: boolean;
  isFetching: boolean;
  isFetched: boolean;
  error: Error | null;
  fetchSagleAgain: () => void;
}

export const useGetSagle = (): Response => {
  const queryClient = useQueryClient();
  const { data: sagle, isLoading, error, isFetching, isFetched } = useQuery({
    queryKey: ['sagle'],
    queryFn: getSagle,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const fetchSagleAgain = () => {
    queryClient.invalidateQueries({
      queryKey: ['sagle'],
    });
    queryClient.refetchQueries({
      queryKey: ['sagle'],
    });
  }


    return {
      sagle: sagle ?? null,
      isLoading,
      isFetching,
      isFetched,
      error,
      fetchSagleAgain, // refetch
    }
  }