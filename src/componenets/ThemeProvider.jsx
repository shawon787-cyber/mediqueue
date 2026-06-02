"use client";

import { useEffect } from "react";

export default function ThemeProvider() {
  useEffect(() => {
    const applyTheme = () => {
      try {
        const stored = localStorage.getItem("theme");
        if (stored) {
          document.documentElement.setAttribute("data-theme", stored);
        } else {
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
        }
      } catch (e) {
        // ignore (e.g., during SSR)
        console.error(e);
      }
    };

    applyTheme();

    const onStorage = (e) => {
      if (e.key === "theme") applyTheme();
    };

    window.addEventListener("storage", onStorage);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onPref = (e) => {
      const stored = localStorage.getItem("theme");
      if (!stored) {
        document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      }
    };

    if (mq.addEventListener) mq.addEventListener("change", onPref);
    else mq.addListener(onPref);

    return () => {
      window.removeEventListener("storage", onStorage);
      if (mq.removeEventListener) mq.removeEventListener("change", onPref);
      else mq.removeListener(onPref);
    };
  }, []);

  return null;
}
