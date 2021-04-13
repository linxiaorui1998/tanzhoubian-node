var mongoose = require('../server/connectMognDb')
const coupon = new mongoose.Schema({
    name: String,
    image:String,
    price:Number,
    lineactionPrice:Number,
    sold:Number,
    total:Number,
    restaurantID:String,
    notice:String,
    isadopt:Number//0 未验证 1 验证通过 2 验证不通过
});

const  Coupon = mongoose.model('Coupon', coupon) 
module.exports = Coupon