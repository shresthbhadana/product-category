const razorpay = require("../config/razorpay");
const subsRepo = require("../repository/subscriptionRepo");

//helper function for expiring subscriptions
const getExpiresBy = (minutes=60)=>{
    return Math.floor(Date.now() / 1000) + (minutes * 60);
}

exports.createSubscription = async(payload)=>{
    const expiresBy = getExpiresBy(60); 
    const razorpayload = {
        plan_id: payload.plan_id,
        total_count: payload.total_count,
        quantity: payload.quantity,
        customer_notify: payload.customer_notify,
        notes: payload.notes,
        expire_by: expiresBy,
    }
     if (payload.offer_id) {
        razorpayload.offer_id = payload.offer_id;
    }
    const response = await razorpay.subscriptions.create(razorpayload);

    const saved = await subsRepo.createSubscription({
        razorpay_subscription_id: response.id,
        plan_id: response.plan_id,
        customer_id: payload.customer_id,
        total_count: payload.total_count,
        quantity: payload.quantity,
        customer_notify: payload.customer_notify,
        notes: payload.notes,
        expire_by: expiresBy,
        offer_id: payload.offer_id,
    });

    return {
        db: saved,
        razorpay: response,
    }
}
exports.getSubscriptions = async(filter)=>{
    return await subsRepo.getSubscriptions(filter);
};

exports.updateSubscription = async(rzpId, options)=>{
    const response = await razorpay.subscriptions.update(rzpId, options);
    const updated = await subsRepo.updateSubscription(rzpId, options);
    return {
        razorpay: response,
        db: updated,
    }
};

exports.retrieveScheduledChanges = async(rzpId)=>{
    const response = await razorpay.subscriptions.retrieveScheduledChanges(rzpId);
    return response;
};

exports.pauseSubscription = async(rzpId)=>{
    const response = await razorpay.subscriptions.pause(rzpId, { pause_at: "now" });
    const updated = await subsRepo.updateSubscription(rzpId, { status: "halted" });
    return {
        razorpay: response,
        db: updated,
    }
};

exports.resumeSubscription = async(rzpId)=>{
    const response = await razorpay.subscriptions.resume(rzpId);
    const updated = await subsRepo.updateSubscription(rzpId, { status: "active" });
    return{
        razorpay: response,
        db: updated,
    }
}
exports.fetchSubscriptionInvoices = async (rzpId) => {
    const response = await razorpay.invoices.all({
        subscription_id: rzpId,
    });

    const updated = await subsRepo.updateSubscription(rzpId, {
        invoices: response.items,
    });

    return {
        razorpay: response,
        db: updated,
    };
};


exports.cancelSubscription = async(rzpId, options = {})=>{
    const response = await razorpay.subscriptions.cancel(rzpId, options);
    const updated = await subsRepo.cancelSubscription(rzpId);
    return {
        razorpay: response,
        db: updated,
    }
}
exports.removeOfferFromSubscription = async (subId, offerId) => {

    const response = await razorpay.subscriptions.deleteOffer(subId, offerId);

    const updated = await subsRepo.updateSubscription(subId, {
        offer_id: null
    });

    return {
        razorpay: response,
        db: updated,
    };
};