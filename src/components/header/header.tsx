'use client';

import { logout } from '@/actions/auth/logouts';
import { useThemeStore } from '@/lib/stores/themeStore';
import { Menu, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  data?: Record<string, unknown>;
}

export default function Header({ data }: HeaderProps) {
  const { isDark, toggle } = useThemeStore();
  const username = data?.name || 'Гость';
  const role = data?.role === 'admin' ? 'aдмин' : 'пользователь';

  return (
    <header className='sticky top-0 z-10 min-h-16 h-16 bg-(--bg-primary) border-b border-(--border-color) flex items-center justify-between px-4'>
      <button className='md:hidden text-(--text-primary)'>
        <Menu className='h-5 w-5' />
      </button>

      <h1 className='text-lg font-semibold text-(--text-primary)'>NextDash</h1>

      <div className='flex items-center gap-4 mr-2'>
        <button
          onClick={toggle}
          className='p-2 rounded-lg hover:bg-(--bg-hover) transition-colors text-(--text-primary)'
          aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
        >
          {isDark ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
        </button>
        <div className='flex flex-col items-center cursor-default text-(--text-primary)'>
          <>{username}</>
          {!!data?.role && (
            <span className=' absolute bottom-[8px] text-[14px] text-(--text-secondary)'>
              {role}
            </span>
          )}
        </div>
        {!!data?.role && (
          <>
            <span className=' h-6 w-[0.5px] bg-(--text-primary)' />
            <button
              className='text-(--text-secondary)  hover:text-(--text-primary) transition-colors cursor-pointer'
              onClick={() => logout()}
            >
              Выйти
            </button>
          </>
        )}
      </div>
    </header>
  );
}
