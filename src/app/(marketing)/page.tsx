import Link from 'next/link';

const page = () => {
  return (
    <>
      <h1 style={{ marginBottom: '20px' }}>Добро пожаловать в NextDash</h1>
      <Link
        href={'/dashboard'}
        style={{
          marginTop: '100px',
          padding: '10px 8px',
          border: '1px solid black',
        }}
      >
        Перейти
      </Link>
    </>
  );
};

export default page;
