const Razorpay = require("razorpay");
const  paymentRepo = require("../repository/paymentRepo");

const razorpay = new  Razorpay({
    key_id : "my_key_id",
    key_secret : "my_key_secret"
})


exports.createOrder = async(amount)=>{
    const options = {
        amount: amount * 100, 
        currency: "INR",
       receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
      await paymentRepo.createPayment({
    razorpay_order_id: order.id,
    amount: order.amount,
    currency: order.currency,
    status: "created",
  });
  return order;
}

exports.verifyPayment = async(data)=>{
    const { razorpay_order_id, razorpay_payment_id } = data;
    const updated = await paymentRepo.updatePayment(razorpay_order_id,{
        razopay_payment_id : razorpay_payment_id,
        status : "paid"
    });
    return updated;
}