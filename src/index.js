require("dotenv").config();   // 🔥 sabse pehle

const app = require("./app");
const connectDB = require("./config/db");
const { createAdmin } = require("./createAdmin");

connectDB().then(() => {
    createAdmin(); 
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server started");
});