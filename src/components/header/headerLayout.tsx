import Header from '@/components/header/header';
import { verifyAccessToken } from '@/lib/auth/jwt';
import { cookies } from 'next/headers';

export const HeaderLayout = async () => {
  const data: Record<string, unknown> = {};
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (token) {
    const payload = await verifyAccessToken(token);
    data.role = payload?.role;
    data.name = payload?.name;
  }

  return <Header data={data} />;
};
