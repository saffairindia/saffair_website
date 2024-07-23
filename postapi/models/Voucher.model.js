// models/Voucher.js
const mongoose = require('mongoose');
const { use } = require('../routes/auth');

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
  code:{
    type: String,
    required: true,
  },
  isRedeemed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  info: {
    type: String,
    required: true,
  },
});

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;
