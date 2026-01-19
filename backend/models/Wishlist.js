const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: String,
  products: Array,
});

module.exports = mongoose.model("Wishlist", wishlistSchema);