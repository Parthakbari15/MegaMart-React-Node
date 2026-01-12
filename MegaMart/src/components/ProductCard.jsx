import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import { isAuthenticated } from "../utils/auth";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isInCart = useSelector((state) =>
    state.cart.items.some((item) => item._id === product._id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const openProductDetails = () => {
    navigate(`/product/${product.id}`, {
      state: { product },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="mx-auto h-40 object-contain cursor-pointer"
        onClick={openProductDetails}
      />

      <h3
        className="text-sm mt-4 font-medium line-clamp-2 cursor-pointer"
        onClick={openProductDetails}
      >
        {product.name}
      </h3>

      <div className="mt-2">
        <span className="font-bold">₹{product.price}</span>
        <span className="text-sm line-through ml-2 text-gray-400">
          ₹{product.original}
        </span>
      </div>

      <p className="text-green-600 text-sm mt-1">
        Save ₹{product.original - product.price}
      </p>

      {/* CTA – per product */}
      {!isInCart ? (
        <button
          onClick={
            isAuthenticated() ? handleAddToCart : () => navigate("/auth")
          }
          className="mt-auto bg-blue-900 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          Add to Cart
        </button>
      ) : (
        <button
          onClick={() => navigate("/cart")}
          className="mt-auto border border-blue-900 text-blue-900 py-2 rounded-lg text-sm"
        >
          Go to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
