var mongoose = require('../server/connectMognDb')
const order = new mongoose.Schema({
    time:String,//购买时间
    openid:String,//用户openid
    buy_type:String,//购买类型（优惠卷或这菜品）
    buy_name:String,//购买名称
    buy_id:String,//商品id
    restaurantID:String,//商家ID
    buy_price:Number,//购买价格
    status:Number,//1已付款 2已使用 3已退款
    isComment:Boolean
});

const  Order = mongoose.model('Order', order) 
module.exports = Order