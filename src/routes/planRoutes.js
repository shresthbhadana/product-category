const express = require('express');
const router = express.Router();
const controller = require('../controllers/planController');

/**
 * @swagger
 * components:
 *   schemas:
 *     PlanItem:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         amount:
 *           type: number
 *         currency:
 *           type: string
 *         description:
 *           type: string
 *     Plan:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         period:
 *           type: string
 *         interval:
 *           type: integer
 *         item:
 *           $ref: '#/components/schemas/PlanItem'
 *         notes:
 *           type: object
 *           additionalProperties:
 *             type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     PlanRequest:
 *       type: object
 *       required:
 *         - period
 *         - interval
 *         - item
 *       properties:
 *         period:
 *           type: string
 *           enum: [daily, weekly, monthly, quarterly, yearly]
 *         interval:
 *           type: integer
 *         item:
 *           $ref: '#/components/schemas/PlanItem'
 *         notes:
 *           type: object
 *           additionalProperties:
 *             type: string
 *
 * /api/plans:
 *   post:
 *     summary: Create a new plan
 *     tags: [Plans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanRequest'
 *     responses:
 *       201:
 *         description: Plan created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       400:
 *         description: Invalid request
 *
 *   get:
 *     summary: Get all plans
 *     tags: [Plans]
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *         description: Filter by plan period
 *       - in: query
 *         name: interval
 *         schema:
 *           type: integer
 *         description: Filter by interval
 *     responses:
 *       200:
 *         description: List of plans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plan'
 */
router.post('/', controller.createPlan);
router.get('/', controller.getPlans);

/**
 * @swagger
 * /api/plans/{id}:
 *   get:
 *     summary: Get plan by ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Plan ID
 *     responses:
 *       200:
 *         description: Plan details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       404:
 *         description: Plan not found
 *   put:
 *     summary: Update a plan by ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Plan ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanRequest'
 *     responses:
 *       200:
 *         description: Plan updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       404:
 *         description: Plan not found
 *   delete:
 *     summary: Delete a plan by ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Plan ID
 *     responses:
 *       200:
 *         description: Plan deleted successfully
 *       404:
 *         description: Plan not found
 */
router.get('/:id', controller.getPlanById);
router.put('/:id', controller.updatePlan);
router.delete('/:id', controller.deletePlan);

module.exports = router;