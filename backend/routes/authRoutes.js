const express = require("express");
const User = require("../models/User");

const router = express.Router();

/* =========================
   SAVE VERIFIED USER
========================= */
router.post("/verify-user", async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    // ✅ Find user by EMAIL (not mobile)
    let user = await User.findOne({ email });

    if (user) {
      user.isVerified = true;
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        mobile,
        isVerified: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "User verified successfully",
      user,
    });
  } catch (error) {
    console.error("VERIFY USER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;