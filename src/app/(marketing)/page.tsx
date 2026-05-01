import Link from 'next/link';

const page = () => {
  return (
    <>
      <h1 className='mb-3'>Добро пожаловать в NextDash</h1>
      <Link
        href={'/dashboard'}
        className='px-2 py-1 border border-zinc-600'
      >
        Перейти
      </Link>
    </>
  );
};

export default page;
