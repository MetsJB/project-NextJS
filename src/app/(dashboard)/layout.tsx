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
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <div style={{ padding: '16px', width: '100%' }}>{children}</div>
      </div>
    </>
  );
}
