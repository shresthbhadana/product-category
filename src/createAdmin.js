const Admin = require("./models/adminModel");
const bcrypt = require("bcryptjs");

exports.createAdmin = async () => {
    try {
        console.log("Checking admin...");

        const exist = await Admin.findOne({
            email: process.env.ADMIN_EMAIL,
        });

        if (!exist) {
            const hash = await bcrypt.hash(
                process.env.ADMIN_PASSWORD,
                10
            );

            await Admin.create({
                email: process.env.ADMIN_EMAIL,
                password: hash,
            });

            console.log("Admin created");
        } else {
            console.log("Admin already exists");
        }
    } catch (err) {
        console.error("Admin Error:", err.message);
    }
};