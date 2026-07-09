"use server";

import {
  fetchPopularPostsByComments,
  fetchRecentComments,
  deletePost,
  fetchUserActivity,
} from "@/lib/api";

export const getPopularPosts = fetchPopularPostsByComments;
export const getUserActivity = fetchUserActivity;
export const getRecentComments = fetchRecentComments;
export const removePost = deletePost;
