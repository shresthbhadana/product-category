const planRepo = require("../repository/planRepo");

exports.createPlan = async (payload) => {
  return await planRepo.createPlan(payload);
};

exports.getPlans = async (query) => {
  const filter = {};
  if (query.period) filter.period = query.period;
  if (query.interval) filter.interval = Number(query.interval);
  if (query["item.name"]) filter["item.name"] = query["item.name"];
  return await planRepo.getPlans(filter);
};

exports.getPlanById = async (id) => {
  return await planRepo.getPlanById(id);
};

exports.updatePlan = async (id, payload) => {
  return await planRepo.updatePlan(id, payload);
};

exports.deletePlan = async (id) => {
  return await planRepo.deletePlan(id);
};