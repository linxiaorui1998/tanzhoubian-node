var mongoose = require('../server/connectMognDb')
const banner = new mongoose.Schema({
    name: String,
    url:String
});

const Banner = mongoose.model('Banner', banner) 
module.exports = Banner