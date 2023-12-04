const express = require("express");
const router = express.Router();

router.post("/discount/create", DiscountsController.CreateDiscount);
router.delete("/discount/delete/:id", DiscountsController.DeleteDiscount);
router.get("/discount/:id", DiscountsController.FindDiscountById);
router.put("/discount/update", DiscountsController.UpdateDiscount);
router.get("/discount", DiscountsController.GetAllDiscountsByAdminId);


module.exports = router;