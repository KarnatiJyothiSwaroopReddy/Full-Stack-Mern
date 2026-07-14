import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import API from "../services/api";
function AdminDashboard() {
  const [adminName, setAdminName] = useState("Administrator");
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [activeTab, setActiveTab] = useState("complaints"); // "complaints" or "users"
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchData();
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.name) {
          setAdminName(parsed.name);
        }
      } catch (e) {
        console.error("Error parsing admin details:", e);
      }
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch all complaints
      const complaintsRes = await API.get("/complaints", { headers });
      setComplaints(complaintsRes.data);

      // Fetch all users
      const usersRes = await API.get("/users", { headers });
      setUsers(usersRes.data);

      // Fetch global statistics
      const statsRes = await API.get("/complaints/stats", { headers });
      setStats(statsRes.data);
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    setUpdatingId(complaintId);
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await API.put(
        `/complaints/${complaintId}`,
        { status: newStatus },
        { headers }
      );

      // Locally update complaints status
      setComplaints((prev) =>
        prev.map((c) =>
          c._id === complaintId ? { ...c, status: newStatus } : c
        )
      );

      // Reload stats
      const statsRes = await API.get("/complaints/stats", { headers });
      setStats(statsRes.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const cards = [
    {
      title: "Total Registered Users",
      value: users.length,
      color: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    },
    {
      title: "Total Complaints",
      value: stats.total,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      title: "Pending Resolution",
      value: stats.pending,
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
    {
      title: "Resolved Cases",
      value: stats.resolved,
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Header />

        {/* Title Section */}
        <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-fuchsia-700 rounded-3xl shadow-lg p-8 mt-6 relative overflow-hidden text-white">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Admin Control Center, {adminName}! 🔑
          </h1>
          <p className="text-violet-100 mt-2 max-w-xl text-sm md:text-base">
            Overview of system usage, user list database, and direct status resolution controls for all complaints.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`${card.color} text-white rounded-2xl p-5 md:p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300`}
            >
              <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider opacity-90">
                {card.title}
              </h3>
              <p className="text-3xl md:text-4xl font-extrabold mt-3">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 mt-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("complaints")}
            className={`pb-4 px-6 font-bold text-sm transition relative cursor-pointer ${
              activeTab === "complaints" ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            All Complaints ({complaints.length})
            {activeTab === "complaints" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-4 px-6 font-bold text-sm transition relative cursor-pointer ${
              activeTab === "users" ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            User Details ({users.length})
            {activeTab === "users" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-white rounded-3xl p-6 md:p-8 mt-6 shadow-sm border border-slate-100">
          {loading ? (
            <div className="text-center py-20 text-slate-400 font-medium">
              Loading data...
            </div>
          ) : activeTab === "complaints" ? (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                All Filed Complaints
              </h2>

              <div className="overflow-x-auto">
                {complaints.length === 0 ? (
                  <div className="text-center py-10 text-slate-400">
                    No complaints registered in the system.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase">
                        <th className="pb-3 pr-4">Title</th>
                        <th className="pb-3 pr-4">Category</th>
                        <th className="pb-3 pr-4">Filed By</th>
                        <th className="pb-3 pr-4">Date</th>
                        <th className="pb-3 text-center">Status Control</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {complaints.map((c) => (
                        <tr key={c._id} className="hover:bg-slate-50/50 transition">
                          <td className="py-4 pr-4 font-semibold text-slate-700 max-w-[200px] truncate">
                            {c.title}
                          </td>
                          <td className="py-4 pr-4 text-slate-500 text-sm">
                            {c.category}
                          </td>
                          <td className="py-4 pr-4 text-sm">
                            <div className="font-semibold text-slate-700">
                              {c.userId?.name || "Unknown User"}
                            </div>
                            <div className="text-slate-400 text-xs">
                              {c.userId?.email || "No Email"}
                            </div>
                          </td>
                          <td className="py-4 pr-4 text-slate-400 text-xs">
                            {new Date(c.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 text-center">
                            <select
                              value={c.status}
                              disabled={updatingId === c._id}
                              onChange={(e) => handleStatusChange(c._id, e.target.value)}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold border focus:outline-none focus:ring-2 cursor-pointer ${
                                c.status === "Resolved"
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100 focus:ring-emerald-500/20"
                                  : c.status === "In Progress"
                                  ? "bg-purple-50 text-purple-600 border-purple-100 focus:ring-purple-500/20"
                                  : "bg-amber-50 text-amber-600 border-amber-100 focus:ring-amber-500/20"
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Registered User Directory
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase">
                      <th className="pb-3 pr-4">User Details</th>
                      <th className="pb-3 pr-4 text-center">Role</th>
                      <th className="pb-3 pr-4 text-center">Joined Date</th>
                      <th className="pb-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {users.map((u) => (
                      <tr key={u._id} className="hover:bg-slate-50/50 transition">
                        <td className="py-4 pr-4">
                          <div className="font-semibold text-slate-700">{u.name}</div>
                          <div className="text-slate-400 text-sm">{u.email}</div>
                        </td>
                        <td className="py-4 pr-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold inline-block capitalize ${
                              u.role === "admin"
                                ? "bg-red-50 text-red-600 border border-red-100"
                                : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-center text-slate-400 text-xs">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-center text-slate-400 text-xs">
                          {complaints.filter((c) => c.userId?._id === u._id).length} filed complaints
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;