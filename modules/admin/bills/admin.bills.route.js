
const express = require("express");
const BillsController = require("./admin.bills.controller");
const router = express.Router();

// Chức năng trả lại danh sách các bills của admin
router.get("/bills-of-admin/:id",BillsController.getBillsByAdminId);
router.put("/update/bills", BillsController.updateBillsById)
router.get("/bills-of-homestay",BillsController.getBillsByHomestayId);
router.delete("/delete/bills/:id", BillsController.deleteBillsById);

module.exports = router;