import UserActivityWidget from "@/app/(dashboard)/dashboard/analytics/_components/userActivityWidget";
import PopularPostsWidget from "./_components/popularPostsWidget";
import RecentCommentsWidget from "@/app/(dashboard)/dashboard/analytics/_components/recentCommentsWidget";

const page = () => {
  return (
    <div className="container mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-(--text-primary)">
        Аналитика
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopularPostsWidget/>
        <UserActivityWidget/>
        <RecentCommentsWidget/>
      </div>
    </div>
  );
};

export default page;
