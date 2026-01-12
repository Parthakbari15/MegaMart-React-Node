import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Home from "./pages/Home";
import CategoryDetails from "./pages/CategoryDetails";

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/auth";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* 🌍 PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <div className="bg-gray-50">
              <Home />
            </div>
          }
        />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:id" element={<CategoryDetails />} />
        {/* 🚪 AUTH (Guest only) */}
        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<Auth />} />
        </Route>

        {/* 🔒 PROTECTED ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
