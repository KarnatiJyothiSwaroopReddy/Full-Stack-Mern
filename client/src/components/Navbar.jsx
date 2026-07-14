import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          <h1 className="text-3xl font-bold text-white">
            Complaint Portal
          </h1>

          <div className="flex gap-6 items-center">
            <Link
              to="/dashboard"
              className="text-white hover:text-yellow-300 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/create-complaint"
              className="text-white hover:text-yellow-300 transition"
            >
              New Complaint
            </Link>

            <Link
              to="/my-complaints"
              className="text-white hover:text-yellow-300 transition"
            >
              My Complaints
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1.5 rounded-md text-white text-sm hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;