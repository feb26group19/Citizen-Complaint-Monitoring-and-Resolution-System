import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

export default function UserDashboard() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth); // Access logged-in user details

  const [events, setEvents] = useState([]);
  const [registeredEventIds, setRegisteredEventIds] = useState([]);
  const [message, setMessage] = useState("");

  // Keep all existing links and add the new "Events" button
const userLinks = [
  { label: "📊 Dashboard", path: "/user" },
  { label: "📝 Register Complaint", path: "/user/submit" },
  { label: "📋 My Complaints", path: "/user/status" },
  { label: "📅 Events", path: "/user/events" },
  { label: "🚪 Logout", path: "/user/logout" },
];

  const uid = user?.uid || user?.id;

  // Fetch approved events and user's existing registrations when navigating to /user/events
  useEffect(() => {
    if (location.pathname === "/user/events" || location.pathname === "/user") {
      fetchApprovedEvents();
      if (uid) {
        fetchUserRegistrations(uid);
      }
    }
  }, [location.pathname, uid]);

  // 1. Fetch only APPROVED events
  const fetchApprovedEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8083/events/approved");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching approved events:", err);
    }
  };

  // 2. Fetch events the user has already registered for
  const fetchUserRegistrations = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8083/events/registrations/user/${userId}`);
      const eventIds = res.data.map((reg) => reg.eid);
      setRegisteredEventIds(eventIds);
    } catch (err) {
      console.error("Error fetching user registrations:", err);
    }
  };

  // 3. Handle Register button click
  const handleRegister = async (eid) => {
    setMessage("");

    if (!uid) {
      setMessage("User session invalid. Please log in again.");
      return;
    }

    const payload = {
      eid: eid,
      uid: parseInt(uid, 10),
      regDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    };

    try {
      await axios.post("http://localhost:8083/events/register", payload);
      
      // Update local state to turn button green & show success banner
      setRegisteredEventIds((prev) => [...prev, eid]);
      setMessage("Registration Successful!");
    } catch (err) {
      console.error("Registration error:", err);
      const serverMsg = typeof err.response?.data === "string"
        ? err.response?.data
        : "Failed to register for the event.";
      setMessage(serverMsg);
    }
  };

  const isEventsPage = location.pathname === "/user/events";

  return (
    <DashboardLayout
      title="Citizen Dashboard"
      themeColor="blue"
      sidebarLinks={userLinks}
    >
      {isEventsPage ? (
        <div className="container p-2">
          <h4 className="mb-3 font-weight-bold">📅 Active Community Events</h4>

          {message && (
            <div
              className={`alert ${
                message.includes("Successful") ? "alert-success" : "alert-danger"
              } alert-dismissible fade show`}
              role="alert"
            >
              {message}
            </div>
          )}

          <div className="row">
            {events.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-info text-center">
                  No active events available at the moment. Please check back later!
                </div>
              </div>
            ) : (
              events.map((evt) => {
                const isRegistered = registeredEventIds.includes(evt.eid);

                return (
                  <div className="col-md-6 mb-4" key={evt.eid}>
                    <div className="card shadow-sm border-0 h-100">
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                          <h5 className="card-title text-primary fw-bold">
                            {evt.eventText}
                          </h5>
                          <p className="card-text mb-2">
                            <strong>📍 Location/Area:</strong> {evt.areaDetail}
                          </p>
                          <p className="card-text mb-3">
                            <strong>🕒 Date & Time:</strong>{" "}
                            {new Date(evt.date).toLocaleString()}
                          </p>
                        </div>

                        <div>
                          {isRegistered ? (
                            <button className="btn btn-success w-100" disabled>
                              ✓ Registered
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary w-100"
                              onClick={() => handleRegister(evt.eid)}
                            >
                              Register
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        /* Preserves all existing functionality for Dashboard, Add Complaint, My Complaints, Notices, etc. */
        <Outlet />
      )}
    </DashboardLayout>
  );
}