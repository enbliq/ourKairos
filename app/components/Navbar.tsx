import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import Notification from "./Notification";
import UserAvatar from "./UserAvatar";

interface NavbarProps {
  toggleMobileMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMobileMenu }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentRouteName, setCurrentRouteName] = useState("");

  const notificationsArray = [
    {
      title: "Capsule Name",
      date: "March 14, 2023",
      time: "2:15pm",
      days: 5,
      hours: 12,
      minutes: 30,
      isPrivate: true,
    },
    {
      title: "Not Name",
      date: "March 14, 2023",
      time: "2:15pm",
      days: 5,
      hours: 12,
      minutes: 30,
      isPrivate: false,
    },
  ];
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const segments = pathname.split("/").filter(Boolean);
      if (segments.length > 0) {
        const routeName =
          segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
        setCurrentRouteName(routeName);
      } else {
        setCurrentRouteName("Dashboard");
      }
    }
  }, [pathname]);

  return (
    <header className="h-[5rem] sticky top-0 z-30 flex items-center justify-between p-6 border-b bg-white">
      <div className="flex items-center">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="ml-4 md:ml-0 font-semibold text-2xl text-[#1B212D]">
          {currentRouteName}
        </h1>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 md:hidden">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 border-none text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600 placeholder:text-gray-400"
                autoFocus
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-6">
        {/* Desktop Search */}
        <div className="hidden md:block relative">
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            className="pl-9 pr-4 py-2 rounded-lg bg-gray-50 border-none text-sm focus:outline-none  focus:ring-0 text-gray-600 w-[280px] placeholder:text-gray-400"
          />
        </div>
        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Search className="h-5 w-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-4">
          <Notification notifications={notificationsArray} />
          <div className="hidden sm:block h-8 w-[1px] bg-gray-200"></div>
          <UserAvatar name="Assad User1" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
