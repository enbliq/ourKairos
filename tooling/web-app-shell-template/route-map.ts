export const publicRoutes = ["/", "/login", "/capsule/:token"] as const;

export const authenticatedRoutes = [
  "/dashboard",
  "/dashboard/capsules/new",
  "/dashboard/capsules/:id",
  "/settings"
] as const;

export const localePrefix = "/:locale";
