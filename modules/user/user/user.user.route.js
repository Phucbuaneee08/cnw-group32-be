const express = require("express");
const UserController = require("./user.user.controller");
const router = express.Router();
const { authToken, authUser, authRole, authSuperAdmin } = require('../../../middleware');

router.post("/create/user", UserController.createUser);

router.put("/update/user", authUser, UserController.updateUserById);
router.get("/get/user", authUser, UserController.getUser);

router.delete("/delete/user/:id", authSuperAdmin, UserController.deleteUser);
router.get("/get/users", authSuperAdmin, UserController.getUsers);

module.exports = router;