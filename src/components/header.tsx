"use client";

import { Menu, Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/lib/stores/themeStore";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { isDark, toggle } = useThemeStore();

  return (
    <header className="sticky top-0 z-10 h-16 bg-(--bg-primary) border-b border-(--border-color) flex items-center justify-between px-4">
      <button onClick={onMenuClick} className="md:hidden text-(--text-primary)">
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="text-lg font-semibold text-(--text-primary)">NextDash</h1>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-(--bg-hover) transition-colors text-(--text-primary)"
          aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <span className="text-sm text-(--text-secondary)">Администратор</span>
      </div>
    </header>
  );
}
