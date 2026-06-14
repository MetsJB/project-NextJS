const RecentPostsSkeleton = async () => {
  return (
    <div className='bg-(--bg-primary) border border-(--border-color) rounded-lg p-4'>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className='border-b border-(--border-color) pb-2 mb-2 last:border-b-0 animate-pulse'
        >
          <div className='h-4 bg-(--bg-hover) rounded w-3/4 mb-2' />
          <div className='h-3 bg-(--bg-hover) rounded w-full' />
        </div>
      ))}
    </div>
  );
};

export default RecentPostsSkeleton;