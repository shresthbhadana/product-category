
const User = require("../models/userModel")
const Product = require("../models/productModel")

exports.getAllUsers = async () => {
    return await User.find();
};




exports.deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};





exports.deleteProduct = async (productId) => {
    let product = await Product.findById(productId);
    if(!product){
        throw new Error("Product not found");
    }
    return await Product.findByIdAndDelete(productId)
};