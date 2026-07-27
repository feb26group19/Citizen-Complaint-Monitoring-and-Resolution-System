import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function UserDashboard() {
  const citizenLinks = [
    { label: '🏠 Welcome Panel', path: '/user' },
    { label: '➕ Submit Complaint', path: '/user/submit' },
    { label: '🕒 Complaint Status', path: '/user/status' },
    { label: '📜 View History', path: '/user/history' },
    { label: '🏆 Reward Points', path: '/user/rewards' },
  ];

  return (
    <DashboardLayout title="Citizen Portal" themeColor="emerald" sidebarLinks={citizenLinks} />
  );
}