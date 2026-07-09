"use client";

import {
  getPopularPosts,
  getRecentComments,
  getUserActivity,
  removePost,
} from "@/actions/posts";
import { Post } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const POPULAR_POSTS_KEY = "popularPosts";
const RECENT_COMMENTS_KEY = "recentComments";
const USER_ACTIVITY_KEY = "userActivity";

export function usePopularPosts() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: [POPULAR_POSTS_KEY],
    queryFn: getPopularPosts,
    refetchInterval: 30 * 1000,
    retry: false,
  });

  return { data, isLoading, isError, error, refetch, isRefetching };
}

export function useUserActivity() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: [USER_ACTIVITY_KEY],
    queryFn: getUserActivity,
    refetchInterval: 15 * 1000,
  });

  return { data, isLoading, isError, error, refetch, isRefetching };
}

export function useRecentComments(limit: number = 10) {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: [RECENT_COMMENTS_KEY],
    queryFn: () => getRecentComments(limit),
    refetchInterval: 15 * 1000,
  });

  return { data, isLoading, isError, error, refetch, isRefetching };
}

export function useDeletePost() {
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: removePost,
    onMutate: async (id, context) => {
      await context.client.cancelQueries({ queryKey: [POPULAR_POSTS_KEY] });

      const previousData = context.client.getQueryData([POPULAR_POSTS_KEY]);

      context.client.setQueryData<Post[]>([POPULAR_POSTS_KEY], (oldData) =>
        oldData?.filter((post) => post.id !== id),
      );

      return { previousData };
    },

    onError: (err, data, onMutateRes, context) => {
      context.client.setQueryData(
        [POPULAR_POSTS_KEY],
        onMutateRes?.previousData,
      );
    },

    onSettled: (data, error, variables, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: [POPULAR_POSTS_KEY] });
      context.client.invalidateQueries({ queryKey: [USER_ACTIVITY_KEY] });
      context.client.invalidateQueries({ queryKey: [RECENT_COMMENTS_KEY] });
    },
  });

  return { mutate, isPending, error, isError };
}
