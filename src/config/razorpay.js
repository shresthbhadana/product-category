require('dotenv').config();
const Razorpay = require('razorpay');

console.log("Checking Razorpay Keys before sending request:");
console.log("Key ID:", `"${process.env.RAZORPAY_KEY_ID}"`);
console.log("Key Secret:", `"${process.env.RAZORPAY_KEY_SECRET}"`);

const razorpay = 

  new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})
;

module.exports = razorpay;