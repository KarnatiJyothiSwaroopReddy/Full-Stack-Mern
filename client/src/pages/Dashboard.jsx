import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AnalyticsChart from "../components/AnalyticsChart";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/complaints/stats");

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Total Complaints",
      value: stats.total,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      title: "Pending",
      value: stats.pending,
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      color: "bg-gradient-to-r from-purple-500 to-indigo-600",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <Header />

        {/* Welcome Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-6">
          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor complaints, track progress and
            manage grievance resolutions efficiently.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`${card.color} text-white rounded-3xl p-8 shadow-xl hover:scale-105 transition duration-300`}
            >
              <h3 className="text-xl font-semibold">
                {card.title}
              </h3>

              <p className="text-5xl font-bold mt-4">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              Street Light Complaint Created
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-2">
              Water Leakage Resolved
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              Road Repair Pending
            </div>

          </div>
        </div>

        {/* Analytics */}
        <div className="mt-8">
          <AnalyticsChart stats={stats} />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;