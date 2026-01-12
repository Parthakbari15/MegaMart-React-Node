import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts.js";
import CategoryShimmer from "./CategoryShimmer.jsx";

const CategorySection = () => {
  const navigate = useNavigate();
  const { getCategories, loading } = useProducts();
  const [categoris, setCategories] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getCategories();
    setCategories(data);
  };
  return loading ? (
    <CategoryShimmer />
  ) : (
    <div className="max-w-7xl mx-auto px-4 mt-14">
      <h2 className="font-semibold text-lg mb-6">Shop From Top Categories</h2>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-6 text-center">
        {categoris.map((category) => (
          <div
            key={category._id}
            onClick={() => navigate(`/category/${category._id}`)}
            className="flex flex-col items-center cursor-pointer group"
          >
            {/* Image Circle */}
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 flex items-center justify-center 
                            group-hover:ring-2 group-hover:ring-primary transition"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Name */}
            <p className="text-sm mt-3 font-medium group-hover:text-primary transition">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
