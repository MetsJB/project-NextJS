import { fetchUsers } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';



const page = async () => {
  const users = await fetchUsers().catch(()=> notFound());

  return (
    <div>
      <h2>Пользователи</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {users.map((user) => (
          <div
            style={{
              width: '120px',
              border: '1px solid black',
              wordBreak:'break-word'
            }}
            key={user.id}
          >
            <p style={{fontSize:'18px', fontWeight:'bolder'}}>{user.name}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.address.city}</p>
            <Link href={`/dashboard/users/${user.id}`}>Профиль</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
