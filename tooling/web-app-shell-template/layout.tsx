import type { ReactNode } from "react";
import { navigationItems } from "./navigation";

export interface AppShellProps {
  children: ReactNode;
  locale: string;
  isAuthenticated?: boolean;
}

export const AppShell = ({ children, locale, isAuthenticated = false }: AppShellProps) => {
  const visibleItems = navigationItems.filter(
    (item) => !item.requiresAuth || isAuthenticated
  );

  return {
    locale,
    nav: visibleItems.map((item) => ({
      ...item,
      href: `/${locale}${item.href === "/" ? "" : item.href}`
    })),
    children
  };
};
