const Payment = require ("../models/paymentModel")


exports.createPayment = async(data)=>{
    return await Payment.create(data);
}

exports.updatePayment = async(razorpay_order_id, data)=>{
    return await Payment.findOneAndUpdate({razopay_order_id : razorpay_order_id}, data, {new : true});
}

