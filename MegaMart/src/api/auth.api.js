import api from "./axiosSetup";

//Auth Api
export const signupApi = (payload) => api.post("/api/auth/signup", payload);

export const loginApi = (payload) => api.post("/api/auth/login", payload);
