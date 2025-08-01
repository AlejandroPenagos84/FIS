import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Cargando...</div>;

  return user
    ? <Outlet />
    : <Navigate to="/" replace state={{ from: location }} />;
}