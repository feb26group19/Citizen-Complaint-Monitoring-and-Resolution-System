import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function OfficerDashboard() {
  // Paths updated to match App.jsx exactly
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
    label: "📢 Add Notice",
    path: "/officer/remarks",
  },

  {
    label: "📊 Statistics",
    path: "/officer/statistics",
  },
];

  return (
    <DashboardLayout title="Department Officer Panel" themeColor="amber" sidebarLinks={officerLinks} />
  );
}