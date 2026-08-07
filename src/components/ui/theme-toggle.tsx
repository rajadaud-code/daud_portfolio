"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const activeTheme =
      (document.documentElement.getAttribute("data-theme") as "light" | "dark") ||
      (localStorage.getItem("theme") as "light" | "dark") ||
      "light";
    setTheme(activeTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="flex size-9 items-center justify-center rounded-control border border-line bg-surface text-ink-muted transition-colors"
      >
        <Sun className="size-4 opacity-0" aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="flex size-9 items-center justify-center rounded-control border border-line bg-surface text-ink transition-colors hover:border-line-strong hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-accent"
    >
      {theme === "light" ? (
        <Moon className="size-4 text-ink transition-transform duration-300 hover:rotate-12" aria-hidden="true" />
      ) : (
        <Sun className="size-4 text-amber-400 transition-transform duration-300 hover:rotate-45" aria-hidden="true" />
      )}
    </button>
  );
}
