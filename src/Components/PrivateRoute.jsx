import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/admin/login" replace />;
}