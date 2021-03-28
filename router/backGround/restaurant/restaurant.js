const express = require("express")
const router = express.Router()
const app = require("../../../server/listenServer")
const bodyParser  = require("body-parser")
const model = require('../../../model/index');

var {PRIVITE_KEY,EXPIRESD} = require("../../../utils/store")
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.get('/message',function(req,res){
    let payload = jwt.verify(req.headers.token,PRIVITE_KEY)
    new Promise(async (resolve,reject)=>{
        let users = await model.account.find({userName:payload.username})
        resolve(users)
    }).then(async (users)=>{
        if(users.length > 0) {             
            let result = await model.restaurant.find({_id:users[0].RestaurantId})
            res.json(result)
        }else {
            res.send({status: 500, msg: '找不到商家信息'})
        }
    })
})

router.post('/setMessage',function(req,res){
    let payload = jwt.verify(req.headers.token,PRIVITE_KEY)
    let obj = req.body
    console.log(payload);
    new Promise(async (resolve,reject)=>{
        let users = await model.account.find({userName:payload.username})
        resolve(users)
    }).then(async (users)=>{
        if(users.length > 0) {             
            await model.restaurant.updateOne({_id:users[0].RestaurantId},{'$set':obj})
            res.send('ok')
        }else {
            res.send({status: 500, msg: '找不到商家信息'})
        }
    })
})
module.exports = router
