
const paymentService = require("../services/paymentService")


exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await paymentService.createOrder(amount);

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.verifyPayment = async (req, res) => {
  try {
    const data = await paymentService.verifyPayment(req.body);

    res.json({
      message: "Payment successful",
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};