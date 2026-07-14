import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post(
        "/users/register",
        formData
      );

      alert(res.data.message || "Registration Successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden font-sans">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-3xl shadow-2xl w-[420px] relative z-10 transition duration-300 hover:shadow-teal-500/5">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Sign up to report grievances and track issues
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <FaUser size={14} />
              </span>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-slate-700 text-sm placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <FaEnvelope size={14} />
              </span>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-slate-700 text-sm placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <FaLock size={14} />
              </span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-slate-700 text-sm placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          {/* Role Select */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Role Type
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <FaUserTag size={14} />
              </span>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-slate-700 text-sm appearance-none cursor-pointer"
              >
                <option value="user">User (Standard Access)</option>
                <option value="admin">Admin (System Manager)</option>
              </select>
              <div className="absolute right-4 pointer-events-none text-slate-400 text-xs">▼</div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 flex items-center justify-center cursor-pointer disabled:opacity-50 mt-6"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <span className="text-sm text-slate-500">Already have an account? </span>
          <Link
            to="/login"
            className="text-sm text-emerald-600 hover:text-emerald-700 font-bold transition hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;