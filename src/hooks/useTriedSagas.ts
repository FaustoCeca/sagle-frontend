import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Saga } from "../types/game";


export interface UseTriedSagasStore {
    triedSagas: Saga[];
    addTriedSaga: (saga: Saga) => void;
    removeTriedSaga: (saga: Saga) => void;
    clearTriedSagas: () => void; 
}

const useTriedSagasStore = create<UseTriedSagasStore>()(
    persist(
        (set) => ({
            triedSagas: [],
            addTriedSaga: (saga: Saga) =>
                set((state) => ({
                    // The new saga should be in the front of the array
                    triedSagas: [saga, ...state.triedSagas],
                })),
            removeTriedSaga: (saga: Saga) =>
                set((state) => ({
                    triedSagas: state.triedSagas.filter(
                        (s) => s.id !== saga.id
                    ),
                })),
            clearTriedSagas: () => set({ triedSagas: [] }),
        }),
        {
            name: "tried-sagas-storage", // name of the item in the storage (must be unique)
            
        }
    )
);

export default useTriedSagasStore;