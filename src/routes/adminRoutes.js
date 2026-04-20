const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware.js");


router.post("/login",adminController.adminLogin);
router.get("/users",authMiddleware,adminController.getAllUsers);
router.delete("/users/:id", authMiddleware,adminMiddleware,adminController.deleteUser);
router.delete("/product/:id", authMiddleware,adminMiddleware,adminController.deleteProduct);
module.exports = router;