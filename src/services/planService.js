const planRepo = require("../repository/planRepo");
const razorpay = require("../config/razorpay");

exports.createPlan = async (payload) => {
  // 1. Create the plan in Razorpay first
  const rzpPayload = {
    period: payload.period,
    interval: payload.interval,
    item: {
      name: payload.item.name,
      amount: payload.item.amount,
      currency: payload.item.currency,
      description: payload.item.description
    },
    notes: payload.notes
  };

  const razorpayPlan = await razorpay.plans.create(rzpPayload);
  if(!razorpayPlan){
    console.log("razzorpay not created")
  }
console.log("Razorpay Plan Created:", razorpayPlan);


  const dbPayload = {
    ...payload,
    razorpay_plan_id: razorpayPlan.id
  };

  return await planRepo.createPlan(dbPayload);
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