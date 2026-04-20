const connectDB = require("./config/db");
const Subscription = require("./models/subscriptionModel");
const Plan = require("./models/planModel");
const User = require("./models/userModel");

const seedSubscriptions = async () => {
  try {
    await connectDB();

    await Subscription.deleteMany({});

    const users = await User.find();
    const plans = await Plan.find();

    if (users.length === 0) throw new Error("No users found");
    if (plans.length === 0) throw new Error("No plans found");

    const data = [];
    const now = Math.floor(Date.now() / 1000);

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const plan = plans[i % plans.length];

      data.push({
        razorpay_subscription_id: `sub_test_${i + 1}`,
        plan_id: plan._id,

        // 🔥 LINK USER
        customerId: user._id,

        status: "active",

        current_start: now,
        current_end: now + 30 * 24 * 60 * 60,

        total_count: 12,
        paid_count: 0,
        remaining_count: 12,

        quantity: 1,
        customer_notify: true,

        notes: { source: "seed_script" }
      });
    }

    const inserted = await Subscription.insertMany(data);

    // 🔥 IMPORTANT: update user with subscription
    for (let i = 0; i < inserted.length; i++) {
      await User.findByIdAndUpdate(inserted[i].customerId, {
        $push: { subscriptions: inserted[i]._id }
      });
    }

    console.log("✅ 50 Subscriptions created & linked");
    process.exit();

  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

seedSubscriptions();