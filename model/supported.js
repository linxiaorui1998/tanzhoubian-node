var mongoose = require('../server/connectMognDb')
const supported = new mongoose.Schema({
   openid:String,
   menus:Array//已点赞的数组
});

const Supported = mongoose.model('Supported', supported) 
module.exports = Supported