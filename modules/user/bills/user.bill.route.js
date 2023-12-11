const express = require("express");
const BillsController = require('./user.bills.controller');
const router = express.Router();
const { authUser } = require('../../../middleware');

router.post('/create/bills',BillsController.createBills);
router.post('/create/billsAuthenticated', authUser ,BillsController.createBillsAuthenticated); 

module.exports = router;