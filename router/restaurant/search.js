const express = require("express")
const router = express.Router()
const app = require("../../server/listenServer")
const bodyParser  = require("body-parser")
const model = require('../../model/index');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.get('/coupon',function(req,res){
    let value = req.query.value
    new Promise(async (resolve,reject)=>{
        let users = await model.coupon.find({name:{$regex:value}})
        resolve(users)
    }).then(async (users)=>{
        res.json(users)
    })
})

router.get('/restaurant',function(req,res){
    let value = req.query.value
    new Promise(async (resolve,reject)=>{
        let users = await model.restaurant.find({name:{$regex:value},type:{$regex:value}})
        resolve(users)
    }).then(async (users)=>{
        res.json(users)
    })
})

router.get('/couponList',function(req,res){
    new Promise(async (resolve,reject)=>{
        let users = await model.coupon.find({isadopt:1})
        resolve(users)
    }).then((users)=>{
        console.log('接口调用')
        res.json(users)
    })
})

router.get('/discounts',function(req,res){
    let id = req.query.id
    new Promise(async (resolve,reject)=>{
        let users = await model.discounts.find({_id:id})
        resolve(users)
    }).then((users)=>{
        res.json(users)
    })
})

router.get('/coupons',function(req,res){
    let id = req.query.id
    console.log(id);
    new Promise(async (resolve,reject)=>{
        let users = await model.coupon.find({_id:id})
        resolve(users)
    }).then((users)=>{
        res.json(users)
    })
})
module.exports = router