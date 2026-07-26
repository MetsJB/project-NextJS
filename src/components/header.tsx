"use client";

import { useThemeStore } from "@/lib/stores/themeStore";
import { Menu, Moon, Sun } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const { data: session, status, update } = useSession();
  const { isDark, toggle } = useThemeStore();

  useEffect(() => {
    if (status === "unauthenticated" && pathname.includes("dashboard"))
      update();
  }, [pathname, status, update]);

  return (
    <header className="sticky top-0 z-10 min-h-16 h-16 bg-(--bg-primary) border-b border-(--border-color) flex items-center justify-between px-4">
      <button onClick={onMenuClick} className="md:hidden text-(--text-primary)">
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="text-lg font-semibold text-(--text-primary)">NextDash</h1>

      <div className="flex items-center gap-4 mr-2">
        <button
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-(--bg-hover) transition-colors text-(--text-primary)"
          aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <div className="flex flex-col items-center cursor-default text-(--text-primary)">
          <>{session?.user?.name || "Гость"}</>
          {status === "authenticated" && (
            <span className=" absolute bottom-[8px] text-[14px] text-(--text-secondary)">
              {session?.user.role === "admin" ? "aдмин" : "пользователь"}
            </span>
          )}
        </div>
        {status === "authenticated" && (
          <>
            <span className=" h-6 w-[0.5px] bg-(--text-primary)" />
            <button
              className="text-(--text-secondary)  hover:text-(--text-primary) transition-colors cursor-pointer"
              onClick={() => signOut({ redirectTo: "/login" })}
            >
              Выйти
            </button>
          </>
        )}
      </div>
    </header>
  );
}
