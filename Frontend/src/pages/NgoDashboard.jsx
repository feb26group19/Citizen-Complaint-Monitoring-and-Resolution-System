import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NgoDashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [myEvents, setMyEvents] = useState([]);

  const ngoLinks = [
    { label: "🏠 NGO Portal Overview", path: "/ngo" },
    { label: "📅 Create Event", path: "/create-event" },
    { label: "📁 Upload Reports", path: "/ngo/reports" },
    { label: "📊 View Stats", path: "/ngo/stats" },
  ];

  useEffect(() => {
    const ngoId = user?.ngoId || user?.uid;

    if (ngoId) {
      axios
        .get(`http://localhost:8083/events/ngo/${ngoId}`)
        .then((res) => {
          setMyEvents(res.data);
        })
        .catch((err) => {
          console.error("Error fetching NGO events:", err);
        });
    }
  }, [user]);

  const renderStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="badge bg-warning text-dark p-2">
            ⏳ Waiting for Approval
          </span>
        );

      case "APPROVED":
        return (
          <span className="badge bg-success p-2">
            ✅ Event Approved & Active
          </span>
        );

      case "REJECTED":
        return (
          <span className="badge bg-danger p-2">
            ❌ Event Rejected
          </span>
        );

      default:
        return (
          <span className="badge bg-secondary p-2">
            {status}
          </span>
        );
    }
  };

  return (
    <DashboardLayout
      title="NGO Portal"
      themeColor="red"
      sidebarLinks={ngoLinks}
    >
      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>My Submitted Events</h2>

          <button
            className="btn btn-danger"
            onClick={() => navigate("/create-event")}
          >
            ➕ Create New Event
          </button>
        </div>

        <div className="row">
          {myEvents.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">
                No events submitted yet.
              </div>
            </div>
          ) : (
            myEvents.map((evt) => (
              <div className="col-md-6 mb-3" key={evt.eid}>
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h5 className="card-title">{evt.eventText}</h5>

                    <p className="card-text mb-1">
                      <strong>Area:</strong> {evt.areaDetail}
                    </p>

                    <p className="card-text mb-2">
                      <strong>Date:</strong>{" "}
                      {new Date(evt.date).toLocaleString()}
                    </p>

                    {renderStatusBadge(evt.status)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}