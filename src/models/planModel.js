const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  razorpay_plan_id: {
    type: String,
    description: "Razorpay plan ID for external subscription mapping",
  },

  period: {
    type: String,
    enum: ["daily", "weekly", "monthly", "quarterly", "yearly"],
    required: true
  },

  interval: {
    type: Number,
    required: true,
    min: 1
  },

  item: {
    name: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 100 
      
    },

    currency: {
      type: String,
      required: true,
      default: "INR"
    },

    description: {
      type: String
    }
  },

  notes: {
    type: Map,
    of: String
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Plan", planSchema);