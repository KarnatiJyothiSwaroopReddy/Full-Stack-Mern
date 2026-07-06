import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import API from "../services/api";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");
      setComplaints(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <Header />

        <div className="bg-white p-8 rounded-3xl shadow-lg mt-8">

          <h1 className="text-4xl font-bold mb-6">
            My Complaints
          </h1>

          <table className="w-full">

            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>

              {complaints.map((item) => (
                <tr
                  key={item._id}
                  className="border-b text-center hover:bg-gray-100"
                >
                  <td className="p-4">
                    {item.title}
                  </td>

                  <td className="p-4">
                    {item.category}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-4 py-2 rounded-full text-white ${
                        item.status === "Resolved"
                          ? "bg-green-500"
                          : item.status === "In Progress"
                          ? "bg-purple-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

export default MyComplaints;