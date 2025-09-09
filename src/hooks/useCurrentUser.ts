import { create } from "zustand";
import type { UserDB } from "../types/user";

interface CurrentUserStore {
    user: UserDB | null;
    error: string | null;
    setUser: (user: UserDB | null) => void;
    setError: (error: string | null) => void;
}

export const useCurrentUser = create<CurrentUserStore>((set) => ({
    user: null,
    error: null,
    setUser: (user: UserDB | null) => set({ user: user}),
    setError: (error: string | null) => set({ error })
}));