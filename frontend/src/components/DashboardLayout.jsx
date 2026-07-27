import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function DashboardLayout({ title, themeColor, sidebarLinks = [] }) {
  const location = useLocation();

  // Theme maps translated to standard Bootstrap color utilities
  const themes = {
    blue: { bg: 'bg-primary text-white', text: 'text-primary', border: 'border-primary' },
    emerald: { bg: 'bg-success text-white', text: 'text-success', border: 'border-success' },
    amber: { bg: 'text-bg-warning', text: 'text-warning-emphasis', border: 'border-warning' },
    red: { bg: 'bg-danger text-white', text: 'text-danger', border: 'border-danger' }
  };
  

  const currentTheme = themes[themeColor] || themes.blue;

  return (
    <div className="d-flex flex-column min-vh-100 bg-light font-sans">
      
      {/* Top Navbar */}
      <header className={`${currentTheme.bg} px-4 py-3 d-flex justify-content-between align-items-center shadow-sm`}>
        <h1 className="fs-5 fw-bold m-0 text-uppercase">☰ {title}</h1>
        <div className="d-flex align-items-center gap-4 small fw-medium">
          <Link to="/" className="text-reset text-decoration-none opacity-75 hover-opacity-100">🏠 Home</Link>
          <span className="text-reset opacity-75 cursor-pointer" style={{ cursor: 'pointer' }}>👤 Profile</span>
          <Link to="logout" className="text-reset text-decoration-none opacity-75 hover-opacity-100">🚪 Logout</Link>
        </div>
      </header>

      {/* Main Content Container Grid */}
      <div className="container-fluid flex-grow-1 py-4">
        <div className="row g-4 align-items-stretch">
          
          {/* Left Sidebar Links */}
          <aside className="col-md-3 col-lg-2">
            <div className="bg-white rounded shadow-sm p-3 d-flex flex-column gap-2 h-100">
              {sidebarLinks.map((link, idx) => {
                const isActive = location.pathname === link.path || 
                                 (link.path !== '/' && location.pathname.endsWith(link.path));
                                 
                return (
                  <Link 
                    key={idx} 
                    to={link.path}
                    style={{ 
                      borderLeft: isActive ? '4px solid' : '4px solid transparent',
                      transition: 'background-color 0.2s ease'
                    }}
                    className={`w-100 text-start px-3 py-2 rounded small fw-bold text-decoration-none d-block
                      ${isActive 
                        ? `bg-light ${currentTheme.border} ${currentTheme.text}` 
                        : 'text-secondary bg-transparent'}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Center Panel (Dynamic Routed Content) */}
          <main className="col-md-6 col-lg-7">
            <div className="bg-white rounded shadow-sm p-4" style={{ minHeight: '80vh' }}>
              <Outlet />
            </div>
          </main>

          {/* Right Sidebar (System Notices) */}
          <aside className="col-md-3 col-lg-3">
            <div className="bg-white rounded shadow-sm p-4 h-100">
              <h3 className="fw-bold fs-6 text-dark border-b border-bottom pb-2 mb-3">System Notices</h3>
              <div className="d-flex flex-column gap-3">
                
                <div className="p-3 bg-primary-subtle text-primary-emphasis border border-primary-subtle rounded small">
                  <strong className="d-block mb-1">🚰 Water Cut</strong>
                  <span className="text-muted small">Water supply maintenance scheduled.</span>
                </div>
                
                <div className="p-3 bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded small">
                  <strong className="d-block mb-1">🚧 Road Closures</strong>
                  <span className="text-muted small">Main highway diversion active.</span>
                </div>
                
                <div className="p-3 bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle rounded small">
                  <strong className="d-block mb-1">ℹ️ Maintenance</strong>
                  <span className="text-muted small">System update at midnight.</span>
                </div>

              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}