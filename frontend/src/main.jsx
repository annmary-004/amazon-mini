import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext"; // ✅ ADD THIS

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider> {/* ✅ WRAP HERE */}
            <App />
            <Toaster position="top-right" reverseOrder={false} />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);