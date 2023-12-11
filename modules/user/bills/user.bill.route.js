const express = require("express");
const BillsController = require('./user.bills.controller');
const router = express.Router();
const { authUser } = require('../../../middleware');

router.post('/create/bill',BillsController.createBills);
router.post('/create/billsAuthenticated', authUser ,BillsController.createBillsAuthenticated); 

router.get('/user/bills',authUser, BillsController.getBillsByUserId);

module.exports = router;