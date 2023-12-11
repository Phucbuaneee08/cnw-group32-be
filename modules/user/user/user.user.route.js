const express = require("express");
const UserController = require("./user.user.controller");
const router = express.Router();
const { authToken, authUser, authRole, authSuperAdmin } = require('../../../middleware');

router.post("/create/user", UserController.createUser);

router.put("/update/user",authToken, authUser, UserController.updateUserById);
router.get("/get/user",authToken, authUser, UserController.getUser);

router.delete("/delete/user/:id",authToken, authSuperAdmin, UserController.deleteUser);
router.get("/get/users",authToken, authSuperAdmin, UserController.getUsers);

module.exports = router;