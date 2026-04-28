const planService = require("../services/planService");
const logger = require("../config/logger")

exports.createPlan = async (req, res) => {
  try {
    console.log("My Request Payload (Plan):", req.body);
    const plan = await planService.createPlan(req.body);
    res.status(201).json(plan);
    logger.info("Plan created successfully");
  } catch (err) {
    console.error("Razorpay Error:", err);
   
    const errorMessage = err.error || err.description || err.message || "An unknown error occurred";
    res.status(400).json({ error: errorMessage, details: err });
    logger.error("Error creating plan");
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await planService.getPlans(req.query);
    res.json(plans);
    logger.info("plan fetched suuccessfully")
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error("error fetchin plans")
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const plan = await planService.getPlanById(req.params.id);
    if (!plan) return res.status(404).json({ error: "Not found" });
    res.json(plan);
    logger.info(`flan for ${req.params.id} fetched successfully`)
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error(`error in fetchingt the paln ${req.params.id}`)
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const updated = await planService.updatePlan(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const deleted = await planService.deletePlan(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};