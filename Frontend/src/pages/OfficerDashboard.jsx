import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

export default function OfficerDashboard() {

  const officerLinks = [
    {
      label: "🏠 Dashboard",
      path: "/officer",
    },
    {
      label: "📋 View Complaints",
      path: "/officer/assigned",
    },
    {
      label: "💬 View Feedback",
      path: "/officer/feedback",
    },
    {
      label: "📢 Add Notice",
      path: "/officer/remarks",
    },
    {
      label: "📊 Statistics",
      path: "/officer/statistics",
    },
    {
      label: "🚪 Logout",
      path: "/officer/logout",
    },
  ];

  return (
    <DashboardLayout
      title="Department Officer Panel"
      themeColor="amber"
      sidebarLinks={officerLinks}
    >
      <Outlet />
    </DashboardLayout>
  );
}