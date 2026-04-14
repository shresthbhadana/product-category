
const service = require("../services/subscriptionService")

exports.createSubscription = async (req, res) => {
  try {
    const data = await service.createSubscription(req.body);

    res.status(201).json({
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
exports.getSubscriptions = async (req, res) => {
    try {
        const data = await service.getSubscriptions(req.query);
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

exports.updateSubscription = async (req, res) => {
    try {
        const data = await service.updateSubscription(req.params.id, req.body);
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
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
exports.resumeSubscription = async (req, res) => {
    try {
        const data = await service.resumeSubscription(req.params.id);
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
exports.getSubscriptionInvoices = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await subscriptionService.fetchSubscriptionInvoices(id);

        res.status(200).json({
            success: true,
            data,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
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
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}
exports.removeOfferFromSubscription = async (req, res) => {
    try {
        const { id, offerId } = req.params;

        const data = await subscriptionService.removeOfferFromSubscription(id, offerId);

        res.status(200).json({
            success: true,
            data,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

