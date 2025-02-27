"use client";

import { LayoutProps } from "@/.next/types/app/layout";
import { usePathname } from "next/navigation";

export default function PublicLayout({ children }: LayoutProps) {
  // Si estamos en una ruta de autenticación, no aplicamos el layout general
  const pathname = usePathname();
  const isAuthRoute =
    pathname?.includes("/enter") || pathname?.includes("/join");

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Layout normal para rutas públicas no-auth */}
      <header>Public page layout</header>
      <main>{children}</main>
      <footer>{/* ... tu footer existente ... */}</footer>
    </>
  );
}
