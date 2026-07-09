const PopularPostsWidgetSkeletons = ({
  countSkeletons = 1,
}: {
  countSkeletons?: number;
}) => {
  return (
    <>
      {Array.from({ length: countSkeletons }, (_, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 bg-(--bg-primary)  px-3 py-2 rounded-md items-start w-full border border-(--border-color) animate-pulse"
        >
          <div className="h-5 bg-(--bg-hover) rounded w-7/8 " />
          <div className="h-5 bg-(--bg-hover) rounded w-6/8" />
          <div className="h-5 bg-(--bg-hover) rounded w-4/8" />
        </div>
      ))}
    </>
  );
};

export default PopularPostsWidgetSkeletons;
