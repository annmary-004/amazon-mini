import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 🔐 persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ add
  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // ❌ remove
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // 🔢 update qty
  const updateQty = (id, qty) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty } : item
      )
    );
  };

  // 🧹 clear after order
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);