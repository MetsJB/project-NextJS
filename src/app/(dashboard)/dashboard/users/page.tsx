import { fetchUsers } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

const page = async () => {
  const users = await fetchUsers().catch(() => notFound());

  return (
    <div>
      <h2 className="mb-4 text-(--text-primary) font-bold text-2xl">
        Пользователи
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div
            className="bg-(--bg-primary) border border-(--border-color) rounded-lg p-4"
            key={user.id}
          >
            <p className="font-semibold text-lg text-(--text-primary)">
              {user.name}
            </p>
            <p className="text-sm text-(--text-secondary)">{user.username}</p>
            <p className="text-sm text-(--text-primary)">{user.email}</p>
            <p className="text-sm text-(--text-secondary)">
              {user?.address?.city ?? "Здесь должен быть адрес"}
            </p>
            <Link
              className="mt-2 inline-block text-sm text-(--text-primary) hover:underline"
              href={`/dashboard/users/${user.id}`}
            >
              Профиль
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
