import { createContext, useContext, useEffect, useState } from "react"

const initialState = {
  theme: "system",
  setTheme: () => {},
}

const ThemeProviderContext = createContext(initialState)

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }) {
  const [theme, setThemeState] = useState(() => localStorage.getItem(storageKey) || defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    // Add a short-lived transition class so theme changes animate smoothly
    root.classList.add("theme-transition")
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    // Remove the transition helper after the animation duration
    const t = setTimeout(() => root.classList.remove("theme-transition"), 500)
    return () => clearTimeout(t)
  }, [theme])

  const value = {
    theme,
    setTheme: (t) => {
      const root = window.document.documentElement
      // ensure transition class is present when user toggles theme
      root.classList.add("theme-transition")
      localStorage.setItem(storageKey, t)
      setThemeState(t)
      // remove after animation completes
      setTimeout(() => root.classList.remove("theme-transition"), 500)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}