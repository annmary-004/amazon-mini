import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist"; // ✅ ADD

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import BusinessSignup from "./pages/BusinessSignup";

import ProtectedRoute from "./ProtectedRoute";
import ReviewOrder from "./pages/ReviewOrder";

function App() {
  const location = useLocation();

  // ❌ Hide navbar & footer on auth + flow pages
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/verify-email" ||
    location.pathname === "/business-signup" ||
    location.pathname === "/payment" ||
    location.pathname === "/order-success";

  return (
    <>
      {/* NAVBAR */}
      {!hideNavbar && <Navbar />}

      {/* MAIN CONTENT */}
      <main style={{ marginTop: hideNavbar ? "0" : "60px", minHeight: "100vh" }}>
        <Routes>
          {/* 🔓 AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* 🏢 BUSINESS */}
          <Route path="/business-signup" element={<BusinessSignup />} />

          {/* 🛍 PRODUCT DETAILS */}
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          {/* ❤️ WISHLIST */}
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          {/* 🏠 HOME */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* 🛒 CART */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* 📦 CHECKOUT */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* 💳 PAYMENT */}
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />

          {/* 📑 ORDERS */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          {/* 🧾 REVIEW */}
          <Route
            path="/review-order"
            element={
              <ProtectedRoute>
                <ReviewOrder />
              </ProtectedRoute>
            }
          />

          {/* ✅ SUCCESS */}
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* FOOTER */}
      {!hideNavbar && <Footer />}
    </>
  );
}

export default App;