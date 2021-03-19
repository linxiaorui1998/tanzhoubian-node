//饭店对应菜单
var mongoose = require('../server/connectMognDb')
const menu = new mongoose.Schema({
    restaurantID: String,
    image:String,
    name:String,
    introduce:String,//说明
    guide:String,
    price:Number,
    sold:Number,//已卖出
    support:Number,//点赞数
});

const Menu = mongoose.model('Menu', menu) 
module.exports = Menu