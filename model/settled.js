var mongoose = require('../server/connectMognDb')
const settled = new mongoose.Schema({
    name:String,
    sex:String,
    phone:String,
    address:String,
    restaurantName:String,
    fileList:Array
});

const Settled = mongoose.model('Settled', settled) 
module.exports = Settled