import { Navigate } from "react-router-dom";
import useCustomSelector from "@/hooks/useCustomSelector";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const loggedUserId = useCustomSelector((state) => state.auth.loggedUserId);

  if (!loggedUserId) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
