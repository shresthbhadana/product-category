
const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const  paymentRepo = require("../repository/paymentRepo");




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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

 
    
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

    if (razorpay_signature === expectedSignature) {
        const updated = await paymentRepo.updatePayment(razorpay_order_id,{
            razorpay_payment_id : razorpay_payment_id,
            status : "paid"
        });
        return { success: true, updated };
    } else {
       
        
        await paymentRepo.updatePayment(razorpay_order_id,{
            razorpay_payment_id : razorpay_payment_id,
            status : "failed"
        });
        throw new Error("Payment verification failed");
    }
}