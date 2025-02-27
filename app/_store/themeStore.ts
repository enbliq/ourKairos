import { create } from 'zustand'

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: "light",
  setTheme: (mode) => set({ mode }),
  toggleTheme: () => set((state) => ({
    mode: state.mode === "light" ? "dark" : "light"
  })),
})); 