import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

export default function LogoutComp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate("/");
    }, [dispatch, navigate]);

    // Fixed: Prevents React from throwing a rendering crash error
    return null; 
}