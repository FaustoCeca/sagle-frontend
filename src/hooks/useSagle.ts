import { create } from "zustand";
import type { Saga } from "../types/game";

interface UseSagleStore {
    sagle: Saga | null;
    setSagle: (sagle: Saga | null) => void;
    foundedSagle: boolean;
    setFoundedSagle: (foundedSagle: boolean) => void;
}

const useSagleStore = create<UseSagleStore>((set) => ({
    sagle: null,
    setSagle: (sagle) => set({ sagle }),
    foundedSagle: false,
    setFoundedSagle: (foundedSagle) => set({ foundedSagle }),
}));

export default useSagleStore;