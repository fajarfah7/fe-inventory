import { useAuth } from "@/store/auth";
import { Navigate } from "react-router-dom";

export function RouteProtector({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />
}