
const logger = require("../config/logger");
const service = require("../services/subscriptionService")

exports.createSubscription = async (req, res) => {
  try {
    console.log("My Request Payload (Subscription):", req.body);
    const data = await service.createSubscription(req.body);

    res.status(201).json({
      success: true,
      data,
    });
    logger.info("subscription created successfully")

  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      
      
    });
    logger.error("error in creating subscription")
  }
};
exports.getSubscriptions = async (req, res) => {
    try {
        const data = await service.getSubscriptions(req.query);
        res.status(200).json({
            success: true,
            data,
        });
        logger.info("subscriptions fetched successfully")
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
        logger.error("error in fetching subscriptions")
    }
};

exports.getSubscriptionById = async (req, res) => {
    try {
        const data = await service.getSubscriptionById(req.params.id);
        if (!data.db && !data.razorpay) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            })
            logger.info(`subscription ${req.params.id} not found`);
        }
        res.status(200).json({
            success: true,
            data,
        });
        logger.info(`subscription ${req.params.id} fetched successfully`)
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
        logger.error("error in fetching subscription")
    }
};

exports.updateSubscription = async (req, res) => {
    try {
        const data = await service.updateSubscription(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data,
        });
        logger.info("subscription updated succeffully")
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
        logger.error("error in updating the subscriptions")
    }
};

exports.retrieveScheduledChanges = async (req, res) => {
    try {
        const data = await service.retrieveScheduledChanges(req.params.id);
        res.status(200).json({
            success: true,
            data,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

exports.pauseSubscription = async (req, res) => {
    try {
        const data = await service.pauseSubscription(req.params.id);
        res.status(200).json({
            success: true,
            data,
        });
        logger.info("subscription paused successfully")
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
        logger.error("error in pausing the subscription")
    }
};
exports.resumeSubscription = async (req, res) => {
    try {
        const data = await service.resumeSubscription(req.params.id);
        res.status(200).json({
            success: true,
            data,
        });
        logger.info("subscription resumed successfully")
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
        logger.error("error in resuming the subscriptions")
    }
};
exports.getSubscriptionInvoices = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await services.fetchSubscriptionInvoices(id);

        res.status(200).json({
            success: true,
            data,
        });
        logger.info("invoice fetched successfully")

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
        logger.error("error in fetching")
    }
};
exports.cancelSubscription = async(req,res)=>{
    try{
        const options = req.body || {};
        const data = await service.cancelSubscription(req.params.id, options);
        res.status(200).json({
            success: true,
            data,
        });
        logger.info("subscription cancelled successfully")
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
        logger.error("error in cancelling the subscription")
    }
}
exports.removeOfferFromSubscription = async (req, res) => {
    try {
        const { id, offerId } = req.params;

        const data = await service.removeOfferFromSubscription(id, offerId);

        res.status(200).json({
            success: true,
            data,
        });
        logger.info("offer removed successfully")

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
        logger.error("error in removing offer")
    }
};

