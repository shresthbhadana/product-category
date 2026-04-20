const connectDB = require("./config/db");
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");

const seedUsers = async () => {
  try {
    await connectDB();

    // optional: clean old users
    await User.deleteMany({});

    const users = [];

    for (let i = 0; i < 50; i++) {
      const hashedPassword = await bcrypt.hash("123456", 10);

      users.push({
        user_id: `user_${i + 1}`,
        name: `User ${i + 1}`,
        email: `user${i + 1}@test.com`,
        mobile: `99999999${i.toString().padStart(2, "0")}`,
        password: hashedPassword,
        role: "user",
        is_verified: true,
        active_status: "active",
      });
    }

    await User.insertMany(users);

    console.log("✅ 50 Users created");
    process.exit();

  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

seedUsers();