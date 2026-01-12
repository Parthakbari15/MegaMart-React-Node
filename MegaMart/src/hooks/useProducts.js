import { useState } from "react";
import toast from "react-hot-toast";
import {
  getProductsApi,
  getCategoriesApi,
  getProductsByCategoryApi,
} from "../api/product.api";

export const useProducts = () => {
  const [loading, setLoading] = useState(false);

  //Get Products
  const getProducts = async () => {
    try {
      setLoading(true);

      const { data } = await getProductsApi();

      return data.data; // API response { success, data }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load products";

      toast.error(message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = async (id) => {
  try {
    setLoading(true);

    const { data } = await getProductsByCategoryApi(id);

    // ✅ RETURN FULL RESPONSE
    return {
      products: data.products,
      category: data.category,
    };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to load products";

    toast.error(message);
    return { products: [], category: null };
  } finally {
    setLoading(false);
  }
};


  //Get Category
  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await getCategoriesApi();
      return data.data;
    } catch (error) {
      const message =
        error?.response?.data.message ||
        error?.message ||
        "Failed to load products";
      toast.error(message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { getProducts, getCategories, getProductsByCategory, loading };
};
