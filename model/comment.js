var mongoose = require('../server/connectMognDb')
const comment = new mongoose.Schema({
    openid:String,
    orderID:String,
    type:String,//好评 中评 差评
    time:String,
    content:String,//内容
    goodsID:String,
    goodsName:String,
    goodsScore:Number,//得分
    restaurantScore:String,//商家得分
    restaurantID:String,//商家ID
    restaurantContent:String,//商家得分
    restaurantFileList:Array,//商家得分
    fileList:Array,
});

const Comment = mongoose.model('Comment', comment) 
module.exports = Comment