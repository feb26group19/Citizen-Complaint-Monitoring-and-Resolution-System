import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function OfficerDashboard() {
  // Paths updated to match App.jsx exactly
  const officerLinks = [
    { label: '📋 Officer Portal', path: '/officer' },
    { label: '📥 Assigned Complaints', path: '/officer/assigned' },
    { label: '📈 Performance Stats', path: '/officer/statistics' },
  ];

  return (
    <DashboardLayout title="Department Officer Panel" themeColor="amber" sidebarLinks={officerLinks} />
  );
}