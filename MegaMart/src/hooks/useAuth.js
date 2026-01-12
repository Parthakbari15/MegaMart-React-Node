import toast from "react-hot-toast";
import { signupApi, loginApi } from "../api/auth.api";
import { saveUser } from "../utils/storage";

export const useAuth = () => {
  const signup = async (payload) => {
    try {
      await signupApi(payload);
      toast.success("Account created successfully 🎉");
      return true;
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Signup failed";

      toast.error(message);
      return false;
    }
  };

  const login = async (payload) => {
    try {
      const { data } = await loginApi(payload);
      saveUser(data);
      toast.success(`Welcome back, ${data.user.username} 👋`);
      return true;
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Login failed";

      toast.error(message);
      return false;
    }
  };

  return { signup, login };
};
