const express = require("express")
const router = express.Router()
const app = require("../../server/listenServer")
const bodyParser  = require("body-parser")
const model = require('../../model/index');

var {PRIVITE_KEY,EXPIRESD} = require("../../utils/store")
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.post('/add',(req,res)=>{
    let obj ={
        time:req.body.time,
        openid:req.body.openid,
        buy_type:req.body.buy_type,
        buy_id:req.body.buy_id,
        buy_price:req.body.buy_price,
        restaurantID:req.body.restaurantID,
        status:req.body.status,
        isComment:false
    }
    new Promise(async (resolve,reject)=>{
        let users = await model.order.create(obj)
        resolve(users)
    }).then(()=>{
        res.send('ok')
    })
  })

  //退货
  router.post('/refund',(req,res)=>{
    let id = req.query.id
    new Promise(async (resolve,reject)=>{
        let users = await model.order.updateOne({_id:id},{'$set':{status:3}})
        resolve(users)
    }).then(()=>{
        res.send('ok')
    })
  })

  router.get('/nouse',(req,res)=>{
    let openid = req.body.openid
    new Promise(async (resolve,reject)=>{
        let users = await model.order.find({openid:openid,status:1})
        resolve(users)
    }).then((users)=>{
        res.send(users)
    })
  })

  //获取订单列表
router.get('/orderList',function(req,res){
    let type = req.query.type
    let id = req.query._id
    let obj = type === '管理员' ? {} : {restaurantID:id}
    new Promise(async (resolve,reject)=>{
        let users = await model.order.find(obj)
        console.log(users);
        resolve(users)
    }).then((users)=>{    
        res.json(users)
    })
})

//获取可使用的订单列表
router.get('/canUseOrder',function(req,res){
    let openid = req.query.openid
    let type = req.query.type
    let comment = req.query.comment
    new Promise(async (resolve,reject)=>{
        let users = null
        if(comment != undefined) {
            users = await model.order.find({openid:openid,status:2,isComment:false})
            console.log(users,'diyi');
        }else {
            type == undefined ? users = await model.order.find({openid:openid})
             : users = await model.order.find({openid:openid,status:type})
             console.log('dier');
        }
        let result = []
        if(users.length == 0) {
            resolve(result)
            return 
        }
        users.forEach(async (element,index) => {
            let obj = {}
            let goods = null
            // console.log("执行了以此");
            let restaurants = await model.restaurant.find({_id:element.restaurantID})
            //判断订单类型，获取订单商品信息
            element.buy_type == 'coupons' ? 
            goods = await model.coupon.find({_id:element.buy_id}) : 
            goods = await model.menu.find({_id:element.buy_id})

            obj = JSON.parse(JSON.stringify(element))
            obj.restaurantImage = restaurants[0].image
            obj.restaurantName = restaurants[0].name
            obj.restaurantScore = restaurants[0].score
            obj.restaurantAverage = restaurants[0].average
            obj.goodsImage = goods[0].image
            obj.goodsName = goods[0].name
            result.push(obj)
            while(index == users.length-1) {
                resolve(result)
                return 
            }
        });
    }).then((result)=>{    
        res.json(result)
    })
})

  //根据id获取订单信息
  router.get('/orderById',function(req,res){
    let id = req.query.id
    new Promise(async (resolve,reject)=>{
        let users = await model.order.find({_id:id})

        let result = []
        if(users.length == 0) {
            resolve(result)
            return 
        }
        users.forEach(async (element,index) => {
            let obj = {}
            let goods = null
            // console.log("执行了以此");
            let restaurants = await model.restaurant.find({_id:element.restaurantID})
            //判断订单类型，获取订单商品信息
            element.buy_type == 'coupons' ? 
            goods = await model.coupon.find({_id:element.buy_id}) : 
            goods = await model.menu.find({_id:element.buy_id})

            obj = JSON.parse(JSON.stringify(element))
            obj.restaurantImage = restaurants[0].image
            obj.restaurantName = restaurants[0].name
            obj.restaurantScore = restaurants[0].score
            obj.restaurantAverage = restaurants[0].average
            obj.goodsImage = goods[0].image
            obj.goodsName = goods[0].name
            result.push(obj)
            while(index == users.length-1) {
                resolve(result)
                return 
            }
        });
    }).then((result)=>{    
        res.json(result)
    })
})
module.exports = router