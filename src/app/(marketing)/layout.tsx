import Header from '@/components/header';

export default function marketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className='p-4'>{children}</div>
    </>
  );
}
