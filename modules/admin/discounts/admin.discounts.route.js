const express = require("express");
const router = express.Router();

router.post("/discounts/create", DiscountsController.CreateDiscount);
router.delete("/discounts/delete/:id", DiscountsController.DeleteDiscount);
router.get("/discounts/:id", DiscountsController.FindDiscountById);
router.put("/discounts/update", DiscountsController.UpdateDiscount);
router.get("/discounts", DiscountsController.GetAllDiscountsByAdminId);


module.exports = router;