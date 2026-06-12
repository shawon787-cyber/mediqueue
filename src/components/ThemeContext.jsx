"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribe(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") || "light";
}

function getServerSnapshot() {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const toggleTheme = useCallback(() => {
    const next = isDark ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch {}
    document.documentElement.setAttribute("data-theme", next);
    window.dispatchEvent(new Event("storage"));
  }, [isDark]);

  return { theme, toggleTheme, isDark };
}

function getStoredTheme() {
  try {
    return localStorage.getItem("theme") || "light";
  } catch {
    return "light";
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", (e) => {
      try {
        if (!localStorage.getItem("theme")) {
          applyTheme(e.matches ? "dark" : "light");
        }
      } catch {}
    });
  } catch {}
}

export function ThemeProvider({ children }) {
  return <>{children}</>;
}
