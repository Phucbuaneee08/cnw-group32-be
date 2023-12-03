const express = require("express");
const router = express.Router();
const SampleController = require('./template.controller');

router.get("/", SampleController.get);

module.exports = router;
