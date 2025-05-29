import { create } from "zustand";

type UseFileState = {
  file: File | null;
  addFile: (file: File) => void;
  removeFile: () => void;
};

export const useFile = create<UseFileState>((set) => ({
  file: null,
  addFile: (file: File) => set({ file }),
  removeFile: () => set({ file: null }),
}));