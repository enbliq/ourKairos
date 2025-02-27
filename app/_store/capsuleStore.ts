import { create } from 'zustand'

export interface Capsule {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  openAt: string;
}

interface CapsuleState {
  capsules: Capsule[];
  loading: boolean;
  error: string | null;
  setCapsules: (capsules: Capsule[]) => void;
  addCapsule: (capsule: Capsule) => void;
  updateCapsule: (capsule: Capsule) => void;
  deleteCapsule: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
} 

export const useCapsuleStore = create<CapsuleState>((set) => ({
  capsules: [],
  loading: false,
  error: null,
  setCapsules: (capsules) => set({ capsules }),
  addCapsule: (capsule) => set((state) => ({
    capsules: [...state.capsules, capsule]
  })),
  updateCapsule: (capsule) => set((state) => ({
    capsules: state.capsules.map(c => 
      c.id === capsule.id ? capsule : c
    )
  })),
  deleteCapsule: (id) => set((state) => ({
    capsules: state.capsules.filter(c => c.id !== id)
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
})) 