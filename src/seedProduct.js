const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");

dotenv.config({ path: ".env" });

console.log("Loaded Mongo URL:", process.env.MONGO_URL);

const brands = ["Nike", "Adidas", "Puma", "Reebok", "Bata"];
const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"];
const categories = ["Running Shoes", "Sneakers", "Casual Shoes"];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seedProducts() {
  try {
    const mongoUri = process.env.MONGO_URL;

    if (!mongoUri) throw new Error("MongoDB connection string not found");

    // 🔌 Connect without deprecated options
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");

    const products = [];

    for (let i = 1; i <= 100; i++) {
      products.push({
        user_id: new mongoose.Types.ObjectId(),
        product_category_id: new mongoose.Types.ObjectId(),
        product_name: `Shoe Model ${i}`,
        description: `Comfortable ${random(categories)} for everyday use`,
        brand: random(brands),
        grade: ["A"],
        dimension: ["10x5x3"],
        location: [{ city: random(cities) }],
        unit: "Pair",
        price: (1000 + i * 20).toString(),
        thumbnail_url: "https://via.placeholder.com/150",
        is_active: true,
        views: Math.floor(Math.random() * 200),
        average_rating: Number((Math.random() * 5).toFixed(1)),
        catalogue_url: null,
        no_of_enquiries: Math.floor(Math.random() * 50),
      });
    }

    await Product.insertMany(products);
    console.log("✅ 100 Shoe Products Inserted Successfully");

    await mongoose.disconnect();
    console.log("✅ MongoDB disconnected");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedProducts();