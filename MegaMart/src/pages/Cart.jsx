import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gray-50">
        <div className="text-6xl">🛒</div>
        <h2 className="text-2xl font-semibold mt-4">Your cart is empty</h2>
        <p className="text-gray-500 mt-2 max-w-sm">
          Add items to your cart and get amazing deals.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-linear-to-r from-blue-900 to-blue-300
                     text-white px-8 py-3 rounded-full shadow-lg
                     hover:scale-105 transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }
  return (
    <div className="bg-gray-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10">
        {/* LEFT – ITEMS */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-semibold mb-6">
            Shopping Cart
            <span className="text-gray-500 text-base ml-2">
              ({items.length} items)
            </span>
          </h1>

          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md p-5 sm:p-6
                           flex flex-col sm:flex-row gap-6 hover:shadow-lg transition cursor-pointer"
                onClick={() =>
                  navigate(`/product/${item._id}`, {
                    state: { product: item },
                  })
                }
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-contain mx-auto sm:mx-0"
                />

                {/* INFO */}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 text-lg">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-lg font-semibold">₹{item.price}</span>
                    <span className="text-sm line-through text-gray-400">
                      ₹{item.original}
                    </span>
                    <span className="text-green-600 text-sm font-medium">
                      {Math.round(
                        ((item.original - item.price) / item.original) * 100
                      )}
                      % off
                    </span>
                  </div>

                  {/* QTY */}
                  <div className="flex items-center gap-4 mt-5">
                    <span className="text-sm text-gray-500">Quantity:</span>

                    <div
                      className="flex items-center border rounded-full px-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => dispatch(decreaseQty(item._id))}
                        className="w-8 h-8 text-lg"
                      >
                        −
                      </button>

                      <span className="px-3 font-medium">{item.quantity}</span>

                      <button
                        onClick={() => dispatch(increaseQty(item._id))}
                        className="w-8 h-8 text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* PRICE */}
                <div
                  className="flex sm:flex-col items-center sm:items-end justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xl font-bold text-indigo-900">
                    ₹{item.price * item.quantity}
                  </span>

                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-500 text-sm hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT – SUMMARY */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit lg:sticky lg:top-24">
          <h3 className="font-semibold text-xl mb-6">Price Details</h3>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{items.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Delivery Charges</span>
              <span>FREE</span>
            </div>

            <div className="flex justify-between font-semibold text-lg border-t pt-4">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            className="w-full mt-6 bg-linear-to-r from-blue-900 to-blue-300 
                       text-white py-3 rounded-xl text-lg font-medium
                       shadow-md hover:shadow-xl hover:scale-[1.02] transition"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => dispatch(clearCart())}
            className="w-full text-sm text-red-500 mt-4 hover:underline"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
