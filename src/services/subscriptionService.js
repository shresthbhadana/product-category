const razorpay = require("../config/razorpay");
const subsRepo = require("../repository/subscriptionRepo");
const client = require("../config/redis");


const SUB_KEY = (id) => `subscription:${id}`;
const SUB_LIST = (filter) => `subscriptions:${JSON.stringify(filter)}`;

const getExpiresBy = (minutes = 60) => {
  return Math.floor(Date.now() / 1000) + (minutes * 60);
};


exports.createSubscription = async (payload) => {
  const expiresBy = getExpiresBy(60);

  const response = await razorpay.subscriptions.create({
    plan_id: payload.plan_id,
    total_count: payload.total_count,
    quantity: payload.quantity,
    customer_notify: payload.customer_notify,
    notes: payload.notes,
    expire_by: expiresBy,
  });

  const saved = await subsRepo.createSubscription({
    razorpay_subscription_id: response.id,
    plan_id: response.plan_id,
    customerId: payload.userId,
    razorpay_customer_id: payload.customer_id,
    total_count: payload.total_count,
  });

  
  const keys = await client.keys("subscriptions:*");
  if (keys.length) await client.del(keys);

  return { db: saved, razorpay: response };
};



exports.getSubscriptions = async (filter) => {
  const cacheKey = SUB_LIST(filter);

  const cached = await client.get(cacheKey);
  if (cached) {
    console.log("Cache HIT (subscriptions)");
    return JSON.parse(cached);
  }

  console.log("Cache MISS (subscriptions)");

  const data = await subsRepo.getSubscriptions(filter);

  await client.setEx(cacheKey, 60, JSON.stringify(data));

  return data;
};



exports.getSubscriptionById = async (id) => {
  const cacheKey = SUB_KEY(id);

  const cached = await client.get(cacheKey);
  if (cached) {
    console.log("Cache HIT (subscription)");
    return JSON.parse(cached);
  }

  console.log("Cache MISS (subscription)");

  const razorpayResponse = await razorpay.subscriptions.fetch(id).catch(() => null);
  const dbResponse = await subsRepo.getSubscriptionById(id);

  const result = {
    razorpay: razorpayResponse,
    db: dbResponse,
  };

  await client.setEx(cacheKey, 60, JSON.stringify(result));

  return result;
};



exports.updateSubscription = async (rzpId, options) => {
  const response = await razorpay.subscriptions.update(rzpId, options);
  const updated = await subsRepo.updateSubscription(rzpId, options);

  await client.del(SUB_KEY(rzpId));
  const keys = await client.keys("subscriptions:*");
  if (keys.length) await client.del(keys);

  return { razorpay: response, db: updated };
};



exports.pauseSubscription = async (rzpId) => {
  const response = await razorpay.subscriptions.pause(rzpId, { pause_at: "now" });
  const updated = await subsRepo.updateSubscription(rzpId, { status: "halted" });

  await client.del(SUB_KEY(rzpId));

  return { razorpay: response, db: updated };
};



exports.resumeSubscription = async (rzpId) => {
  const response = await razorpay.subscriptions.resume(rzpId);
  const updated = await subsRepo.updateSubscription(rzpId, { status: "active" });

  await client.del(SUB_KEY(rzpId));

  return { razorpay: response, db: updated };
};



exports.cancelSubscription = async (rzpId, options = {}) => {
  const response = await razorpay.subscriptions.cancel(rzpId, options);
  const updated = await subsRepo.cancelSubscription(rzpId);

  await client.del(SUB_KEY(rzpId));
  const keys = await client.keys("subscriptions:*");
  if (keys.length) await client.del(keys);

  return { razorpay: response, db: updated };
};



exports.fetchSubscriptionInvoices = async (rzpId) => {
  const response = await razorpay.invoices.all({
    subscription_id: rzpId,
  });

  const updated = await subsRepo.updateSubscription(rzpId, {
    invoices: response.items,
  });

  await client.del(SUB_KEY(rzpId));

  return { razorpay: response, db: updated };
};