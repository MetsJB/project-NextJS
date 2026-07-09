"use client";

import UserActivityWidgetSkeletons from "@/app/(dashboard)/dashboard/analytics/_components/skeletons/UserActivityWidgetSkeletons";
import { useUserActivity } from "@/hooks/tanstack";
import { UserWithPostsCount } from "@/lib/types";

const UserItem = ({ user }: { user: UserWithPostsCount }) => {
  return (
    <div className="flex flex-col gap-2 bg-(--bg-secondary) px-3 py-2 rounded-md items-start ">
      <div className="flex gap-2">
        <h5 className="font-semibold">{user.username}</h5>
        <p>{user.name}</p>
      </div>
      <p>
        Количество постов -{" "}
        <span className="px-2 py-1 bg-(--bg-hover) rounded">
          {user._count.posts}
        </span>
      </p>
    </div>
  );
};

const UserActivityWidget = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useUserActivity();

  return (
    <div className="bg-(--bg-primary) border border-(--border-color) rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-(--text-primary) mb-4 flex items-center justify-between">
          Активность пользователей
        </h4>
        <button
          onClick={() => refetch()}
          className="text-sm text-(--text-secondary) border border-(--border-color) px-2 py-1 rounded-md hover:border-(--border-hover) hover:text-(--border-hover) transition-colors cursor-pointer"
        >
          {isRefetching ? "Обновление..." : "Обновить"}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-y-6 ">
        {(!data || isLoading) && !isError && <UserActivityWidgetSkeletons countSkeletons={5}/>}

        {isError && !isLoading && (
          <div className="text-red-500 w-fit  conte bg-(--bg-secondary) rounded-md px-2 py-1">
            Ошибка загрузки
            {error?.message}
          </div>
        )}

        {!isLoading &&
          !isError &&
          data?.map((user) => <UserItem key={user.id} user={user} />)}
      </div>
    </div>
  );
};

export default UserActivityWidget;
