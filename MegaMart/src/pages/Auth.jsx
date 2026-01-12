import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Auth = () => {
  const navigate = useNavigate();
  const { signup, login } = useAuth();

  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ input change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let success = false;

    if (mode === "signup") {
      success = await signup({
        username: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (success) {
        setMode("login");
        setForm({ name: "", email: "", password: "" });
      }
    }

    if (mode === "login") {
      success = await login({
        email: form.email.trim(),
        password: form.password,
      });

      if (success) {
        navigate("/");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-linear-to-br from-blue-900 to-blue-200">
      {/* LEFT */}
      <div className="hidden md:flex items-center justify-center px-16 text-white">
        <img
          src="https://bandedesignfirm.co.za/wp-content/uploads/2021/09/ecommerce-vector.png"
          alt="ecommerce"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-center">
            <img src="/megamartIcon.png" alt="Megamart" className="h-30" />
          </div>
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-blue-900">MegaMart</span>
          </h1>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            {mode === "login" ? "Sign in" : "Create account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {mode === "signup" && (
              <Input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />
            )}

            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium
                         hover:bg-red-500 transition disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-5 text-sm text-gray-600">
            {mode === "login" ? (
              <>
                New here?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ reusable input component
const Input = ({ name, value, onChange, ...props }) => (
  <input
    name={name}
    value={value}
    onChange={onChange}
    required
    className="w-full border border-gray-300 rounded-lg px-4 py-3
               focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    {...props}
  />
);

export default Auth;
