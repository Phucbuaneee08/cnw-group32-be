const { Discounts } = require("../../../models");
const { db } = require('../../../helpers/dbHelper');

exports.CreateDiscount = async (adminId, name, code, value, startDate, expiredDate, quantity) => {
    const sDate = new Date(startDate);
    const eDate = new Date(expiredDate);
    const discount = await Discounts(db).create({adminId, name, code, value, startDate: sDate, expiredDate: eDate, quantity });
    return discount;
}

exports.GetAllDiscounts = async () => {
    console.log('Get all discounts');
    const discounts = await Discounts(db).find({});
    console.log(discounts)
    return discounts;
}