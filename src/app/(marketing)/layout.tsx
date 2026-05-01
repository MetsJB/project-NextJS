import Header from '@/components/header';

export default function marketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div style={{ padding: '16px' }}>{children}</div>
    </>
  );
}
