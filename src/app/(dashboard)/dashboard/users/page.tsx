import { fetchUsers } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const page = async () => {
  const users = await fetchUsers().catch(() => notFound());

  return (
    <div>
      <h2 className='mb-4'>Пользователи</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {users.map((user) => (
          <div
            className='bg-white border border-zinc-200 rounded-lg p-4'
            key={user.id}
          >
            <p className='font-semibold text-lg'>{user.name}</p>
            <p className='text-sm text-zinc-500'>{user.username}</p>
            <p className='text-sm'>{user.email}</p>
            <p className='text-sm text-zinc-500'>{user.address.city}</p>
            <Link
              className='mt-2 inline-block text-sm text-zinc-900 hover:underline'
              href={`/dashboard/users/${user.id}`}
            >
              Профиль
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
