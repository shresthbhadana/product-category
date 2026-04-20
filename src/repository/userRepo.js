const User = require("../models/userModel");

exports.createUser = async (data) => {
  return await User.create(data);
}

exports.getAllUsers = async (filter, skip, limit) => {
  filter = filter || {};
  skip = Number(skip) || 0;
  limit = Number(limit) || 0;

  return await User.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
}

exports.getUserById = async (id) => {
  return await User.findById(id);
}

exports.findByEmail = async (email) => {
  return await User.findOne({ email });
}

exports.findByMobile = async (mobile) => {
  return await User.findOne({ mobile });
}

exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
}
exports.getUserWithSubscriptions = async (userId) => {
  return await User.findById(userId).populate("subscriptions");
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
}
