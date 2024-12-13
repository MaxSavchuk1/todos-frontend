import { Navigate } from "react-router-dom";
import useCustomSelector from "@/hooks/useCustomSelector";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const accessToken = useCustomSelector((state) => state.auth.accessToken);

  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
