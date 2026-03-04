import { create } from "zustand"

type ThemeStore = {
  currentTheme: "dark" | "light"
  updateTheme: (_theme: "dark" | "light") => void
}

export const useThemeStore = create<ThemeStore>()((set) => ({
  currentTheme: "dark",
  updateTheme: (currentTheme: "dark" | "light") =>
    set(() => ({ currentTheme: currentTheme }))
}))
