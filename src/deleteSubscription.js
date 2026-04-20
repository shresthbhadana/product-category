const connectDB = require("./config/db");
const Subscription = require("./models/subscriptionModel");

const deleteSubscriptions = async () => {
  try {
    await connectDB();

    await Subscription.deleteMany({});

    console.log("✅ All subscriptions deleted");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

deleteSubscriptions();