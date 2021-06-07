const express = require("express")
const router = express.Router()
const app = require("../../server/listenServer")
const bodyParser  = require("body-parser")
const model = require('../../model/index');

var {PRIVITE_KEY,EXPIRESD} = require("../../utils/store")
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//退货
router.post('/apply',(req,res)=>{
    let obj = req.body.obj
    console.log(obj,"我是");
    new Promise(async (resolve,reject)=>{
        let users = await model.applyRefund.create(obj)
        resolve(users)
    }).then(()=>{
        res.send('ok')
    })
})

//查找退货list
router.get('/refundList',(req,res)=>{
    let id = req.query.id
    new Promise(async (resolve,reject)=>{
        let users = await model.applyRefund.find({restaurantId:id})
        resolve(users)
    }).then((users)=>{
        res.send(users)
    })
})

//查找退货list
router.get('/agree',(req,res)=>{
    let orderID = req.query.orderID
    let restaurantId = req.query.restaurantId
    new Promise(async (resolve,reject)=>{
        let users = await model.order.updateOne({_id:orderID},{$set:{status:3}})
        let users1 = await model.applyRefund.updateOne({restaurantId:restaurantId},{$set:{status:2}})
        resolve()
    }).then(()=>{
        res.send('ok')
    })
})


//拒绝退货
router.get('/adopt',(req,res)=>{
    let restaurantId = req.query.restaurantId
    new Promise(async (resolve,reject)=>{
        let users1 = await model.applyRefund.updateOne({restaurantId:restaurantId},{$set:{status:3}})
        resolve(users1)
    }).then((users1)=>{
        res.send('ok')
    })
})
module.exports = router
