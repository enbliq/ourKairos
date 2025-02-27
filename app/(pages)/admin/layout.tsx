import { LayoutProps } from "@/.next/types/app/layout";

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div>
      <header>Admin page layout</header>
      {children}
    </div>
  );
}
