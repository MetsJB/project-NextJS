"use client";

import RecentCommentsWidgetSkeletons from "@/app/(dashboard)/dashboard/analytics/_components/skeletons/RecentCommentsWidgetSkeletons";
import { useRecentComments } from "@/hooks/tanstack";
import { CommentWithPostTitle } from "@/lib/types";
import Link from "next/link";

const RecentCommentItem = ({ comment }: { comment: CommentWithPostTitle }) => {
  return (
    <div className="flex flex-col gap-2 bg-(--bg-secondary) px-3 py-2 rounded-md items-start ">
      <p>{comment.body}</p>
      <Link
        href={`/dashboard/posts/${comment.postId}`}
        className="font-semibold"
      >
        {comment.post.title}
      </Link>
      <p>{comment.email}</p>
    </div>
  );
};

const RecentCommentsWidget = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useRecentComments();

  return (
    <div className="bg-(--bg-primary) border border-(--border-color) rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-(--text-primary) mb-4 flex items-center justify-between">
          Недавние комментарии
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
          <RecentCommentsWidgetSkeletons countSkeletons={10} />
        )}

        {isError && !isLoading && (
          <div className="text-red-500 w-fit  conte bg-(--bg-secondary) rounded-md px-2 py-1">
            Ошибка загрузки
            {error?.message}
          </div>
        )}

        {!isLoading &&
          !isError &&
          data?.map((comment) => (
            <RecentCommentItem key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default RecentCommentsWidget;
