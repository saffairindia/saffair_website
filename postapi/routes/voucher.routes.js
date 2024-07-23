// routes/voucher.js
const express = require('express');
const router = express.Router();
const Voucher = require("../models/Voucher.model");
const Users = require('../models/Users');

// Create voucher endpoint (existing)
router.post('/create', async (req, res) => {
  const { name, cost, expiryDate ,code , info  } = req.body;

  if (!name || !cost || !expiryDate || !code) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newVoucher = new Voucher({
      name,
      cost,
      expiryDate: new Date(expiryDate),
      code,
      info
    });

    const savedVoucher = await newVoucher.save();
    res.status(201).json(savedVoucher);
  } catch (error) {
    console.error('Error creating voucher:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//delet voucher
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const voucher = await Voucher.findByIdAndDelete(id);

    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }

    res.status(200).json({ message: 'Voucher deleted successfully' });
  } catch (error) {
    console.error('Error deleting voucher:', error);
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

router.post('/redeem/:id', async (req, res) => {
  try {
    const { userId, voucherCost } = req.body;
    const voucherId = req.params.id;

    // Get user and check coin balance
    const user = await Users.findById(userId);
    if (user.totalCoins < voucherCost) {
      return res.status(400).json({ message: 'Insufficient coins' });
    }

    // Get voucher and check if it's already redeemed
    const voucher = await Voucher.findById(voucherId);
    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }
    if (voucher.isRedeemed) {
      return res.status(400).json({ message: 'Voucher has already been redeemed' });
    }

    // Check if the voucher has expired
    if (new Date() > voucher.expiryDate) {
      return res.status(400).json({ message: 'Voucher has expired' });
    }

    // Add a new entry to coin history for voucher redemption
    user.coinHistory.push({
      eventName: 'Voucher Redemption',
      coinsEarned: -voucherCost, // Negative value to represent spending
      date: new Date()
    });

    // Mark voucher as redeemed and associate it with the user
    voucher.isRedeemed = true;
    voucher.userId = userId;

    // Save changes
    await Promise.all([user.save(), voucher.save()]);

    // Decrypt voucher code (implement this function based on your encryption method)
    const decryptedCode = decryptVoucherCode(voucher.code);

    res.status(200).json({ 
      message: 'Voucher redeemed successfully', 
      decryptedCode,
      newTotalCoins: user.totalCoins // Send updated total coins
    });
  } catch (error) {
    console.error('Error redeeming voucher:', error);
    res.status(500).json({ message: error.message });
  }
});

function decryptVoucherCode(code) {
  const shift = 3; // Example shift value, you can change this
  return code
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        if ((code >= 65) && (code <= 90)) {
          return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
        } else if ((code >= 97) && (code <= 122)) {
          return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
        }
      }
      return char;
    })
    .join('');
}


module.exports = router;
