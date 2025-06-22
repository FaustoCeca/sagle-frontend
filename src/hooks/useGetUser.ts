import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserDB } from "../types/user";
import { createSession, getCurrentSession } from "../actions/session";

interface Response {
    user: UserDB;
    isLoading: boolean;
    error: Error | null;
    fetchUserAgain: () => void;
}

export const useGetUser = (): Response => {
    const queryClient = useQueryClient();
    
    const { data: userData, isLoading, error } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            try {
                // Primero intentamos obtener la sesión actual
                // Si hay cookie, el backend la leerá automáticamente
                const user = await getCurrentSession();
                
                // Si la respuesta tiene datos, significa que la cookie es válida
                if (user) {
                    return user;
                }
            } catch (error) {
                console.log("No existing session found or it's invalid");
                // Si hay un error, simplemente continuamos con el flujo
            }

            // Si no hay sesión existente o es inválida, creamos una nueva
            return await createSession();
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