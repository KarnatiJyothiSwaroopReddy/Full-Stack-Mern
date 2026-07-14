import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AnalyticsChart from "../components/AnalyticsChart";
import API from "../services/api";

function Dashboard() {
  const [userName, setUserName] = useState("User");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.name) {
          setUserName(parsed.name);
        }
      } catch (e) {
        console.error("Error parsing user details:", e);
      }
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch user stats
      const statsRes = await API.get("/complaints/my/stats", { headers });
      setStats(statsRes.data);

      // Fetch user complaints
      const complaintsRes = await API.get("/complaints/my", { headers });
      setComplaints(complaintsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.description) {
      alert("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await API.post("/complaints", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message || "Complaint Submitted Successfully!");
      setFormData({ title: "", category: "", description: "" });
      // Reload stats and list
      await fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit complaint");
    } finally {
      setSubmitting(false);
    }
  };

  const cards = [
    {
      title: "My Complaints",
      value: stats.total,
      color: "bg-gradient-to-r from-blue-500 to-indigo-500",
    },
    {
      title: "Pending Approval",
      value: stats.pending,
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Header />

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 rounded-3xl shadow-lg p-8 mt-6 relative overflow-hidden text-white">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Welcome Back, {userName}! 👋
          </h1>
          <p className="text-blue-100 mt-2 max-w-xl text-sm md:text-base">
            File new grievances, track current complaint statuses, and monitor your resolution history in real-time.
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

        {/* My Complaints and Statuses */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 mt-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                My Complaints
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Recent grievances submitted by you.
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-10 text-slate-400">
                Loading complaints...
              </div>
            ) : complaints.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="text-lg font-medium">No complaints filed yet</p>
                <p className="text-xs mt-1">Click "New Complaint" in the sidebar to submit one.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase">
                    <th className="pb-3 pr-4">Title</th>
                    <th className="pb-3 pr-4">Category</th>
                    <th className="pb-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {complaints.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50 transition">
                      <td className="py-3.5 pr-4 font-semibold text-slate-700 max-w-[200px] truncate">
                        {item.title}
                      </td>
                      <td className="py-3.5 pr-4 text-slate-500 text-sm">
                        {item.category}
                      </td>
                      <td className="py-3.5 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                            item.status === "Resolved"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              : item.status === "In Progress"
                              ? "bg-purple-50 text-purple-600 border border-purple-100"
                              : "bg-amber-50 text-amber-600 border border-amber-100"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-8">
          <AnalyticsChart stats={stats} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;