import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateComplaint from "./pages/CreateComplaint";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/login" />}
      />

      {/* Authentication */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* User Routes */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/create-complaint"
        element={<CreateComplaint />}
      />

      <Route
        path="/my-complaints"
        element={<MyComplaints />}
      />

      {/* Admin Route */}
      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

      {/* Invalid Routes */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
            404 Page Not Found
          </div>
        }
      />
      <Route
  path="/profile"
  element={<Profile />}
/>

    </Routes>
  );
}

export default App;