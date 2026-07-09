"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Обзор", path: "/dashboard" },
  { name: "Посты", path: "/dashboard/posts" },
  { name: "Пользователи", path: "/dashboard/users" },
  { name: "Альбомы", path: "/dashboard/albums" },
  { name: "Аналитика", path: "/dashboard/analytics" },
  { name: "Настройки", path: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-52 bg-(--bg-primary) flex flex-col ">
      <nav className="flex flex-col">
        {navItems.map((item, i) => (
          <Link
            className={cn(
              "px-4 py-2 text-(--text-secondary) hover:bg-(--bg-hover) hover:text-(--text-primary) transition-colors",
              {
                'bg-(--bg-active) text-(--text-active)! font-medium':
                  item.path === pathname,
              },
            )}
            key={i}
            href={item.path}
          >
            {item.name}
          </Link>
        ))}
      </nav>
       <button className='px-4 py-2 mt-auto border-t border-(--border-color) text-(--text-secondary) hover:bg-(--bg-hover) hover:text-(--text-primary) transition-colors text-left'>
        Выйти
      </button>
    </aside>
  );
}
