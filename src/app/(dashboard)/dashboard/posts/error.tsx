'use client';

const error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div>
      <h2>Что-то пошло не так</h2>
      <p>{error.message}</p>
      <button
        style={{ border: '1px solid black', cursor: 'pointer' }}
        onClick={() => reset()}
      >
        Попробовать снова
      </button>
    </div>
  );
};

export default error;
