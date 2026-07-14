import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaShieldAlt } from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState({
    name: "User",
    email: "No email provided",
    role: "user",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed) {
          setUser(parsed);
        }
      } catch (e) {
        console.error("Error parsing user profile details:", e);
      }
    }
  }, []);

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Header />

        {/* Welcome Title */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-lg p-8 mt-6 relative overflow-hidden text-white">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            My Account Profile 👤
          </h1>
          <p className="text-blue-100 mt-2 max-w-xl text-sm md:text-base">
            Manage your personal profile details, account options, and role permissions.
          </p>
        </div>

        {/* Profile Details Sheet */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-8 max-w-2xl mx-auto hover:shadow-lg transition duration-300">
          <div className="flex flex-col items-center border-b border-slate-100 pb-8 mb-8">
            <div className="relative">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=2563eb&color=fff&size=150&font-size=0.4`}
                alt="Profile Avatar"
                className="w-36 h-36 rounded-full border-4 border-slate-100 shadow-md"
              />
              <span className="absolute bottom-1 right-2 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white shadow-sm"></span>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-800 mt-4">
              {user.name}
            </h2>

            <p className="text-slate-400 capitalize text-sm font-semibold tracking-wider mt-1 flex items-center gap-1.5">
              <FaShieldAlt size={12} className="text-slate-400" />
              {user.role} Account
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-700 mb-2">
              Account Credentials
            </h3>

            {/* Name Details */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                <FaUser size={16} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Full Name
                </div>
                <div className="font-bold text-slate-700">{user.name}</div>
              </div>
            </div>

            {/* Email Details */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
                <FaEnvelope size={16} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Email Address
                </div>
                <div className="font-bold text-slate-700">{user.email}</div>
              </div>
            </div>

            {/* Account Role Details */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                <FaShieldAlt size={16} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  System Role
                </div>
                <div className="font-bold text-slate-700 capitalize">
                  {user.role === "admin" ? "System Administrator" : "Standard Portal User"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;