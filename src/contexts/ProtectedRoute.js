import React from 'react';
import { Navigate, Outlet} from "react-router-dom";

export function ProtectedRoute(props) {
    const {role} = props;
    console.log(role);
    if (role !== "admin") {
        return <Navigate to={'/'} replace />
    }
    return <Outlet />
}
