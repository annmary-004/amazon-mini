const express = require("express");
const User = require("../models/User");

const router = express.Router();

/* =========================
   SAVE VERIFIED USER
========================= */
router.post("/verify-user", async (req, res) => {
  try {
    const { name, mobile, email } = req.body;

    // check if user already exists
    let user = await User.findOne({ mobile });

    if (user) {
      user.isVerified = true;
      await user.save();
    } else {
      user = await User.create({
        name,
        mobile,
        email,
        isVerified: true,
      });
    }

    res.status(200).json({
      message: "User verified & saved",
      user,
    });
  } catch (error) {
    console.error("VERIFY USER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;