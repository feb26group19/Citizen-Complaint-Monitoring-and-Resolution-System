import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children, role }) {


    const auth = useSelector(
        (state) => state.auth
    );


    const { isAuthenticated, user } = auth;


    console.log("AUTH STATE:", auth);



    // Not logged in
    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }



    // User object missing
    if (!user) {

        return <Navigate to="/unauthorized" replace />;

    }



    // Role checking
    if (role && user.role?.rid !== role) {

        console.log(
            "Required Role:",
            role,
            "Current Role:",
            user.role?.rid
        );

        return <Navigate to="/unauthorized" replace />;

    }



    return children;

}