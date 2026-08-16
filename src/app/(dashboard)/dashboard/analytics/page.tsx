import UserActivityWidget from '@/app/(dashboard)/dashboard/analytics/_components/userActivityWidget';
import PopularPostsWidget from './_components/popularPostsWidget';
import RecentCommentsWidget from '@/app/(dashboard)/dashboard/analytics/_components/recentCommentsWidget';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth/jwt';

const page = async () => {
  const data: Record<string, unknown> = {};
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (token) {
    const payload = await verifyAccessToken(token);
    console.log('AAAA', payload);
    data.role = payload?.role;
  }

  return (
    <div className='container mx-auto'>
      <h3 className='text-2xl font-bold mb-6 text-(--text-primary)'>
        Аналитика
      </h3>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <PopularPostsWidget dataUser={data} />
        <UserActivityWidget />
        <RecentCommentsWidget />
      </div>
    </div>
  );
};

export default page;
