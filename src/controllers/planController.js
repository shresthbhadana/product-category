const planService = require("../services/planService");

exports.createPlan = async (req, res) => {
  try {
    const plan = await planService.createPlan(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await planService.getPlans(req.query);
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const plan = await planService.getPlanById(req.params.id);
    if (!plan) return res.status(404).json({ error: "Not found" });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
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