const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Базовые типы
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export async function fetchPosts(page = 1, limit = 10): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?_page=${page}&_limit=${limit}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function fetchPost(id: string): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  const res = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`);

  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${id}`);

  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export async function fetchAlbums(): Promise<Album[]> {
  const res = await fetch(`${BASE_URL}/albums`);

  if (!res.ok) throw new Error('Failed to fetch albums');
  return res.json();
}

export async function fetchAlbum(id: string): Promise<Album> {
  const res = await fetch(`${BASE_URL}/albums/${id}`);

  if (!res.ok) throw new Error('Failed to fetch album');
  return res.json();
}

export async function fetchPhotos(albumId: string): Promise<Photo[]> {
  const res = await fetch(`${BASE_URL}/photos?albumId=${albumId}`);

  if (!res.ok) throw new Error('Failed to fetch photos');
  return res.json();
}

export async function fetchUserPosts(userId: string): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch user posts');
  return res.json();
}

export async function fetchUserAlbums(userId: string): Promise<Album[]> {
  const res = await fetch(`${BASE_URL}/albums?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch user albums');
  return res.json();
}
