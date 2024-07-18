// models/Voucher.js
const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
});

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;
