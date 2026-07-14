import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import API from "../services/api";

function CreateComplaint() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      alert(res.data.message);

      setFormData({
        title: "",
        category: "",
        description: "",
      });
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <Header />

        <div className="bg-white p-8 rounded-3xl shadow-lg mt-8 max-w-3xl mx-auto">

          <h1 className="text-4xl font-bold mb-8 text-center">
            Create Complaint
          </h1>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Complaint Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl mb-4"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl mb-4"
            />

            <textarea
              rows="5"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl mb-4"
            />

            <button
              className="w-full bg-blue-600 text-white p-2 rounded-xl text-sm hover:bg-blue-700"
            >
              Submit Complaint
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateComplaint;