import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { setCookieSession } from "../lib/cookie";

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function applyTheme(theme: Theme) {
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
  defaultTheme = "system",
  storageKey = "actio_app_theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Applica la classe tema quando il tema cambia
  useEffect(() => {
    applyTheme(theme);
    let systemListener: ((e: MediaQueryListEvent) => void) | undefined;
    if (theme === "system" && typeof window !== "undefined") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      systemListener = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? "dark" : "light");
      };
      mql.addEventListener("change", systemListener);
      // cleanup
      return () => {
        mql.removeEventListener("change", systemListener!);
      };
    }
  }, [theme]);

  const handleSetTheme = useCallback(
    async (newTheme: Theme) => {
      try {
        await setCookieSession({
          data: {
            key: storageKey,
            value: newTheme,
          },
        });
      } catch (err) {
        console.error("Failed to set theme cookie", err);
      }
      setTheme(newTheme);
    },
    [storageKey],
  );

  const value = {
    theme,
    setTheme: handleSetTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
