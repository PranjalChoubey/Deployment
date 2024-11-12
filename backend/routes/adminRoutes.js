const express = require('express');
const Coupon = require('../models/Coupon');
const router = express.Router();

router.post('/create-coupon', async (req, res) => {
  const { code, discountPercentage, expiryDate } = req.body;

  try {
    const coupon = new Coupon({
      code,
      discountPercentage,
      expiryDate,
      isActive: true
    });

    await coupon.save();
    res.status(201).json({ message: 'Coupon created successfully', coupon });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
