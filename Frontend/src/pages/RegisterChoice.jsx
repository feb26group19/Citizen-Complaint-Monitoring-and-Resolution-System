import React from "react";
import { Link } from "react-router-dom";

export default function RegisterChoice() {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#74ebd5,#9face6)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-5 text-center"
        style={{
          maxWidth: "700px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <h2 className="fw-bold mb-3">
          Complaint Monitoring & Resolution System
        </h2>

        <p className="text-muted mb-5">
          Choose the type of account you want to create.
        </p>

        <div className="row g-4">

          {/* Citizen Registration */}

          <div className="col-md-6">
            <div className="card h-100 shadow border-success">
              <div className="card-body">
                <h3 className="text-success">👤 Citizen</h3>

                <p className="text-muted mt-3">
                  Register as a citizen to submit complaints,
                  track complaint status and earn reward points.
                </p>

                <Link
                  to="/register/citizen"
                  className="btn btn-success w-100 mt-3"
                >
                  Register as Citizen
                </Link>
              </div>
            </div>
          </div>

          {/* NGO Registration */}

          <div className="col-md-6">
            <div className="card h-100 shadow border-primary">
              <div className="card-body">
                <h3 className="text-primary">🏢 NGO</h3>

                <p className="text-muted mt-3">
                  Register your NGO to organize community
                  events, upload reports and participate
                  in civic activities.
                </p>

                <Link
                  to="/register/ngo"
                  className="btn btn-primary w-100 mt-3"
                >
                  Register as NGO
                </Link>
              </div>
            </div>
          </div>

        </div>

        <hr className="my-4" />

        <p>
          Already have an account?
        </p>

        <Link
          to="/login"
          className="btn btn-dark"
        >
          Login
        </Link>
      </div>
    </div>
  );
}