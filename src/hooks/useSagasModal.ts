import { create } from "zustand";

interface SagasModalStore {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const useSagasModal = create<SagasModalStore>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));

export default useSagasModal;