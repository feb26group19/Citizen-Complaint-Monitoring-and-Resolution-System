import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

export default function AdminDashboard() {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Original Admin links + New Event Approvals button added
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
      label: "💬 View Feedback",
      path: "/admin/feedback",
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
    {
      label: "🏢 NGO Approvals",
      path: "/admin/pending-ngos",
    },
    // NEW BUTTON ADDED HERE
    {
      label: "📅 Event Approvals",
      path: "/admin/events",
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

  // Fetch events when user clicks on "Event Approvals" or when on /admin/events
  useEffect(() => {
    if (location.pathname === "/admin/events" || location.pathname === "/admin") {
      fetchEvents();
    }
  }, [location.pathname]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8083/events/admin/all");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events for admin:", err);
    }
  };

  const handleStatusChange = async (eid, newStatus) => {
    setMessage({ type: "", text: "" });
    try {
      await axios.put(`http://localhost:8083/events/${eid}/status?status=${newStatus}`);
      setMessage({
        type: "success",
        text: `Event #${eid} has been ${newStatus.toLowerCase()}.`,
      });
      fetchEvents();
    } catch (err) {
      console.error("Failed to update event status:", err);
      setMessage({
        type: "danger",
        text: "Failed to update event status.",
      });
    }
  };

  // Checks if the user is on the Event Approval page
  const isEventApprovalPage = location.pathname === "/admin/events";

  return (
    <DashboardLayout
      title="Admin Dashboard"
      themeColor="blue"
      sidebarLinks={adminLinks}
    >
      {/* If Event Approvals tab is clicked, render the Event Approval table */}
      {isEventApprovalPage ? (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📅 NGO Event Approval Requests</h5>
            <button className="btn btn-sm btn-light" onClick={fetchEvents}>
              🔄 Refresh List
            </button>
          </div>

          <div className="card-body">
            {message.text && (
              <div className={`alert alert-${message.type}`} role="alert">
                {message.text}
              </div>
            )}

            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Event ID</th>
                    <th>NGO ID</th>
                    <th>Title / Description</th>
                    <th>Area Detail</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-muted">
                        No event requests found in the system.
                      </td>
                    </tr>
                  ) : (
                    events.map((evt) => (
                      <tr key={evt.eid}>
                        <td><strong>#{evt.eid}</strong></td>
                        <td>NGO #{evt.ngoId}</td>
                        <td>{evt.eventText}</td>
                        <td>{evt.areaDetail}</td>
                        <td>{new Date(evt.date).toLocaleString()}</td>
                        <td>
                          <span
                            className={`badge ${
                              evt.status === "APPROVED"
                                ? "bg-success"
                                : evt.status === "REJECTED"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {evt.status === "PENDING" ? "⏳ Pending" : evt.status}
                          </span>
                        </td>
                        <td>
                          {evt.status === "PENDING" ? (
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-success me-1 rounded"
                                onClick={() => handleStatusChange(evt.eid, "APPROVED")}
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-sm btn-danger rounded"
                                onClick={() => handleStatusChange(evt.eid, "REJECTED")}
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-muted small">Action Taken</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* For all other buttons (Manage Citizens, Officers, Departments, etc.), let React Router render their original components */
        <Outlet />
      )}
    </DashboardLayout>
  );
}