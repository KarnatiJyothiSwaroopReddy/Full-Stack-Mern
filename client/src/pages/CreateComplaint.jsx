import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import API from "../services/api";
import { FaEdit, FaTag, FaFileAlt, FaPaperPlane } from "react-icons/fa";

function CreateComplaint() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.description) {
      alert("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/complaints",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "Complaint Submitted Successfully!");

      setFormData({
        title: "",
        category: "",
        description: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit complaint");
    } finally {
      setSubmitting(false);
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
            File a Grievance 📝
          </h1>
          <p className="text-blue-100 mt-2 max-w-xl text-sm md:text-base">
            Describe the issue you're experiencing. Our support team will review and begin resolutions immediately.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mt-8 max-w-2xl mx-auto hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Grievance Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-600">
                Complaint Title
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400">
                  <FaEdit size={14} />
                </span>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Broken Water Pipe"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-slate-700 text-sm"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-600">
                Category
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400">
                  <FaTag size={14} />
                </span>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Water Supply, Roads, Electricity"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-slate-700 text-sm"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-600">
                Detailed Description
              </label>
              <div className="relative flex items-start">
                <span className="absolute left-4 top-3.5 text-slate-400">
                  <FaFileAlt size={14} />
                </span>
                <textarea
                  rows="6"
                  name="description"
                  placeholder="Provide any location details, landmark descriptions, or background info..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-slate-700 text-sm resize-none"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-8"
            >
              <FaPaperPlane size={12} />
              {submitting ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateComplaint;