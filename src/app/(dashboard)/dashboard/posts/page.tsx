import { auth } from "@/auth";
import PostsTable from "./_components/postsTable";
import { fetchAllPosts, fetchPosts } from "@/lib/api";
import Link from "next/link";

interface PostsPage {
  searchParams: Promise<{ page: string }>;
}

const page = async (props: PostsPage) => {
  const { searchParams } = props;
  const session = await auth();
  const { page } = await searchParams;
  const allPosts = (await fetchAllPosts()).length;
  const pageSearch = Number(page) || 1;
  const posts = await fetchPosts(pageSearch, 10);
  const resLengthPages =
    allPosts % 10 ? Math.floor(allPosts / 10) + 1 : allPosts / 10;
  const isAdmin = session?.user.role === "admin";

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg text-(--text-primary)">Посты</h2>
        {isAdmin && (
          <Link
            className="px-3 py-1 bg-(--bg-hover) hover:bg-(--bg-active) hover:text-(--text-active) rounded border border-(--border-color) text-(--text-secondary) transition-colors"
            href="/dashboard/posts/create"
          >
            Создать статью
          </Link>
        )}
      </div>
      <PostsTable posts={posts} />
      <div className="flex items-center gap-2 mt-6">
        {pageSearch === 1 ? (
          <div className="text-(--text-secondary) opacity-30 px-3 py-1">
            Назад
          </div>
        ) : (
          <Link
            className="px-3 py-1 hover:bg-(--bg-hover) rounded border border-(--border-color) text-(--text-secondary)"
            href={`/dashboard/posts?page=${pageSearch - 1}`}
          >
            Назад
          </Link>
        )}

        {Array.from({ length: resLengthPages }, (_, i) => {
          const item = i + 1;
          const elem =
            pageSearch === item ? (
              <span className="bg-(--bg-active) text-(--text-active) px-2 py-1 rounded font-semibold">
                {item}
              </span>
            ) : (
              <Link
                className="px-2 py-1 hover:bg-(--bg-hover) rounded text-(--text-secondary)"
                href={`/dashboard/posts?page=${item}`}
              >
                {item}
              </Link>
            );
          return <div key={i}>{elem}</div>;
        })}
        {pageSearch === resLengthPages ? (
          <div className="text-(--text-secondary) opacity-30 px-3 py-1">
            Вперед
          </div>
        ) : (
          <Link
            className="px-3 py-1 hover:bg-(--bg-hover) rounded border border-(--border-color) text-(--text-secondary)"
            href={`/dashboard/posts?page=${pageSearch + 1}`}
          >
            Вперед
          </Link>
        )}
      </div>
    </>
  );
};

export default page;
