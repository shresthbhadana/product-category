const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;