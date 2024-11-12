const express = require('express');
const Coupon = require('../models/Coupon');
const router = express.Router();

router.post('/apply-coupon', async (req, res) => {
  const { code, totalAmount } = req.body;

  try {
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ message: 'Coupon is inactive' });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    // Calculate the discounted amount
    const discountAmount = (coupon.discountPercentage / 100) * totalAmount;
    const finalAmount = totalAmount - discountAmount;

    res.status(200).json({
      message: 'Coupon applied successfully',
      discountAmount,
      finalAmount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
