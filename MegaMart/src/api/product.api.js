import api from "./axiosSetup";

// Product APIs
export const getProductsApi = () => api.get("/api/products");
export const getProductsByCategoryApi = (id) =>
  api.get(`/api/products/category/${id}`);
export const getCategoriesApi = () => api.get("/api/categories");
