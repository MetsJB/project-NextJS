import { prisma } from "@/lib/prisma";

// export const PHOTO_URL = "https://picsum.dev/200/200?";

export async function fetchPosts(page = 1, limit = 10) {
  const posts = await prisma.post.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  return posts;
}

export async function fetchAllPosts() {
  const posts = await prisma.post.findMany();

  return posts;
}

export async function fetchPost(id: string) {
  const post = prisma.post.findUnique({
    where: { id: Number(id) },
  });

  return post;
}

export async function fetchComments(postId: string) {
  const comments = prisma.comment.findMany({
    where: {
      postId: Number(postId),
    },
  });

  return comments;
}

export async function fetchAllComments() {
  const comments = prisma.comment.findMany();

  return comments;
}

export async function fetchUsers() {
  const users = await prisma.user.findMany();

  return users;
}

export async function fetchUser(id: string) {
  const user = prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  return user;
}

export async function fetchAlbums() {
  const albums = await prisma.album.findMany();

  return albums;
}

export async function fetchAlbum(id: string) {
  const album = prisma.album.findUnique({
    where: {
      id: Number(id),
    },
  });

  return album;
}

export async function fetchPhotos(albumId: string) {
  const photos = prisma.photo.findMany({
    where: {
      albumId: Number(albumId),
    },
  });

  return photos;
}

export async function fetchUserPosts(userId: string) {
  const userPosts = prisma.post.findMany({
    where: {
      userId: Number(userId),
    },
  });

  return userPosts;
}

export async function fetchUserAlbums(userId: string) {
  const userAlbums = prisma.album.findMany({
    where: {
      userId: Number(userId),
    },
  });

  return userAlbums;
}

export async function fetchPopularPostsByComments() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const posts = await prisma.post.findMany({
    include: {
      _count: { select: { comments: true } },
    },
    orderBy: { comments: { _count: "desc" } },
    take: 5,
  });

  return posts;
}

export async function fetchRecentComments(limit: number) {
  const recentComments = await prisma.comment.findMany({
    include: {
      post: { select: { title: true } },
    },
    orderBy: { id: "desc" },
    take: limit,
  });

  return recentComments;
}

export async function fetchUserActivity() {

  const users = await prisma.user.findMany({
    include: {
      _count: { select: { posts: true } },
    },
  });

  return users;
}

export async function deletePost(id: number) {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  await prisma.post.delete({
    where: {
      id: id,
    },
  });
}
