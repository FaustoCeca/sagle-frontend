import { create } from "zustand";

interface HowToPlayModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useHowToPlayModal = create<HowToPlayModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useHowToPlayModal;