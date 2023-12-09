const express = require("express");
const UserController = require("./user.user.controller");
const router = express.Router();
const { authToken, authUser } = require('../../../middleware');

router.put("/update/user", authUser, UserController.updateUserById);
router.post("/create/user", UserController.createUser);
router.delete("/delete/user/:id", authToken, UserController.deleteUser);
router.get("/get/users", authToken, UserController.getUsers);
router.get("/get/admin/:id", authToken, UserController.getUserById);

module.exports = router;