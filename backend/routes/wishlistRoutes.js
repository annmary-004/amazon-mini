const express = require("express");
const Wishlist = require("../models/Wishlist");
const router = express.Router();

router.post("/save", async (req, res) => {
  const { userId, products } = req.body;

  await Wishlist.findOneAndUpdate(
    { userId },
    { products },
    { upsert: true }
  );

  res.json({ success: true });
});

router.get("/:userId", async (req, res) => {
  const data = await Wishlist.findOne({ userId: req.params.userId });
  res.json(data || { products: [] });
});

module.exports = router;