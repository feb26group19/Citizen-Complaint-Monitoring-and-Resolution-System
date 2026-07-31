import React from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function AdminDashboard() {

  const adminLinks = [
    {
      label: "📊 Dashboard",
      path: "/admin",
    },
    {
      label: "🏢 Manage Departments",
      path: "/admin/departments",
    },
    {
      label: "👮 Register Officer",
      path: "/admin/officers",
    },
    {
      label: "🙍 Manage Citizens",
      path: "/admin/citizens",
    },
    {
      label: "📋 View Complaints",
      path: "/admin/complaints",
    },

    // NEW MENU
    {
      label: "🏢 NGO Approvals",
      path: "/admin/pending-ngos",
    },

    {
      label: "📢 Notice Board",
      path: "/admin/notices",
    },
    {
      label: "🚪 Logout",
      path: "/admin/logout",
    },
  ];

  return (
    <DashboardLayout
      title="Admin Dashboard"
      themeColor="blue"
      sidebarLinks={adminLinks}
    />
  );
}