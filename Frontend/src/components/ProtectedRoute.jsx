import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { authUser, isCheckingAuth, checkAuth  } = useAuthStore();

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }
    return authUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
