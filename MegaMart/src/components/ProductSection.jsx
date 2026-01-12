import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductShimmer from "./ProductShimmer";
import { useProducts } from "../hooks/useProducts";

const ProductSection = () => {
  const { getProducts, loading } = useProducts();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    console.log("Products API data:", data);
    setProducts(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">
          Grab the best deal on Smartphones
        </h2>
        <span className="text-primary text-sm cursor-pointer">View All</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <ProductShimmer key={i} />
          ))
        ) : products.length > 0 ? (
          products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products available
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
