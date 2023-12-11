const express = require("express");
const router = express.Router();
const AuthController  = require('./auth.controller');
const { authToken, authRole , authUser} = require('../../middleware');

// Các api xác thực người dùng
router.post("/login",AuthController.login);
router.post("/logout", authToken, AuthController.logout);

module.exports = router;
 