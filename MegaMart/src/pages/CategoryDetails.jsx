import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import ProductShimmer from "../components/ProductShimmer";

const CategoryDetails = () => {
  const { id } = useParams();
  const { getProductsByCategory, loading } = useProducts();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchCategoryProducts();
  }, [id]);

  const fetchCategoryProducts = async () => {
    const res = await getProductsByCategory(id);
    console.log("CATEGORY API RESPONSE:", res);
    setProducts(res.products);
    setCategory(res.category);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      {/* CATEGORY HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{category?.name || "Category"}</h1>
        <p className="text-sm text-gray-500">{products.length} items found</p>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <ProductShimmer key={i} />)
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found in this category
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;
