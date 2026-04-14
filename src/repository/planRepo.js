const Plan = require("../models/planModel");

exports.createPlan = async (data) => {
  return await Plan.create(data);
};

exports.getPlans = async (filter) => {
  return await Plan.find(filter);
};

exports.getPlanById = async (id) => {
  return await Plan.findById(id);
};

exports.updatePlan = async (id, data) => {
  return await Plan.findByIdAndUpdate(id, data, { new: true });
};

exports.deletePlan = async (id) => {
  return await Plan.findByIdAndDelete(id);
};