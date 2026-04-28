const planRepo = require("../repository/planRepo");
const razorpay = require("../config/razorpay");
const client = require("../config/redis");



const PLAN_KEY = (id) => `plan:${id}`;
const PLANS_LIST = "plans:list";


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
 client.del(PLANS_LIST);
  return await planRepo.createPlan(dbPayload);
};

exports.getPlans = async (query) => {
  const filter = {};
  if (query.period) filter.period = query.period;
  if (query.interval) filter.interval = Number(query.interval);
  if (query["item.name"]) filter["item.name"] = query["item.name"];
   const cacheKey = `plans:${JSON.stringify(filter)}`;
   const cached  = await client.get(cacheKey);
   if(cached) {
    return JSON.parse(cached)
   }

  const plans=  await planRepo.getPlans(filter);
  await client.setEx(cacheKey,86400,JSON.stringify(plans));
  return plans;
};

exports.getPlanById = async (id) => {
  const key = PLAN_KEY(id);
  const cached = await client.get(key);
  if(cached){
    return JSON.parse(cached)
  }
  const plan =  await planRepo.getPlanById(id);
  await client.setEx(key,86400,JSON.stringify(plan));
  return plan;
};

exports.updatePlan = async (id, payload) => {
  const updated  = await planRepo.updatePlan(id, payload);
  await client.del(PLAN_KEY(id))
  await client.del(PLANS_LIST);
  return updated;
};

exports.deletePlan = async (id) => {
  const deleted = await planRepo.deletePlan(id);
  await client.del(PLAN_KEY(id));
  await client.del(PLANS_LIST);
  return deleted;
};