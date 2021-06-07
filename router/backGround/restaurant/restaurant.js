const express = require("express")
const router = express.Router()
const app = require("../../../server/listenServer")
const bodyParser  = require("body-parser")
const model = require('../../../model/index');

var {PRIVITE_KEY,EXPIRESD} = require("../../../utils/store")
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//获取商家个人信息
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

//获取所有商家信息
router.get('/allRestaurant',function(req,res){
    new Promise(async (resolve,reject)=>{
        let users = await model.restaurant.find({})
        resolve(users)
    }).then(async (users)=>{
        res.json(users)
    })
})


//批量添加商家信息
router.post('/addRestaurants',function(req,res){
    let arr = req.body.arr
    new Promise(async (resolve,reject)=>{
        for(let i in arr) {
            await model.restaurant.create(arr[i])
            console.log(arr[i]);
        }
        resolve()
    }).then(async ()=>{
        res.json('ok')
    })
})

// 设置商家信息
router.post('/setRestaurantMessage',function(req,res){
    let obj = req.body
    console.log(obj);
    new Promise(async (resolve,reject)=>{
        let users =  await model.restaurant.updateOne({_id:obj._id},{'$set':obj})
        resolve(users)
    }).then(async (users)=>{
        res.send('ok')
    })
})

// 删除商家信息
router.post('/delRestaurant',function(req,res){
    let id = req.body.id
    new Promise(async (resolve,reject)=>{
        let users = await model.restaurant.deleteOne({_id:id})
        resolve(users)
    }).then( (users)=>{
        res.send('ok')
    })
})

//设置账号信息
router.post('/setMessage',function(req,res){
    let payload = jwt.verify(req.headers.token,PRIVITE_KEY)
    let obj = req.body
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
