const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes"); // ✅ ADD THIS

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Amazon Mini Backend is running 🚀");
});

/* =========================
   MONGODB CONNECTION
========================= */
mongoose
  .connect(
    "mongodb+srv://amazonuser:Amazon123@cluster0.gk3wl1u.mongodb.net/amazonMini"
  )
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* =========================
   ROUTES
========================= */
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes); // ✅ ADD THIS

/* =========================
   SERVER
========================= */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});