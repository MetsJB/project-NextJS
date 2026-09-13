import RecentCommentsWidget from '@/app/(dashboard)/dashboard/analytics/_components/recentCommentsWidget';
import UserActivityWidget from '@/app/(dashboard)/dashboard/analytics/_components/userActivityWidget';
import { verifyAccessToken } from '@/lib/auth/jwt';
import { cookies } from 'next/headers';
import PopularPostsWidget from './_components/popularPostsWidget';
import { Chat } from '@/components/chat';

const page = async () => {
  const data: Record<string, unknown> = {};
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (token) {
    const payload = await verifyAccessToken(token);
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
      <Chat />
    </div>
  );
};

export default page;
