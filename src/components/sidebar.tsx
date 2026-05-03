'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    <aside className='w-52 bg-zinc-100 flex flex-col '>
      <nav className='flex flex-col'>
        {navItems.map((item, i) => (
          <Link
            className={cn('px-4 py-2 hover:bg-zinc-200 ', {
              'bg-zinc-900 text-white hover:bg-zinc-900':
                item.path === pathname,
            })}
            key={i}
            href={item.path}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <button className='px-4 py-2 mt-auto border-t hover:bg-zinc-200 text-left'>
        Выйти
      </button>
    </aside>
  );
}
