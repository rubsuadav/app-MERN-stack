import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./authContext";
import React from "react";

export default function PublicRoute() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
