import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./authContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}