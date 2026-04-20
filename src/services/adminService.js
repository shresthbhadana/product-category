const adminRepo = require("../repository/adminRepo.js");
const Admin = require("../models/adminModel.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")



exports.adminLogin = async ({ email, password }) => {
    if (!email || !password) {
        const err = new Error("Email and password are required");
        err.status = 400;
        throw err;
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
        const err = new Error("Admin does not exist");
        err.status = 404;
        throw err;
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
        const err = new Error("Invalid email or password");
        err.status = 401;
        throw err;
    }

    return jwt.sign(
        { id: admin._id, role: "admin",type :"admin" },
       "secretkey",
        { expiresIn: "1h" }
    );
};

exports.getAllUsers = async () => {
    return await adminRepo.getAllUsers();
};



exports.deleteUser = async (userId) => {
    return await adminRepo.deleteUser(userId);
};

exports.deleteProduct = async(productId)=>{
  return await adminRepo.deleteProduct(productId);
}