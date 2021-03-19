const express = require("express")
const router = express.Router()
const app = require("../../../server/listenServer")
const bodyParser  = require("body-parser")

var {PRIVITE_KEY,EXPIRESD} = require("../../../utils/store")
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.post('/',function(req,res){
    let username = req.body.username
    let pwd = req.body.password
    let headertoken = req.headers.token;
    //没有token的时候
    if(headertoken === undefined) {
        let token = jwt.sign({username},PRIVITE_KEY,{expiresIn:EXPIRESD});
        res.send(token)
    }else {
        let payload = jwt.verify(headertoken,PRIVITE_KEY)
        res.send('ok')
    }
})


module.exports = router
