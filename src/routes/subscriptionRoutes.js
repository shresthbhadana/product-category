const express = require('express');
const router = express.Router();

const { createSubscription, getSubscriptions, removeOfferFromSubscription,updateSubscription,getSubscriptionInvoices, retrieveScheduledChanges, pauseSubscription,resumeSubscription, cancelSubscription } = require('../controllers/subscriptionController');

/**
 * @swagger
 * components:
 *   schemas:
 *     SubscriptionRequest:
 *       type: object
 *       required:
 *         - plan_id
 *         - total_count
 *         - quantity
 *       properties:
 *         plan_id:
 *           type: string
 *           description: Razorpay subscription plan ID
 *         customer_id:
 *           type: string
 *           description: Optional customer identifier
 *         total_count:
 *           type: integer
 *           description: Total number of billing cycles
 *         quantity:
 *           type: integer
 *           description: Quantity of items or subscription units
 *         customer_notify:
 *           type: boolean
 *           description: Whether customer notifications are enabled
 *         notes:
 *           type: object
 *           additionalProperties:
 *             type: string
 *           description: Optional notes to attach to the subscription
 *         offer_id:
 *           type: string
 *           description: Optional offer identifier
 *         expire_by:
 *           type: integer
 *           description: Expiration timestamp for subscription creation request
 *     SubscriptionResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: object
 *           description: Subscription creation result
 *
 * /api/subscriptions/create:
 *   post:
 *     summary: Create a new Razorpay subscription
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionRequest'
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionResponse'
 *       400:
 *         description: Invalid request payload or subscription creation failed
 *       500:
 *         description: Server error
 */
router.post('/create', createSubscription);

/**
 * @swagger
 * /api/subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by subscription status
 *     responses:
 *       200:
 *         description: List of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SubscriptionResponse'
 *       400:
 *         description: Invalid request
 */
router.get("/", getSubscriptions);

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   patch:
 *     summary: Update a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Razorpay subscription ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan_id:
 *                 type: string
 *                 description: New plan ID
 *               offer_id:
 *                 type: string
 *                 description: Offer ID
 *               quantity:
 *                 type: integer
 *                 description: Quantity
 *               remaining_count:
 *                 type: integer
 *                 description: Remaining count
 *               start_at:
 *                 type: integer
 *                 description: New start timestamp
 *               schedule_change_at:
 *                 type: string
 *                 enum: [now, cycle_end]
 *                 description: When to apply changes
 *               customer_notify:
 *                 type: boolean
 *                 description: Customer notification setting
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: Update result
 *       400:
 *         description: Invalid request or subscription not updatable
 */
router.patch("/:id", updateSubscription);

/**
 * @swagger
 * /api/subscriptions/{id}/retrieve-scheduled-changes:
 *   get:
 *     summary: Retrieve scheduled changes for a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Razorpay subscription ID
 *     responses:
 *       200:
 *         description: Scheduled changes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: Subscription with scheduled changes details
 *       400:
 *         description: Invalid subscription ID or API error
 */
router.get("/:id/retrieve-scheduled-changes", retrieveScheduledChanges);

/**
 * @swagger
 * /api/subscriptions/pause/{id}:
 *   post:
 *     summary: Pause a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Razorpay subscription ID
 *     responses:
 *       200:
 *         description: Subscription paused successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: Pause result
 *       400:
 *         description: Invalid subscription ID or subscription not in active state
 */
router.post("/pause/:id", pauseSubscription);

/**
 * @swagger
 * /api/subscriptions/cancel/{id}:
 *   post:
 *     summary: Cancel a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Razorpay subscription ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancel_at_cycle_end:
 *                 type: boolean
 *                 description: Cancel at end of billing cycle (default false)
 *     responses:
 *       200:
 *         description: Subscription cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: Cancellation result
 *       400:
 *         description: Invalid request or subscription not cancellable
 */
router.post("/cancel/:id", cancelSubscription);

/**
 * @swagger
 * /api/subscriptions/resume/{id}:
 *   post:
 *     summary: Resume a paused subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Razorpay subscription ID
 *     responses:
 *       200:
 *         description: Subscription resumed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: Resume result
 *       400:
 *         description: Invalid subscription ID or subscription not in paused state
 *       500:
 *         description: Server error
 */
router.post("/resume/:id", resumeSubscription);
/**
 * @swagger
 * /api/subscriptions/{id}/invoices:
 *   get:
 *     summary: Fetch all invoices of a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Razorpay subscription ID (e.g., sub_XXXXXXXX)
 *     responses:
 *       200:
 *         description: Invoices fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     razorpay:
 *                       type: object
 *                       description: Full Razorpay response (count + items)
 *                     db:
 *                       type: object
 *                       description: Updated subscription record (if stored)
 *       400:
 *         description: Invalid subscription ID
 *       500:
 *         description: Server error
 */
router.get("/:id/invoices", getSubscriptionInvoices);
/**
 * @swagger
 * /api/subscriptions/{id}/offer/{offerId}:
 *   delete:
 *     summary: Remove an offer from a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Razorpay subscription ID
 *       - in: path
 *         name: offerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Razorpay offer ID
 *     responses:
 *       200:
 *         description: Offer removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.delete("/:id/offer/:offerId", removeOfferFromSubscription);

module.exports = router;