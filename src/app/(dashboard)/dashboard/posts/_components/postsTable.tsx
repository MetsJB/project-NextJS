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
  let result = [...posts];

  if (search) {
    result = result.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }

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
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const conditions = (field: SortField) => {
    const fields = sortField && sortField === field && sortDirection;

    if (fields) {
      return sortDirection === 'asc' ? ' ↑' : ' ↓';
    }

    return undefined;
  };

  const res = sortedRes(posts, sortField, sortDirection, search).map((post) => (
    <tr className='hover:bg-(--bg-hover) transition-colors' key={post.id}>
      <td className='p-2 border-b border-(--border-color) text-(--text-secondary)'>
        {post.id}
      </td>
      <td className='p-2 border-b border-(--border-color) text-(--text-primary)'>
        {post.title}
      </td>
      <td className='p-2 border-b border-(--border-color) text-(--text-secondary)'>
        {post.userId}
      </td>
      <td className='p-2 border-b border-(--border-color)'>
        <Link
          href={`/dashboard/posts/${post.id}`}
          className='text-(--text-secondary) hover:text-(--text-primary) transition-colors'
        >
          Просмотр
        </Link>
      </td>
    </tr>
  ));

  return (
    <>
      <div className='flex justify-between items-center'>
        <input
          onChange={handleSearch}
          value={search}
          type='text'
          className='w-full md:w-80 px-3 py-2 bg-(--bg-primary) text-(--text-primary) border border-(--border-color) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--bg-active) focus:border-transparent transition mb-4 placeholder:text-(--text-secondary)'
          placeholder='Поиск по заголовку...'
        />
        {search && (
          <p className='text-(--text-secondary) text-sm ml-4'>
            Найдено {res.length} из {posts.length}
          </p>
        )}
      </div>
      <table className='border border-(--border-color) border-collapse w-full'>
        <thead className='border-b border-(--border-color)'>
          <tr>
            <th
              onClick={() => handleSort('id')}
              className='cursor-pointer select-none hover:bg-(--bg-hover) transition-colors text-left p-2 text-sm text-(--text-secondary) font-medium'
            >
              ID{conditions('id')}
            </th>
            <th
              onClick={() => handleSort('title')}
              className='cursor-pointer select-none hover:bg-(--bg-hover) transition-colors text-left p-2 text-sm text-(--text-secondary) font-medium'
            >
              Заголовок{conditions('title')}
            </th>
            <th
              onClick={() => handleSort('userId')}
              className='cursor-pointer select-none hover:bg-(--bg-hover) transition-colors text-left p-2 text-sm text-(--text-secondary) font-medium'
            >
              Автор{conditions('userId')}
            </th>
            <th className='text-left p-2 text-sm text-(--text-secondary) font-medium'>
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