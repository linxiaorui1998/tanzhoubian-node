var mongoose = require('../server/connectMognDb')
const order = new mongoose.Schema({
    time:String,
    user:String,
    buy_type:String,
    buy_id:String,
    buy_price:Number,
    status:Number//1已付款 2已使用
});

const  Order = mongoose.model('Order', order) 
module.exports = Order