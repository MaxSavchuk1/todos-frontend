import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { SignInForm } from "./views/SignIn";
import { SignUpForm } from "./views/SignUp";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { lazy, Suspense } from "react";

const Board = lazy(() => import("./views/Board"));

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500 mb-2">Jeera 🤪</h1>

      <Router>
        <Suspense fallback={<div>"Loading..."</div>}>
          <Routes>
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Board />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
