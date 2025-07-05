import { create } from "zustand";
import type { Saga } from "../types/game";


export interface UseTriedSagasStore {
    triedSagas: Saga[];
    addTriedSaga: (saga: Saga) => void;
    removeTriedSaga: (saga: Saga) => void;
    clearTriedSagas: () => void; 
    setTriedSagas?: (sagas: Saga[]) => void; // Optional setter for initial state
}

const useTriedSagasStore = create<UseTriedSagasStore>()((set) => ({
    triedSagas: [],
    addTriedSaga: (saga: Saga) =>
        set((state) => ({
            triedSagas: [saga, ...state.triedSagas],
        })),
    removeTriedSaga: (saga: Saga) =>
        set((state) => ({
            triedSagas: state.triedSagas.filter(
                (s) => s.id !== saga.id
            ),
        })),
    setTriedSagas: (sagas: Saga[]) => set({ triedSagas: sagas }),
    clearTriedSagas: () => set({ triedSagas: [] }),
}));

export default useTriedSagasStore;