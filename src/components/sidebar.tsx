'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cls from './sidebar.module.css';

const navItems = [
  { name: 'Обзор', path: '/dashboard' },
  { name: 'Посты', path: '/dashboard/posts' },
  { name: 'Пользователи', path: '/dashboard/users' },
  { name: 'Альбомы', path: '/dashboard/albums' },
  { name: 'Настройки', path: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={cls.sidebar}>
      <nav className={cls.nav}>
        {navItems.map((item, i) => (
          <Link
            className={cn(cls.btn, {
              [cls.active]: item.path === pathname,
            })}
            key={i}
            href={item.path}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <button className={cn(cls.btn, cls.out)}>
        Выйти
      </button>
    </aside>
  )
}
