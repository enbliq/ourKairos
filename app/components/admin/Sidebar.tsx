import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  TrendingUp,
  CreditCard,
  Wallet,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";
import Llogo from "@/public/images/LLogo.png";
import Image from "next/image";
import Notification from "../Notification";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: House },
  { name: "Capsules", href: "/admin/capsules", icon: TrendingUp },
  { name: "Report", href: "/admin/reports", icon: CreditCard },
  { name: "User Management", href: "/admin/user", icon: Wallet },
];

const bottomNavItems = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logout", href: "/logout", icon: LogOut },
];

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  toggleMobileMenu?: () => void;
  setCurrentRouteName?: (name: string) => void;
}

export default function Sidebar({
  isMobileMenuOpen = false,
  toggleMobileMenu = () => {},
  setCurrentRouteName = () => {},
}: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Set current route name based on pathname
    const currentRoute =
      navItems.find((item) => item.href === pathname) ||
      bottomNavItems.find((item) => item.href === pathname);
    setCurrentRouteName(currentRoute?.name || "");
  }, [pathname, setCurrentRouteName]);

  // Handle sidebar collapse toggling
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed h-screen bg-[#1A202C] border-r border-gray-100 transition-all duration-300 z-50",
          isCollapsed ? "w-16" : "w-64",
          isMobileMenuOpen ? "left-0" : "-left-full md:left-0",
        )}
      >
        {/* Top section with logo and collapse button */}
        <div className="flex items-center justify-between p-6 border-b">
          <Link
            href="/"
            className={clsx("flex", isCollapsed && "justify-center")}
          >
            <Image
              src={Llogo}
              alt="Logo"
              className={clsx(isCollapsed ? "w-12 h-12" : "w-auto h-auto")}
            />
          </Link>

          <Notification />

          {/* Close button for mobile */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>

          {/* Collapse button for desktop */}
          <button
            onClick={toggleSidebar}
            className="hidden md:block p-1 rounded-md hover:bg-gray-100"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center px-4 py-3 rounded-md transition-colors",
                  isCollapsed ? "justify-center" : "",
                  isActive
                    ? "bg-[#48BB78CC] text-[#1B212D]"
                    : "text-[#929EAE] hover:bg-gray-100",
                )}
                title={isCollapsed ? item.name : ""}
              >
                <item.icon
                  className={clsx(
                    "h-5 w-5",
                    isCollapsed ? "mr-0" : "mr-3",
                    isActive ? "text-[#1B212D]" : "text-gray-400",
                  )}
                />
                {!isCollapsed && (
                  <span
                    className={clsx(
                      "font-semibold font-kumbhSans",
                      isActive ? "text-[#1B212D]" : "text-gray-400",
                    )}
                  >
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-2 pb-6  mt-80 mt-auto">
          {bottomNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center px-4 py-3 text-gray-400 hover:bg-gray-100 rounded-md transition-colors mb-2",
                isCollapsed ? "justify-center" : "",
              )}
              title={isCollapsed ? item.name : ""}
            >
              <item.icon
                className={clsx(
                  "h-5 w-5 text-gray-400",
                  isCollapsed ? "mr-0" : "mr-3",
                )}
              />
              {!isCollapsed && (
                <span className="font-medium text-gray-400">{item.name}</span>
              )}
            </Link>
          ))}
        </div>
      </aside>

      {/* Main content spacer to push content right when sidebar is shown */}
      <div
        className={clsx(
          "hidden md:block transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
        )}
      />
    </>
  );
}
