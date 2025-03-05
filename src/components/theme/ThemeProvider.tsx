import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

    // Remove previous theme classes
    root.classList.remove("light", "dark")
    
    // Add the current theme class
    root.classList.add(isDark ? "dark" : "light")
    
    // Update CSS variables for customization
    if (isDark) {
      document.documentElement.style.setProperty("--primary-color", "hsl(var(--primary-dark))");
      document.documentElement.style.setProperty("--background-color", "hsl(var(--background-dark))");
      document.documentElement.style.setProperty("--card-color", "hsl(var(--card-dark))");
      document.documentElement.style.setProperty("--text-color", "hsl(var(--text-dark))");
    } else {
      document.documentElement.style.setProperty("--primary-color", "hsl(var(--primary-light))");
      document.documentElement.style.setProperty("--background-color", "hsl(var(--background-light))");
      document.documentElement.style.setProperty("--card-color", "hsl(var(--card-light))");
      document.documentElement.style.setProperty("--text-color", "hsl(var(--text-light))");
    }
    
  }, [theme])

  // Listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = () => {
      if (theme === "system") {
        const root = window.document.documentElement
        const isDark = mediaQuery.matches
        
        root.classList.remove("light", "dark")
        root.classList.add(isDark ? "dark" : "light")
      }
    }
    
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
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

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
