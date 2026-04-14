import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item._id === product._id);

      if (exist) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  
  const updateQty = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              qty:
                type === "inc"
                  ? item.qty + 1
                  : Math.max(item.qty - 1, 1),
            }
          : item
      )
    );
  };

  
  const removeItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQty,
        removeItem,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}