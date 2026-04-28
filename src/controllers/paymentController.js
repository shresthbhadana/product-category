
const paymentService = require("../services/paymentService");
const logger = require("../config/logger");

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await paymentService.createOrder(amount);

    res.json(order);
     logger.info("Order created successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error("Error creating order");
  }
};



exports.verifyPayment = async (req, res) => {
  try {
    const data = await paymentService.verifyPayment(req.body);

    res.json({
      message: "Payment successful",
      data,
    });
logger.info("payment verified successfully")
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error("Error verifying payment");
  }
};