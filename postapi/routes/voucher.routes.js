// routes/voucher.js
const express = require('express');
const router = express.Router();
const Voucher = require("../models/Voucher.model");

// Create voucher endpoint (existing)
router.post('/create', async (req, res) => {
  const { name, cost, expiryDate } = req.body;

  if (!name || !cost || !expiryDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newVoucher = new Voucher({
      name,
      cost,
      expiryDate: new Date(expiryDate),
    });

    const savedVoucher = await newVoucher.save();
    res.status(201).json(savedVoucher);
  } catch (error) {
    console.error('Error creating voucher:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch vouchers endpoint
router.get('/list', async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.status(200).json(vouchers);
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
