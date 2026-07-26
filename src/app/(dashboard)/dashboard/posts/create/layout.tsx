import { ReactNode } from "react";
import requireAdmin from "@/lib/auth/checkRole";

export default async function CreatePostLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();

  return <>{children}</>;
}
