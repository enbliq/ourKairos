import { Users, Box, Flag, Database, Activity } from "lucide-react";

const metrics = [
  {
    title: "Total Users",
    value: "1,234",
    icon: Users,
    className: "bg-blue-50",
  },
  {
    title: "Active Capsules",
    value: "5,678",
    icon: Box,
    className: "bg-green-50",
  },
  {
    title: "Pending Reports",
    value: "12",
    icon: Flag,
    className: "bg-yellow-50",
  },
  {
    title: "Storage Used",
    value: "1.2 TB",
    icon: Database,
    className: "bg-purple-50",
  },
];

const recentActivity = [
  {
    type: "New user registration",
    email: "john.doe@example.com",
    time: "2 minutes ago",
  },
  {
    type: "New user registration",
    email: "john.doe@example.com",
    time: "2 minutes ago",
  },
  {
    type: "New user registration",
    email: "john.doe@example.com",
    time: "2 minutes ago",
  },
  {
    type: "New user registration",
    email: "john.doe@example.com",
    time: "2 minutes ago",
  },
  {
    type: "New user registration",
    email: "john.doe@example.com",
    time: "2 minutes ago",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-gray-500">
          Manage and monitor the TimelyCapsule platform
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="rounded-lg border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {metric.title}
              </p>
              <metric.icon className="h-4 w-4 text-gray-400" />
            </div>
            <p className="mt-2 text-2xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-violet-100 p-2">
                    <Activity className="h-4 w-4 text-violet-500" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.type}</p>
                    <p className="text-sm text-gray-500">{activity.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-lg font-semibold">System Health</h2>
        </div>
        <div className="p-6">{/* Add system health metrics here */}</div>
      </div>
    </div>
  );
}
