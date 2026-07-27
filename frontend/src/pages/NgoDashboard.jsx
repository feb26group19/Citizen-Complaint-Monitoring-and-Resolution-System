import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function NgoDashboard() {
  // Paths updated to match App.jsx exactly
  const ngoLinks = [
    { label: '🏠 NGO Portal Overview', path: '/ngo' },
    { label: '📅 Create Event', path: '/ngo/create-event' },
    { label: '📁 Upload Reports', path: '/ngo/reports' },
    { label: '📊 View Stats', path: '/ngo/stats' },
  ];

  return (
    <DashboardLayout title="NGO / Community Portal" themeColor="red" sidebarLinks={ngoLinks} />
  );
}