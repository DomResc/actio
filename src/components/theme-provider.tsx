import { createContext, useContext, useEffect, useState } from "react";

// Theme type definition
export type Theme = "dark" | "light" | "system";

// Props for ThemeProvider
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

// Context state type
interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const DEFAULT_THEME: Theme = "system";
const DEFAULT_STORAGE_KEY = "app_theme";

const initialState: ThemeProviderState = {
  theme: DEFAULT_THEME,
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Helper to get theme from localStorage
function getStoredTheme(storageKey: string, fallback: Theme): Theme {
  if (typeof window === "undefined") return fallback;
  const stored = localStorage.getItem(storageKey);
  return (stored as Theme) || fallback;
}

// Helper to apply theme to document root
function applyThemeToDocument(theme: Theme) {
  if (typeof window === "undefined") return;
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = DEFAULT_STORAGE_KEY,
  ...props
}: ThemeProviderProps) {
  // State for current theme
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // On mount, update theme from localStorage
  useEffect(() => {
    setTheme(getStoredTheme(storageKey, defaultTheme));
  }, [storageKey, defaultTheme]);

  // Apply theme to document whenever it changes
  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  // Context value with persistent setter
  const contextValue: ThemeProviderState = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, newTheme);
      }
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={contextValue}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Hook to access theme context
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
