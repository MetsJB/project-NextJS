"use client";

import PopularPostsWidgetSkeletons from "@/app/(dashboard)/dashboard/analytics/_components/skeletons/PopularPostsWidgetSkeletons";
import { useDeletePost, usePopularPosts } from "@/hooks/tanstack";
import { PostWithCommentCount } from "@/lib/types";

const PostItem = ({ post }: { post: PostWithCommentCount }) => {
  const {
    mutate: deletePostMutate,
    isPending: isPendingMutate,
    error: errorMutate,
    isError: isErrorMutate,
  } = useDeletePost();

  return (
    <div className="flex flex-col gap-2 bg-(--bg-secondary) px-3 py-2 rounded-md items-start ">
      <h5 className="font-semibold">{post.title}</h5>
      <p>
        Комментарии -{" "}
        <span className="px-2 py-1 bg-(--bg-hover) rounded">
          {post._count.comments}
        </span>
      </p>
      <button
        className={`text-sm px-2 py-1 rounded-md cursor-pointer border ${
          isPendingMutate
            ? "bg-accent"
            : "text-(--text-primary) border-(--bg-hover) bg-(--bg-additional) hover:bg-(--bg-hover) transition-colors"
        }`}
        onClick={() => {
          deletePostMutate(post.id);
        }}
      >
        {isPendingMutate ? "Удаление..." : "Удалить"}
      </button>
      {isErrorMutate && (
        <span>
          Удаление поста не удалось. Попробуйте позже.
          {errorMutate?.message}
        </span>
      )}
    </div>
  );
};

const PopularPostsWidget = () => {
  const { data, isLoading, isError, refetch, isRefetching } = usePopularPosts();

  return (
    <div className="bg-(--bg-primary) border border-(--border-color) rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-(--text-primary) mb-4 flex items-center justify-between">
          Популярные посты
        </h4>
        <button
          onClick={() => refetch()}
          className="text-sm text-(--text-secondary) border border-(--border-color) px-2 py-1 rounded-md hover:border-(--border-hover) hover:text-(--border-hover) transition-colors cursor-pointer"
        >
          {isRefetching ? "Обновление..." : "Обновить"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-y-6 ">
        {(!data || isLoading) && !isError && (
          <PopularPostsWidgetSkeletons countSkeletons={5} />
        )}

        {isError && !isLoading && (
          <div className="text-red-500 w-fit  conte bg-(--bg-secondary) rounded-md px-2 py-1">
            Ошибка загрузки
          </div>
        )}

        {!isLoading &&
          !isError &&
          data?.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default PopularPostsWidget;
