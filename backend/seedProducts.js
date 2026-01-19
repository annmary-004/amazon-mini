const mongoose = require("mongoose");
const Product = require("./models/Product");
const products = require("./data/products");

mongoose
  .connect(
    "mongodb+srv://amazonuser:Amazon123@cluster0.gk3wl1u.mongodb.net/amazonMini"
  )
  .then(async () => {
    console.log("MongoDB connected");

    await Product.deleteMany(); // clear old products
    await Product.insertMany(products);

    console.log("✅ 5 Products added successfully");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });