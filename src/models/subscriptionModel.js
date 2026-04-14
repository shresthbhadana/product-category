// src/models/subscription.model.js
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  razorpay_subscription_id: {
    type: String,
    required: true,
  },
  plan_id: {
    type: String,
    required: true,
  },
  customer_id: {
    type: String,
  },
  status: {
    type: String,
    enum: [
      'created',
      'authenticated',
      'active',
      'pending',
      'halted',
      'cancelled',
      'completed',
      'expired'
    ],
    default: 'created',
  },
  current_start: Number,
  current_end: Number,
  ended_at: Number,

  quantity: {
    type: Number,
    default: 1,
  },

  total_count: Number,
  paid_count: {
    type: Number,
    default: 0,
  },
  remaining_count: Number,

  charge_at: Number,
  start_at: Number,
  end_at: Number,

  offer_id: String,

  notes: {
    type: Map,
    of: String,
  },

  customer_notify: {
    type: Boolean,
    default: true,
  },
offer_id: String,
  short_url: String,

  has_scheduled_changes: Boolean,
  schedule_change_at: String,

  expire_by: Number,

}, { timestamps: { createdAt: 'created_at', updatedAt: true } });

module.exports = mongoose.model('Subscription', subscriptionSchema);