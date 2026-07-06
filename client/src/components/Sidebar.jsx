import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaPlusCircle,
  FaClipboardList,
  FaUserShield
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />
    },
    {
      name: "New Complaint",
      path: "/create-complaint",
      icon: <FaPlusCircle />
    },
    {
      name: "My Complaints",
      path: "/my-complaints",
      icon: <FaClipboardList />
    },
    {
      name: "Admin",
      path: "/admin",
      icon: <FaUserShield />
    }
  ];

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white shadow-2xl">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold">
          ComplaintHub
        </h1>
      </div>

      <div className="p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-4 rounded-xl transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;