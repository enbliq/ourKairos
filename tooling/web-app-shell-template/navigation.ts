export interface NavigationItem {
  label: string;
  href: string;
  requiresAuth?: boolean;
}

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard", requiresAuth: true },
  { label: "Login", href: "/login" }
];
