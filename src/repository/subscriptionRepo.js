const mongoose = require('mongoose');
const Subscription = require("../models/subscriptionModel");

exports.createSubscription = async(data)=>{
    return await Subscription.create(data);
}

exports.getSubscriptions = async(filter)=>{
    return await Subscription.find(filter);
}

exports.getSubscriptionById = async(rzpId)=>{
    return await Subscription.findOne({razorpay_subscription_id: rzpId})
}

exports.updateSubscription = async(rzpId, updatedData)=>{
    const updateObj = { ...updatedData };
    if (updatedData.schedule_change_at) {
        updateObj.has_scheduled_changes = true;
        updateObj.schedule_change_at = updatedData.schedule_change_at;
    }
    return await Subscription.findOneAndUpdate({razorpay_subscription_id: rzpId}, updateObj, {new: true});
}
exports.cancelSubscription = async(rzpId)=>{
    return await Subscription.findOneAndUpdate({razorpay_subscription_id: rzpId}, {status: "cancelled"}, {new: true});
}
                                    
