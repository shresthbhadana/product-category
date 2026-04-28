const logger = require("../config/logger");
const userService = require("../services/userServices");

exports.signup = async (req, res) => {
  try {
    const user = await userService.signup(req.body);
    res.status(201).json(user);
    logger.info("user created successfully")
  } catch (err) {
    res.status(400).json({ error: err.message });
    logger.error("error in creating user")
  }
};

exports.login = async (req, res) => {
  try {
    const user = await userService.login(req.body);
    res.json(user);
    logger.info("user logged in succcessfullly")
  } catch (err) {
    res.status(400).json({ error: err.message });
    logger.error("error in user login")
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers(req.query);
    res.json(users);
    logger.info("users fetched sucessfully")
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error("error in fetching the users")
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
   logger.info(`user${req.params.id} fetched successfuly`)
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error("error in fetching the user")
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
    logger.info(`user ${req.params.id} is updated successfully`)

  } catch (err) {
    res.status(400).json({ error: err.message });
    logger.error("error in updating the user")
  }
};
exports.getUserSubscriptions = async (req, res) => {
  try {
    const data = await userService.getUserSubscriptions(req.params.id);
    res.json(data);
    logger.info(`subscription for user${req.params.id} fetched successfully`)
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
    logger.error("error in fetching the subscriptions")
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
    looger.info(`user ${req.params.id} deleted successfully`)
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error("error in deleting the user")
  }
};