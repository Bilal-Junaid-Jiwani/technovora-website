"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = "theme";

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

/**
 * Lightweight replacement for `next-themes`.
 *
 * The actual dark/light class on <html> is set synchronously by an inline
 * <script> rendered in the root layout (a Server Component) *before* this
 * provider ever mounts, so there is no flash of the wrong theme. This
 * component only keeps React state in sync with that class and exposes
 * `useTheme()` so the UI can read/change it.
 *
 * We do this instead of `next-themes` because that library renders its own
 * anti-flash <script> from inside a client component, which React 19 flags
 * with a (harmless, dev-only) "Encountered a script tag while rendering
 * React component" console error — see
 * https://github.com/pacocoursey/next-themes/issues/387. Rendering the
 * script from a Server Component avoids the warning entirely.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    setThemeState(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage can throw in private-browsing/blocked-storage contexts
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
