var mongoose = require('../server/connectMognDb')
const restaurant = new mongoose.Schema({
    name:String,//餐厅名称
    score:Number,//评分
    average:Number,//人均
    type:String,//类型
    city:String,//所在城市
    longitude:String,//经度
    latitude:String,//纬度
    image:String,//图片
    guide:String,//导购语
    specialty:String,//招牌菜
    beginTime:String,//开始营业时间
    endTime:String,//结束营业时间
    distance:String//距离
});

const Restaurant = mongoose.model('Restaurant', restaurant) 
module.exports = Restaurant