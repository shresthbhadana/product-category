const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    order_id : String,
    razopay_payment_id : String,
    razopay_order_id : String,
    amount : Number,
    currency :{
        type : String,
        default :"INR"
    },
    status : {
        type: String,
        enum : ["created", "paid","failed"],
        default : "created"
    },

},
{timestamps: true}

)

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;