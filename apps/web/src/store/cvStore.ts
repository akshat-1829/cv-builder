import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CV {
  id: string;
  title: string;
  layout: string;
  createdAt: string;
  updatedAt: string;
  data: any;
}

interface CVState {
  cvs: CV[];
  currentCV: CV | null;
  isEditing: boolean;

  // Actions
  setCVs: (cvs: CV[]) => void;
  addCV: (cv: CV) => void;
  updateCV: (id: string, cvData: Partial<CV>) => void;
  deleteCV: (id: string) => void;
  setCurrentCV: (cv: CV | null) => void;
  setIsEditing: (editing: boolean) => void;
  clearCVs: () => void;
}

export const useCVStore = create<CVState>()(
  persist(
    (set) => ({
      cvs: [],
      currentCV: null,
      isEditing: false,

      setCVs: (cvs) => set({ cvs }),

      addCV: (cv) =>
        set((state) => ({
          cvs: [cv, ...state.cvs],
        })),

      updateCV: (id, cvData) =>
        set((state) => ({
          cvs: state.cvs.map((cv) =>
            cv.id === id ? { ...cv, ...cvData } : cv,
          ),
          currentCV:
            state.currentCV?.id === id
              ? { ...state.currentCV, ...cvData }
              : state.currentCV,
        })),

      deleteCV: (id) =>
        set((state) => ({
          cvs: state.cvs.filter((cv) => cv.id !== id),
          currentCV: state.currentCV?.id === id ? null : state.currentCV,
        })),

      setCurrentCV: (cv) => set({ currentCV: cv }),

      setIsEditing: (editing) => set({ isEditing: editing }),

      clearCVs: () =>
        set({
          cvs: [],
          currentCV: null,
          isEditing: false,
        }),
    }),
    {
      name: 'cv-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
