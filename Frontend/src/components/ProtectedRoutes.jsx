import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {

    const auth = useSelector((state) => state.auth);

    const { isAuthenticated, user } = auth;

    console.log("AUTH :", auth);

    // User not logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // No user data
    if (!user) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Role validation
    if (role && user.rid !== role) {

        console.log(
            "Required Role:",
            role,
            "Current Role:",
            user.rid
        );

        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}