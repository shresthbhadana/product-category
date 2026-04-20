const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  user_id: String,
  email: String,
  mobile: String,
  password: String,
  name: String,
  company_name: String,
  role: String,
  login_type: String,
  is_verified: Boolean,
  active_status: String,
  socket_id: String,
  location: {
    city: String,
    state: String,
    pin_code: String,
  },
  profile_pic: String,
  last_web_open: Date,
  last_app_open: Date,
  web_frequency: Number,
  app_frequency: Number,
  firebase_uid: String,
  device_token: String,
  is_online: Boolean,
  call_pin: String,
  razorpay_customer_id: String,
  deleted_at: Date,
  is_logged_in: Boolean,
  subscription: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
  }],
}, {
  timestamps: true,
});

UserSchema.index({ user_id: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ mobile: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ "location.city": 1 });

const User = mongoose.model("User", UserSchema);

module.exports = User;