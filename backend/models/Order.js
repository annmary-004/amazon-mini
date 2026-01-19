const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true, // ✅ fast user-wise order queries
    },

    email: {
      type: String,
      required: true,
    },

    address: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      landmark: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    items: [
      {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "UPI", "CARD"],
      default: "COD",
    },

    subtotal: {
      type: Number,
      required: true,
    },

    delivery: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Order Placed",
      enum: [
        "Order Placed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Order", orderSchema);
