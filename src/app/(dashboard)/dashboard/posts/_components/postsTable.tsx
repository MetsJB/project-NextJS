'use client';

import { Post } from '@/lib/types';
import Link from 'next/link';
import React, { useState } from 'react';

interface PostsTableProps {
  posts: Post[];
}

type SortField = 'id' | 'title' | 'userId';
type SortDirection = 'asc' | 'desc';

const sortedRes = (
  posts: Post[],
  field: SortField | undefined,
  direction: SortDirection | undefined,
  search: string
) => {
  let result = [...posts]; // копия, чтобы не мутировать оригинал

  // Фильтрация
  if (search) {
    result = result.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Сортировка
  if (field && direction) {
    result.sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      let comparison = 0;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      }

      return direction === 'asc' ? comparison : -comparison;
    });
  }

  return result;
};

const PostsTable = ({ posts }: PostsTableProps) => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>();
  const [sortDirection, setSortDirection] = useState<SortDirection>();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const handleId = () => {
    handleSort('id');
  };
  const handleAuthor = () => {
    handleSort('userId');
  };
  const handleTitle = () => {
    handleSort('title');
  };

  const conditions = (field: SortField) => {
    const fields = sortField && sortField === field && sortDirection;

    if (fields) {
      return sortDirection === 'asc' ? ' ↑' : ' ↓';
    }

    return undefined;
  };

  const res = sortedRes(posts, sortField, sortDirection, search).map((post) => (
    <tr className='hover:bg-zinc-50' key={post.id}>
      <td className='p-2 border-b border-zinc-100'> {post.id}</td>
      <td className='p-2 border-b border-zinc-100'> {post.title}</td>
      <td className='p-2 border-b border-zinc-100'> {post.userId}</td>
      <td className='p-2 border-b border-zinc-100'>
        <Link href={`/dashboard/posts/${post.id}`}>Просмотр</Link>
      </td>
    </tr>
  ));

  return (
    <>
      <div className='flex justify-between  '>
        <input
          onChange={handleSearch}
          value={search}
          type='text'
          className='w-full md:w-80 px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition mb-4'
          placeholder='Поиск по заголовку...'
        />
        {search && (
          <p>
            Найдено {res.length} из {posts.length}
          </p>
        )}
      </div>
      <table className='border border-collapse  w-full '>
        <thead className='border-b border-zinc-200'>
          <tr className='hover:bg-zinc-50'>
            <th
              onClick={handleId}
              className=' cursor-pointer select-none hover:bg-zinc-100 transition-colors text-left p-2 text-sm text-zinc-500 font-medium'
            >
              ID{conditions('id')}
            </th>
            <th
              onClick={handleTitle}
              className=' cursor-pointer select-none hover:bg-zinc-100 transition-colors text-left p-2 text-sm text-zinc-500 font-medium'
            >
              Заголовок{conditions('title')}
            </th>
            <th
              onClick={handleAuthor}
              className=' cursor-pointer select-none hover:bg-zinc-100 transition-colors text-left p-2 text-sm text-zinc-500 font-medium'
            >
              Автор{conditions('userId')}
            </th>
            <th className=' cursor-pointer select-none hover:bg-zinc-100 transition-colors text-left p-2 text-sm text-zinc-500 font-medium'>
              Действия
            </th>
          </tr>
        </thead>
        <tbody>{res}</tbody>
      </table>
    </>
  );
};

export default PostsTable;
