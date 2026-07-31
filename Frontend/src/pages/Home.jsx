import React from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import '../css/Home.css';

export default function HomeComp() {
  const location = useLocation();
  
  // Check if a sub-route (like /login or /register) is currently active
  const isModalOpen = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="d-flex flex-column min-vh-100 bg-light position-relative">
      
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="navbar navbar-expand bg-white border-bottom sticky-top px-4 shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="navbar-brand d-flex align-items-center gap-2 m-0 fw-bold fs-4 text-dark">
            <span>🏛️</span>
            <span>CivicConnect</span>
          </div>

          <ul className="navbar-nav gap-2">
            <li className="nav-item">
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  `nav-link px-3 py-2 fw-semibold rounded text-center border ${
                    isActive 
                      ? 'bg-dark text-white' 
                      : 'text-dark bg-light'
                  }`
                }
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/register" 
                className={({ isActive }) => 
                  `nav-link px-3 py-2 fw-semibold rounded text-center border ${
                    isActive 
                      ? 'bg-success text-white' 
                      : 'text-dark bg-light'
                  }`
                }
              >
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="container my-5 flex-grow-1">
        <div className="row align-items-center g-4">
          
          {/* Left Side: Text and Buttons */}
          <div className="col-md-7 text-center text-md-start">
            <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill text-uppercase mb-3">
              🚀 Next-Gen Governance
            </span>
            <h3 className="fw-bold text-dark display-5 mb-3">
              Empowering Communities through Smart Governance
            </h3>
            <p className="text-muted mb-4 fs-5">
              A unified, transparent ecosystem built to bridge public grievances with departmental actions. 
              File infrastructure complaints seamlessly, organize local NGO impact operations, and earn community rewards.
            </p>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2">
              <Link to="/login" className="btn btn-dark btn-lg px-4">
                Get Started Now
              </Link>
              <a href="#features" className="btn btn-outline-secondary btn-lg px-4">
                Explore Modules
              </a>
            </div>
          </div>

          {/* Right Side: Features Mini Grid */}
          <div className="col-md-5 mt-4 mt-md-0">
            <div className="bg-white border p-4 rounded shadow-sm">
              <div className="row g-3">
                <div className="col-6">
                  <div className="p-3 bg-light border rounded text-center">
                    <span className="fs-3 d-block mb-1">📋</span>
                    <span className="small fw-bold text-secondary">100% Verified</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light border rounded text-center">
                    <span className="fs-3 d-block mb-1">⚡</span>
                    <span className="small fw-bold text-secondary">Real-time Fix</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light border rounded text-center">
                    <span className="fs-3 d-block mb-1">🔒</span>
                    <span className="small fw-bold text-secondary">Role Secured</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light border rounded text-center">
                    <span className="fs-3 d-block mb-1">🌱</span>
                    <span className="small fw-bold text-secondary">NGO Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </header>

      {/* 3. LIVE PLATFORM METRICS RIBBON */}
      {/* <section className="bg-dark text-white py-4 shadow-sm">
        <div className="container">
          <div className="row text-center g-3">
            <div className="col-md-4">
              <div className="fs-2 fw-bold text-success">12,450+</div>
              <div className="small text-uppercase text-muted">Complaints Resolved</div>
            </div>
            <div className="col-md-4 border-start-custom">
              <div className="fs-2 fw-bold text-primary">45 Active</div>
              <div className="small text-uppercase text-muted">Municipal Departments</div>
            </div>
            <div className="col-md-4 border-start-custom">
              <div className="fs-2 fw-bold text-warning">380+ Organized</div>
              <div className="small text-uppercase text-muted">NGO Drive Events</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* 4. PLATFORM FEATURES INTERFACE MATRIX */}
      <section id="features" className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark mb-2">Four Portals. One Integrated Hub.</h2>
          <p className="text-muted">
            Each workspace is optimized with custom components designed explicitly to serve specific ecosystem tiers.
          </p>
        </div>

        <div className="row g-4">
          
          {/* Card 1: Citizen Portal */}
          <div className="col-md-3">
            <div className="card h-100 shadow-sm border-top border-4 border-success">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <span className="fs-4 d-inline-block mb-2"></span>
                  <h5 className="card-title fw-bold">Citizen Portal</h5>
                  <p className="card-text text-muted small">
                    Log regional grievances, overlay supporting media attachments, review status paths, and earn community milestones.
                  </p>
                </div>
                <span className="small fw-bold text-success mt-3 text-uppercase">Role 2 Panel &rarr;</span>
              </div>
            </div>
          </div>

          {/* Card 2: Department Panel */}
          <div className="col-md-3">
            <div className="card h-100 shadow-sm border-top border-4 border-warning">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <span className="fs-4 d-inline-block mb-2"></span>
                  <h5 className="card-title fw-bold">Department Panel</h5>
                  <p className="card-text text-muted small">
                    Empowers field officers to process assigned queues, update triage notes, and issue immediate structural verification actions.
                  </p>
                </div>
                <span className="small fw-bold text-warning mt-3 text-uppercase">Role 3 Panel &rarr;</span>
              </div>
            </div>
          </div>

          {/* Card 3: NGO Hub */}
          <div className="col-md-3">
            <div className="card h-100 shadow-sm border-top border-4 border-danger">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <span className="fs-4 d-inline-block mb-2"></span>
                  <h5 className="card-title fw-bold">NGO Hub</h5>
                  <p className="card-text text-muted small">
                    Deploy local cleanup setups, publish neighborhood donation maps, upload field data reports, and verify event certificates.
                  </p>
                </div>
                <span className="small fw-bold text-danger mt-3 text-uppercase">Role 4 Panel &rarr;</span>
              </div>
            </div>
          </div>

          {/* Card 4: Admin Command */}
          <div className="col-md-3">
            <div className="card h-100 shadow-sm border-top border-4 border-primary">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <span className="fs-4 d-inline-block mb-2"></span>
                  <h5 className="card-title fw-bold">Admin Command</h5>
                  <p className="card-text text-muted small">
                    Supervise system authentication variables, configure agency channels, audit metric grids, and deploy system alerts.
                  </p>
                </div>
                <span className="small fw-bold text-primary mt-3 text-uppercase">Role 1 Panel &rarr;</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 5. DYNAMIC AUTH COMPONENT MODAL OVERLAY */}
      {isModalOpen && (
        <div className="modal-overlay-bg position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3">
          <div className="bg-white w-100 rounded shadow-lg border position-relative p-4" style={{ maxWidth: '440px' }}>
            
            {/* Modal Exit Trigger Button */}
            <Link 
              to="/" 
              className="position-absolute top-0 end-0 mt-3 me-3 btn btn-sm btn-light rounded-circle fw-bold"
              style={{ width: '30px', height: '30px', padding: '2px 0 0 0' }}
            >
              ✕
            </Link>

            {/* Renders subroutes */}
            <div className="mt-2">
              <Outlet />
            </div>
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="bg-white border-top py-3 text-center small text-muted mt-auto">
        &copy; {new Date().getFullYear()} CivicConnect Platform. All rights reserved.
      </footer>
    </div>
  );
}