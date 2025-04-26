import React, { useState } from "react";
import { Bell, X, BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";

interface NotificationItemProps {
  title: string;
  date: string;
  time: string;
  days: number;
  hours: number;
  minutes: number;
  isPrivate?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  date,
  time,
  days,
  hours,
  minutes,
  isPrivate = false,
}) => {
  return (
    <div className="p-4 w-full ">
      <div className="flex justify-between items-start sm:items-center border border-gray-100 p-2 rounded-lg w-full ">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <div className="h-8 w-8 bg-red-200 rounded-full" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#1D2026] font-kumbhSans">
              {title}
            </h3>
            <p className="text-sm font-bold text-gray-500 font-inter mt-0.5">
              Created {date} · {time}
            </p>
            <p className="text-sm font-inter text-gray-500 mt-0.5">
              {days} days, {hours} hours, {minutes} minutes
            </p>
          </div>
        </div>
        {isPrivate && (
          <span className="inline-flex items-center p-2 mt-2 sm:mt-0 rounded-lg text-xs font-medium bg-blue-100 font-inter text-[#173FA1] whitespace-nowrap">
            <span className="hidden md:inline">Private</span>
            <BadgeCheck className="h-4 w-4 md:ml-1" />
          </span>
        )}
      </div>
    </div>
  );
};

// Define a proper type for notification items
interface NotificationItemData {
  title: string;
  date: string;
  time: string;
  days: number;
  hours: number;
  minutes: number;
  isPrivate?: boolean;
}

interface NotificationProps {
  notifications: NotificationItemData[];
}

const Notification: React.FC<NotificationProps> = ({ notifications = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
        onClick={toggleNotification}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-gray-600" />
        {notifications.length > 0 && (
          <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed sm:absolute right-4 lg:left-3/4 lg:-translate-x-3/4 sm:right-0 top-16 sm:top-auto sm:mt-2 w-[calc(100%-32px)] sm:w-[400px] md:w-[480px] lg:w-[600px] max-w-[600px] h-auto max-h-[80vh] sm:max-h-[600px] bg-white rounded-lg shadow-lg z-50 border border-gray-100 border-l-4 border-l-[#48BB78]">
          <div className="sticky top-0 bg-white border-b rounded-t-lg">
            <div className="flex items-center justify-between p-4">
              <h2 className="font-semibold text-lg text-gray-900">
                {notifications.length} new notification
                {notifications.length !== 1 ? "s" : ""}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  className="text-sm text-[#48BB78] hover:text-green-700 font-bold"
                  onClick={() => router.push("/notifications")}
                >
                  View
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="px-4 pb-3">
              <p className="text-xs font-inter text-gray-500">
                You have just received a capsule
              </p>
            </div>
          </div>

          <div className="max-h-[calc(80vh-120px)] sm:max-h-[480px] overflow-y-auto">
            {notifications.map(
              (notification: NotificationItemData, index: number) => (
                <NotificationItem
                  title={notification.title}
                  date={notification.date}
                  time={notification.time}
                  days={notification.days}
                  hours={notification.hours}
                  minutes={notification.minutes}
                  isPrivate={notification.isPrivate}
                  key={index}
                />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
