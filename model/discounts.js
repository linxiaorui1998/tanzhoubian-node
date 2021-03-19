//优惠商品对应表
var mongoose = require('../server/connectMognDb')
const discounts = new mongoose.Schema({
    restaurantID: String,
    image:String,
    name:String,
    guide:String,
    price:Number,
    lineactionPrice:Number,
    startTime:String,
    endTime:String,
    sold:Number,//已卖出
    type:String,//优惠卷类型(代金卷或者套餐)
});

const Discounts = mongoose.model('Discounts', discounts) 
module.exports = Discounts