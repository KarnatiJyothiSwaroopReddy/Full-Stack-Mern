import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import API from "../services/api";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/complaints/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(res.data);
    } catch (error) {
      console.error("Error loading complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Header />

        {/* Title Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-lg p-8 mt-6 relative overflow-hidden text-white">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            My Filing Cabinet 📂
          </h1>
          <p className="text-blue-100 mt-2 max-w-xl text-sm md:text-base">
            Inspect all the grievances you have submitted, trace real-time timeline logs, and check the resolution status.
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mt-8 flex flex-col hover:shadow-md transition duration-300">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Submitted Grievance List
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                A historical log of your reported issues.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-slate-400 font-medium">
                Retrieving filed records...
              </div>
            ) : complaints.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-xl font-semibold">No records found</p>
                <p className="text-sm mt-1">You haven't filed any complaints yet.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase">
                    <th className="pb-3 pr-4">Title</th>
                    <th className="pb-3 pr-4">Category</th>
                    <th className="pb-3 pr-4">Date Submitted</th>
                    <th className="pb-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {complaints.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50 transition">
                      <td className="py-4 pr-4 font-semibold text-slate-700 max-w-[250px] truncate">
                        {item.title}
                      </td>
                      <td className="py-4 pr-4 text-slate-500 text-sm">
                        {item.category}
                      </td>
                      <td className="py-4 pr-4 text-slate-400 text-xs">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-center">
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
      </div>
    </div>
  );
}

export default MyComplaints;