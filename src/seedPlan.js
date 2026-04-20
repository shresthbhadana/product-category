
const connectDB = require("./config/db");

const Plan = require("./models/planModel");

const generatePlans = () => {
  const periods = ["daily", "weekly", "monthly", "yearly"];
  const plans = [];

  for (let i = 1; i <= 50; i++) {
    const period = periods[i % periods.length];

    plans.push({
      razorpay_plan_id: `plan_${period}_${i}`,
      period: period,
      interval: 1,

      item: {
        name: `Plan ${i} (${period})`,
        amount: (i + 1) * 10000,
        
        currency: "INR",
        description: `This is ${period} plan number ${i}`
      },

      notes: {
        category: i % 2 === 0 ? "pro" : "basic"
      }
    });
  }

  return plans;
};

const seedPlans = async () => {
  try {
    await connectDB();

    
    await Plan.deleteMany();

    const plans = generatePlans();

    await Plan.insertMany(plans);

    console.log(`✅ ${plans.length} Plans inserted successfully`);
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedPlans();