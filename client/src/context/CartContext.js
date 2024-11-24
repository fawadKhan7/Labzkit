import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the item with the same ID, color, and size already exists
      const existingProductIndex = prevCart.findIndex(
        (item) =>
          item._id === product._id &&
          item.color === product.color &&
          item.size === product.size
      );
      if (existingProductIndex >= 0) {
        // If it exists, update the quantity
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        // Else, add new item
        return [...prevCart, product];
      }
    });
  };

  const removeItem = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // Clear cart from localStorage
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        cartLength: cart.length,
        clearCart,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
