const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/* =========================
   GET ALL PRODUCTS
   (supports category, search, sort)
========================= */
router.get("/", async (req, res) => {
  try {
    const { category, search, sort } = req.query;

    let filter = {};

    // 🔍 Search by name
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // 📂 Filter by category
    if (category) {
      filter.category = category;
    }

    let query = Product.find(filter);

    // 🔽 Sorting
    if (sort === "priceLow") query = query.sort({ price: 1 });
    if (sort === "priceHigh") query = query.sort({ price: -1 });
    if (sort === "latest") query = query.sort({ createdAt: -1 });

    const products = await query;
    res.status(200).json(products);
  } catch (error) {
    console.error("PRODUCT FETCH ERROR:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/* =========================
   GET SINGLE PRODUCT
========================= */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("SINGLE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

module.exports = router;