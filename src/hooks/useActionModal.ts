import { create } from "zustand";

export type FormType = "saga" | "game" | "category" | "perspective" | "artStyle";

interface ActionModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  formType: FormType;
  setFormType: (type: FormType) => void;
}

const useActionModal = create<ActionModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  formType: "saga",
  setFormType: (type) => set({ formType: type })
}));

export default useActionModal;