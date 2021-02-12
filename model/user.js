var mongoose = require('../server/connectMognDb')
const user = new mongoose.Schema({
   session:String,
   openid:String,
   session_key:String
});

const User = mongoose.model('User', user) 
module.exports = User