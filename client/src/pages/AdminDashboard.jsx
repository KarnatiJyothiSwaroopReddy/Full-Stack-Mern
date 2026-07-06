import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AdminDashboard() {
  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        <Header />

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-red-500 text-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl">
              Total Users
            </h2>

            <p className="text-5xl font-bold mt-4">
              25
            </p>
          </div>

          <div className="bg-blue-500 text-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl">
              Complaints
            </h2>

            <p className="text-5xl font-bold mt-4">
              12
            </p>
          </div>

          <div className="bg-green-500 text-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl">
              Resolved
            </h2>

            <p className="text-5xl font-bold mt-4">
              4
            </p>
          </div>

        </div>

        <div className="bg-white mt-8 p-8 rounded-3xl shadow-lg">

          <h2 className="text-3xl font-bold mb-6">
            Admin Controls
          </h2>

          <ul className="space-y-4 text-lg">
            <li>✅ View All Complaints</li>
            <li>✅ Update Complaint Status</li>
            <li>✅ Manage Users</li>
            <li>✅ Track Complaint Analytics</li>
          </ul>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;