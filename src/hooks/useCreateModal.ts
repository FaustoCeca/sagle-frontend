import { create } from "zustand";

interface CreateModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  formType: "saga" | "game" | "category" | "perspective" | "artStyle";
  setFormType: (type: "saga" | "game" | "category" | "perspective" | "artStyle") => void;
}

const useCreateModal = create<CreateModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  formType: "saga",
  setFormType: (type) => set({ formType: type })
}));

export default useCreateModal;