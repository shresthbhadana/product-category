
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const productCategoryRoutes = require("./routes/productCategoryRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/categories", productCategoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);


connectDB();




app.listen(5000, () => {
	console.log("Server started on port 5000");
});