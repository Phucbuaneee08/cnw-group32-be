const express = require("express");
const BillsController = require('./user.bills.controller');
const router = express.Router();
const { authUser, authToken } = require('../../../middleware');

router.post('/create/bill',BillsController.createBills);
router.post('/create/billsAuthenticated',authToken, authUser ,BillsController.createBillsAuthenticated); 

router.get('/get/bills', authToken ,authUser, BillsController.getBillsByUserId);
router.get('/get/bill/:id', authToken ,authUser, BillsController.getBillByBillId);


module.exports = router;