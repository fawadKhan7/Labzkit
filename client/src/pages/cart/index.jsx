import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orders";
import { getImageUrl, imagesProduct } from "../../utils/functions";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, clearCart, removeItem } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCompleteOrder = async () => {
    setLoading(true);
    await createOrder({ products: cartItems })
      .then(() => {
        toast.success("Order Completed");
        clearCart();
      })
      .catch(() => {
        toast.error("Couldn't complete your order!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-[#1f2937] min-h-screen">
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-grow border-t border-1 border-black dark:border-white"></div>
        <h1 className="text-gray-900 dark:text-darkText text-lg">Your Cart</h1>
        <div className="flex-grow border-t border-1 border-black dark:border-white"></div>
      </div>

      {cartItems.length > 0 ? (
        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Image</th>
                <th className="px-4 py-2 border-b">Product</th>
                <th className="px-4 py-2 border-b">Size</th>
                <th className="px-4 py-2 border-b">Color</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Quantity</th>
                <th className="px-4 py-2 border-b">Total</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="px-4 py-2 border-b">
                    <img
                      src={
                        item.image
                          ? getImageUrl(item.image)
                          : imagesProduct[item.gender]
                      }
                      alt={item.name}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">{item.name}</td>
                  <td className="px-4 py-2 border-b">{item.size}</td>
                  <td className="px-4 py-2 border-b">{item.color}</td>
                  <td className="px-4 py-2 border-b">${item.price}</td>
                  <td className="px-4 py-2 border-b">{item.quantity}</td>
                  <td className="px-4 py-2 border-b">
                    ${item.price * item.quantity}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => removeItem(item._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="dark:text-white text-center text-xl">
          Your cart is empty.
        </p>
      )}

      {cartItems.length > 0 && (
        <div className="flex flex-col items-end mt-6">
          <h3 className=" text-lg font-semibold dark:text-white">
            Total: ${calculateTotal()}
          </h3>
          <div className="flex items-center">
            <button
              disabled={loading}
              onClick={handleCompleteOrder}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Complete Order
            </button>
            <button
              onClick={clearCart}
              className="mt-4 ml-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
