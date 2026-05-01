import Header from '@/components/header';
import { Sidebar } from '@/components/sidebar';

export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className='flex flex-1 min-w-0'>
        <Sidebar />
        <div className='p-4 w-full min-w-0'>{children}</div>
      </div>
    </>
  );
}
