import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function AdminDashboard() {
  const adminLinks = [
    { label: '📊 Dashboard Overview', path: '/admin' },
    { label: '🏢 Manage Departments', path: '/admin/departments' },
    { label: '👮 Manage Officers', path: '/admin/officers' },
    { label: '👥 Manage Citizens', path: '/admin/citizens' },
    { label: '📋 View Complaints', path: '/admin/complaints' },
    { label: '📢 Notice Board', path: '/admin/notices' },
  ];

  return (
    <DashboardLayout title="Admin Dashboard" themeColor="blue" sidebarLinks={adminLinks} />
  );
}