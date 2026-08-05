import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeComp from "./pages/Home";
import LoginComp from "./components/LoginComp";

import RegisterChoice from "./pages/RegisterChoice";
import CitizenRegister from "./pages/CitizenRegister";
import NgoRegister from "./pages/NgoRegister";

import ProtectedRoute from "./components/ProtectedRoutes";
import LogoutComp from "./pages/LogOutComp";

import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import OfficerDashboard from "./pages/OfficerDashboard";
import NgoDashboard from "./pages/NgoDashboard";

import OfficerRegister from "./pages/OfficerRegister";
import PendingNgoList from "./pages/PendingNgoList";
import SubmitComplaint from "./pages/SubmitComplaint";
import MyComplaints from "./pages/MyComplaints";

import OfficerComplaints from "./pages/OfficerComplaints";
import AddNotice from "./pages/AddNotice";

import SubmitEvent from "./pages/SubmitEvent";
import CitizenEvents from "./pages/CitizenEvents";

import AdminFeedback from "./pages/AdminFeedback";
import OfficerFeedback from "./pages/OfficerFeedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<HomeComp />} />

        <Route path="/login" element={<LoginComp />} />

        <Route path="/register" element={<RegisterChoice />} />

        <Route path="/register/citizen" element={<CitizenRegister />} />

        <Route path="/register/ngo" element={<NgoRegister />} />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role={1}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<h2>Welcome Admin Dashboard</h2>} />

          <Route path="pending-ngos" element={<PendingNgoList />} />

          <Route path="departments" element={<h2>Manage Departments</h2>} />

          <Route path="officers" element={<OfficerRegister />} />

          <Route path="citizens" element={<h2>Manage Citizens</h2>} />

          <Route path="complaints" element={<h2>View Complaints</h2>} />

          <Route path="feedback" element={<AdminFeedback />} />

          <Route path="notices" element={<h2>Notice Board</h2>} />

          <Route path="events" element={null} />

          <Route path="logout" element={<LogoutComp />} />
        </Route>

        {/* ================= CITIZEN ================= */}

        <Route
          path="/user"
          element={
            <ProtectedRoute role={2}>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<h2>Citizen Dashboard</h2>} />

          <Route path="submit" element={<SubmitComplaint />} />

          <Route path="status" element={<MyComplaints />} />

          <Route path="events" element={null} />

          <Route path="logout" element={<LogoutComp />} />
        </Route>

        {/* ================= NGO ================= */}

        <Route
          path="/ngo"
          element={
            <ProtectedRoute role={3}>
              <NgoDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<h2>NGO Dashboard</h2>} />

          <Route path="create-event" element={<h2>Create Community Event</h2>} />

          <Route path="schedule" element={<h2>Schedule Events</h2>} />

          <Route path="reports" element={<h2>Upload Reports</h2>} />

          <Route path="promote" element={<h2>Promote Activities</h2>} />

          <Route path="stats" element={<h2>NGO Statistics</h2>} />

          <Route path="logout" element={<LogoutComp />} />
        </Route>

        {/* ================= OFFICER ================= */}

        <Route
          path="/officer"
          element={
            <ProtectedRoute role={4}>
              <OfficerDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<h2>Officer Dashboard</h2>} />

          <Route path="assigned" element={<OfficerComplaints />} />

          <Route path="status" element={<h2>Update Complaint Status</h2>} />

          <Route path="remarks" element={<AddNotice />} />

          <Route path="statistics" element={<h2>Performance Statistics</h2>} />

          <Route path="feedback" element={<OfficerFeedback />} />

          <Route path="logout" element={<LogoutComp />} />
        </Route>

        {/* ================= OTHER ROUTES ================= */}

        <Route
          path="/unauthorized"
          element={
            <div className="container mt-5 text-center">
              <h2 className="text-danger">Unauthorized Access</h2>
              <p>You are not allowed to access this page.</p>
            </div>
          }
        />

        <Route
          path="/create-event"
          element={
            <ProtectedRoute role={3}>
              <SubmitEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/citizen-events"
          element={
            <ProtectedRoute role={2}>
              <CitizenEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <div className="container mt-5 text-center">
              <h1>404</h1>
              <h3>Page Not Found</h3>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
