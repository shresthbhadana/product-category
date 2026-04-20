const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const admin = require("../middlewares/adminMiddleware")
const auth = require("../middlewares/authMiddleware")

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/", auth,admin,controller.getUsers);
router.get("/:id", auth,controller.getUserById);
router.put("/:id", auth,controller.updateUser);
router.get("/:id/subscription",auth,admin ,controller.getUserSubscriptions);
router.delete("/:id",auth,admin, controller.deleteUser);

module.exports = router;