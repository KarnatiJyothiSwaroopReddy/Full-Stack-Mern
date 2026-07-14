import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaPlusCircle,
  FaClipboardList,
  FaUserShield,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem("sidebarCollapsed");
      return saved === "true";
    } catch (e) {
      return false;
    }
  });

  // persist collapsed state
  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("sidebarCollapsed", next);
      } catch (e) {
        // ignore
      }
      return next;
    });
  };
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

  // filter menu based on role
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
  const filteredMenu = menu.filter((item) => {
    if (role === "admin") {
      return item.path === "/admin";
    } else {
      return item.path !== "/admin";
    }
  });

  return (
    <div className={`${collapsed ? "w-20" : "w-72"} min-h-screen bg-slate-900 text-white shadow-2xl transition-all duration-300 overflow-hidden z-10`}>
      <div className={`p-6 border-b border-slate-700 relative ${collapsed ? "flex items-center justify-center" : "flex items-center justify-start"} overflow-hidden` }>
        <div className={`${collapsed ? "text-lg font-semibold text-white whitespace-nowrap" : "text-2xl font-bold text-white ml-2 tracking-tight truncate"}`}>
          {collapsed ? "CH" : "ComplaintHub"}
        </div>

        <button
          onClick={toggleCollapsed}
          className="absolute right-3 top-3 bg-slate-800 hover:bg-slate-700 p-2 rounded text-sm"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <div className="p-3 space-y-2">
        {filteredMenu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            title={item.name}
            className={`flex items-center gap-3 p-3 rounded-xl transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            } ${collapsed ? "justify-center" : ""}`}
          >
            {item.icon}
            <span className={`${collapsed ? "hidden" : "inline"}`}>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;