import { create } from "zustand";
import type { UserDB } from "../types/user";

interface CurrentUserStore {
    user: UserDB | null;
    setUser: (user: UserDB | null) => void;
}

export const useCurrentUser = create<CurrentUserStore>((set) => ({
    user: null,
    setUser: (user: UserDB | null) => set({ user: user})
}));