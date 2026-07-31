import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function DashboardLayout({
  title,
  themeColor,
  sidebarLinks = []
}) {

  const location = useLocation();

  const [notices, setNotices] = useState([]);

  const loadNotices = () => {

    fetch("http://localhost:8082/notice/all")
      .then((res) => {

        if (!res.ok) {
          throw new Error("Failed to load notices");
        }

        return res.json();
      })
      .then((data) => {

        console.log("Notices:", data);

        // Latest notice first
        setNotices(data.reverse());

      })
      .catch((err) => {

        console.error("Error loading notices:", err);

      });
  };

  useEffect(() => {

    loadNotices();

    // Refresh every 5 seconds
    const interval = setInterval(() => {
      loadNotices();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const themes = {
    blue: {
      bg: "bg-primary text-white",
      text: "text-primary",
      border: "border-primary"
    },
    emerald: {
      bg: "bg-success text-white",
      text: "text-success",
      border: "border-success"
    },
    amber: {
      bg: "text-bg-warning",
      text: "text-warning-emphasis",
      border: "border-warning"
    },
    red: {
      bg: "bg-danger text-white",
      text: "text-danger",
      border: "border-danger"
    }
  };

  const currentTheme =
    themes[themeColor] || themes.blue;

  return (

    <div className="d-flex flex-column min-vh-100 bg-light">

      {/* Navbar */}

      <header
        className={`${currentTheme.bg} px-4 py-3 d-flex justify-content-between align-items-center shadow-sm`}
      >

        <h1 className="fs-5 fw-bold m-0 text-uppercase">
          ☰ {title}
        </h1>

        <div className="d-flex align-items-center gap-4 small fw-medium">

          <Link
            to="/"
            className="text-reset text-decoration-none"
          >
            🏠 Home
          </Link>

          <span style={{ cursor: "pointer" }}>
            👤 Profile
          </span>

          <Link
            to="logout"
            className="text-reset text-decoration-none"
          >
            🚪 Logout
          </Link>

        </div>

      </header>

      {/* Main Layout */}

      <div className="container-fluid flex-grow-1 py-4">

        <div className="row g-4">

          {/* Sidebar */}

          <aside className="col-md-3 col-lg-2">

            <div className="bg-white rounded shadow-sm p-3 h-100">

              {sidebarLinks.map((link, idx) => {

                const isActive =
                  location.pathname === link.path ||
                  (link.path !== "/" &&
                    location.pathname.endsWith(link.path));

                return (

                  <Link
                    key={idx}
                    to={link.path}
                    className={`d-block text-decoration-none px-3 py-2 mb-2 rounded fw-bold
                    ${
                      isActive
                        ? `bg-light ${currentTheme.text}`
                        : "text-secondary"
                    }`}
                    style={{
                      borderLeft: isActive
                        ? "4px solid"
                        : "4px solid transparent"
                    }}
                  >
                    {link.label}
                  </Link>

                );
              })}

            </div>

          </aside>

          {/* Center Content */}

          <main className="col-md-6 col-lg-7">

            <div
              className="bg-white rounded shadow-sm p-4"
              style={{ minHeight: "80vh" }}
            >
              <Outlet />
            </div>

          </main>

          {/* Notices */}

          <aside className="col-md-3 col-lg-3">

            <div className="bg-white rounded shadow-sm p-4 h-100">

              <h5 className="fw-bold border-bottom pb-2 mb-3">
                📢 System Notices
              </h5>

              <div
                className="d-flex flex-column gap-3"
                style={{
                  maxHeight: "75vh",
                  overflowY: "auto"
                }}
              >

                {notices.length > 0 ? (

                  notices.map((notice) => (

                    <div
                      key={notice.nid}
                      className="border rounded p-3 bg-light shadow-sm"
                    >

                      <div className="fw-bold text-primary mb-2">
                        📍 {notice.areaName}
                      </div>

                      <div className="small text-dark mb-2">
                        {notice.noticeText}
                      </div>

                      <div className="text-end">
                        <small className="text-muted">
                          📅 {notice.date}
                        </small>
                      </div>

                    </div>

                  ))

                ) : (

                  <div className="text-center text-muted">
                    No notices available
                  </div>

                )}

              </div>

            </div>

          </aside>

        </div>

      </div>

    </div>

  );
}