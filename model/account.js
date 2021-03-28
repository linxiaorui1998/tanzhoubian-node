var mongoose = require('../server/connectMognDb')

const account = new mongoose.Schema({
    userName: String,
    Pwd:String,
    type:String,
    RestaurantId:String,
    RestaurantName:String
});

const Account = mongoose.model('Account', account)
module.exports = Account