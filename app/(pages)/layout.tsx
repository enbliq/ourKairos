"use client";

import { usePathname } from "next/navigation";
import { useThemeStore } from "@/app/_store/themeStore";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { mode, toggleTheme } = useThemeStore();

  if (pathname?.startsWith("/enter") || pathname?.startsWith("/join")) {
    return <>{children}</>;
  }

  return (
    <div>
      <div>
        <h1>Pages layout</h1>
        <p>Current Theme: {mode}</p>
        <button onClick={toggleTheme}>
          Switch to {mode === "light" ? "dark" : "light"} mode
        </button>
      </div>
      {children}
    </div>
  );
}
