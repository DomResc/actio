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

  let targetTheme: string;
  if (theme === "system") {
    targetTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } else {
    targetTheme = theme;
  }

  // Applica solo se la classe non è già quella corretta
  const currentTheme = root.classList.contains("dark")
    ? "dark"
    : root.classList.contains("light")
      ? "light"
      : "";

  if (currentTheme !== targetTheme) {
    root.classList.remove("light", "dark");
    root.classList.add(targetTheme);
  }
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "actio_app_theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Applies the theme class when the theme changes
  useEffect(() => {
    applyTheme(theme);
    let systemListener: ((e: MediaQueryListEvent) => void) | undefined;
    if (theme === "system" && typeof window !== "undefined") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      systemListener = (e: MediaQueryListEvent) => {
        const root = window.document.documentElement;
        const newTheme = e.matches ? "dark" : "light";
        const currentTheme = root.classList.contains("dark")
          ? "dark"
          : root.classList.contains("light")
            ? "light"
            : "";

        // Apply only if the class is not already correct
        if (currentTheme !== newTheme) {
          root.classList.remove("light", "dark");
          root.classList.add(newTheme);
        }
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

export function getInlineThemeScript(cookieName: string = "actio_app_theme") {
  return `
(function() {
  // Reads the value of a cookie
  function getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  // Get the theme from the cookie
  var theme = getCookie("${cookieName}");
  var resolvedTheme;
  
  // If not set or 'system', use system preference
  if (!theme || theme === 'system') {
    resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } else {
    resolvedTheme = theme;
  }
  
  // Apply the theme class to the <html> element only if different from the current one
  var html = document.documentElement;
  var currentClass = html.classList.contains('dark') ? 'dark' : html.classList.contains('light') ? 'light' : '';
  
  if (currentClass !== resolvedTheme) {
    html.classList.remove('light', 'dark');
    html.classList.add(resolvedTheme);
  }
})();
`;
}
