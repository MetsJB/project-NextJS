const RecentPostsSkeleton = async () => {
  return (
    <div className='bg-white border border-zinc-200 rounded-lg p-4 '>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className='border-b border-zinc-100 pb-2 mb-2 last:border-b-0 animate-pulse'
        >
          <div className='h-4 bg-zinc-200 rounded w-3/4 mb-2' />
          <div className='h-3 bg-zinc-100 rounded w-full' />
        </div>
      ))}
    </div>
  );
};

export default RecentPostsSkeleton;
