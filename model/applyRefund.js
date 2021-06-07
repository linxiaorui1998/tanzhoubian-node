var mongoose = require('../server/connectMognDb')

const applyRefund = new mongoose.Schema({
    goodsID:String,
    orderID:String,
    goodsName:String,
    goodsPrice:String,
    restaurantId:String,//商家ID
    restaurantName:String,//商家名称
    time:String,
    reason:String,
    descript:String,//描述
    fileList:Array,//
    status:String//状态（1未审核 2已同意 3已拒绝）
});

const ApplyRefund = mongoose.model('ApplyRefund', applyRefund)
module.exports = ApplyRefund