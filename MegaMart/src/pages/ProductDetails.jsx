import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, decreaseQty } from "../store/cartSlice";
import { useState } from "react";
import { isAuthenticated } from "../utils/auth";

const ProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = state?.product;
  const [localQty, setLocalQty] = useState(1);

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item._id === product?._id)
  );

  const isInCart = Boolean(cartItem);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Product not found
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < localQty; i++) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-96 object-contain"
          />
        </div>

        {/* INFO */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <div className="mt-3 flex items-center gap-4">
            <span className="text-2xl font-bold text-blue-900">
              ₹{product.price}
            </span>
            <span className="line-through text-gray-400">
              ₹{product.original}
            </span>
            <span className="text-green-600 font-medium">
              {Math.round(
                ((product.original - product.price) / product.original) * 100
              )}
              % off
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-3">Inclusive of all taxes</p>

          {/* QUANTITY – SYNCED */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm">Quantity</span>

            <div className="flex items-center border rounded-lg">
              <button
                onClick={() =>
                  isInCart
                    ? dispatch(decreaseQty(product._id))
                    : localQty > 1 && setLocalQty(localQty - 1)
                }
                className="px-4 py-2"
              >
                −
              </button>

              <span className="px-4 font-medium">
                {isInCart ? cartItem.quantity : localQty}
              </span>

              <button
                onClick={() =>
                  isInCart
                    ? dispatch(increaseQty(product._id))
                    : setLocalQty(localQty + 1)
                }
                className="px-4 py-2"
              >
                +
              </button>
            </div>
          </div>

          {/* ACTION */}
          <div className="mt-8 flex gap-4">
            {!isInCart ? (
              <button
                onClick={
                  isAuthenticated() ? handleAddToCart : () => navigate("/auth")
                }
                className="flex-1 bg-blue-900 text-white py-3 rounded-lg text-lg hover:bg-red-500"
              >
                Add to Cart
              </button>
            ) : (
              <button
                onClick={() => navigate("/cart")}
                className="flex-1 border border-blue-900 text-blue-900 py-3 rounded-lg text-lg"
              >
                Go to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
