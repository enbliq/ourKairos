import { LayoutProps } from "@/.next/types/app/layout";

export default function ProtectedLayout({ children }: LayoutProps) {
  return (
    <div>
      <header>Protected page layout</header>
      {children}
    </div>
  );
}
