const express = require("express");
const router = express.Router();
const controller = require("../controllers/paymentController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Razorpay order ID
 *         amount:
 *           type: number
 *           description: Order amount in paisa
 *         currency:
 *           type: string
 *           description: Currency code
 *         receipt:
 *           type: string
 *           description: Receipt ID
 *         status:
 *           type: string
 *           description: Order status
 */

/**
 * @swagger
 * /api/payments/create-order:
 *   post:
 *     summary: Create a new payment order
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount in rupees
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
router.post("/create-order", controller.createOrder);

/**
 * @swagger
 * /api/payments/verify-payment:
 *   post:
 *     summary: Verify payment after completion
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razorpay_order_id
 *               - razorpay_payment_id
 *               - razorpay_signature
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *                 description: Razorpay order ID
 *               razorpay_payment_id:
 *                 type: string
 *                 description: Razorpay payment ID
 *               razorpay_signature:
 *                 type: string
 *                 description: Razorpay signature for verification
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       500:
 *         description: Payment verification failed
 */
router.post("/verify-payment", controller.verifyPayment);


module.exports = router; 