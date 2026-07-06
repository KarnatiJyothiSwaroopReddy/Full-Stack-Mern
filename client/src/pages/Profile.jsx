import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Profile() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <Header />

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <img
              src="https://ui-avatars.com/api/?name=Swaroop"
              alt="Profile"
              className="w-40 h-40 rounded-full"
            />

            <h1 className="text-4xl font-bold mt-4">
              Swaroop
            </h1>

            <p className="text-gray-500">
              Full Stack MERN Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;