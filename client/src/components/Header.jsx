import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">
        Online Complaint Registration
      </h2>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default Header;