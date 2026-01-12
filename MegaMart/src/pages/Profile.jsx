import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("megamart_user");
    if (stored) {
      setAuth(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("megamart_user");
    navigate("/auth");
  };

  const user = auth?.user;

  // 🔒 Not logged in
  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-semibold">You are not logged in</h2>
        <p className="text-gray-500 mt-2">Please login to view your profile</p>
        <button
          onClick={() => navigate("/auth")}
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-6">
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-full bg-indigo-600 text-white
                          flex items-center justify-center text-3xl font-bold"
          >
            {user.username.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl font-semibold">{user.username}</h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-400 mt-1">
              Member since {new Date(auth.loggedInAt).toDateString()}
            </p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Account Details */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Account Details</h2>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Username</p>
                <p className="font-medium">{user.username}</p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-gray-500">User ID</p>
                <p className="font-medium">{user.id}</p>
              </div>
            </div>

            <button
              className="mt-6 border border-indigo-600 text-indigo-600
                         px-4 py-2 rounded-lg hover:bg-indigo-50"
            >
              Edit Profile
            </button>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Account Actions</h2>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/orders")}
                className="w-full text-left px-4 py-3 rounded-lg
                           hover:bg-gray-50 border"
              >
                My Orders
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full text-left px-4 py-3 rounded-lg
                           hover:bg-gray-50 border"
              >
                My Cart
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-lg
                           text-red-600 hover:bg-red-50 border"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
