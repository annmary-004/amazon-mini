const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

/* =========================
   PLACE ORDER
========================= */
router.post("/place", async (req, res) => {
  try {
    const {
      userId,
      email,
      address,
      items,
      paymentMethod,
      subtotal,
      delivery,
      total,
    } = req.body;

    if (!userId || !email || !address || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing order data" });
    }

    const order = new Order({
      userId,
      email,
      address,
      items,
      paymentMethod: paymentMethod || "COD",
      subtotal,
      delivery: delivery || 0,
      total,
      status: "Order Placed",
    });

    await order.save();

    res.status(201).json({
      success: true,
      orderId: order._id,
    });
  } catch (error) {
    console.error("ORDER SAVE ERROR:", error);
    res.status(500).json({ message: "Order failed" });
  }
});

/* =========================
   GET ALL ORDERS BY USER
========================= */
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("FETCH USER ORDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* =========================
   CANCEL ORDER
========================= */
router.put("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Delivered") {
      return res
        .status(400)
        .json({ message: "Delivered orders cannot be cancelled" });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    console.error("CANCEL ORDER ERROR:", error);
    res.status(500).json({ message: "Unable to cancel order" });
  }
});

/* =========================
   GET SINGLE ORDER
========================= */
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("FETCH ORDER ERROR:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

module.exports = router;