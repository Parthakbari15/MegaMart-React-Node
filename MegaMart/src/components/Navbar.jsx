import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);
  const [open, setOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.items.length);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("megamart_user");
    if (stored) {
      setAuth(JSON.parse(stored));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("megamart_user");
    setAuth(null);
    navigate("/auth");
  };

  const user = auth?.user; // ✅ SAFE

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex flex-row items-center">
          <img src="/megamartIcon.png" alt="" className="h-12" />

          <h1
            onClick={() => navigate("/")}
            className="text-xl font-bold cursor-pointer"
          >
            MegaMart
          </h1>
        </div>

        {/* SEARCH */}
        <input
          className="hidden md:block w-1/2 px-4 py-2 rounded-full bg-blue-50 outline-none"
          placeholder="Search essentials, groceries and more..."
        />

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-sm">
          {/* CART */}
          <button
            onClick={() => navigate("/cart")}
            className="relative font-medium"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* AUTH */}
          {!user ? (
            <button
              onClick={() => navigate("/auth")}
              className="hover:text-primary font-medium"
            >
              Sign Up / Login
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Button */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:block font-medium">
                  {user.username}
                </span>
                <span className="text-xs">▾</span>
              </button>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border overflow-hidden">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/orders");
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    My Orders
                  </button>

                  <div className="border-t">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
