const express = require("express")
const router = express.Router()
const app = require("../../../server/listenServer")
const bodyParser  = require("body-parser")
const model = require('../../../model/index');

var {PRIVITE_KEY,EXPIRESD} = require("../../../utils/store")
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


router.get('/',function(req,res){
    let payload = jwt.verify(req.headers.token,PRIVITE_KEY)
    console.log(payload);
    new Promise(async (resolve,reject)=>{
        let users = await model.account.find({userName:payload.username},{RestaurantId:1})
        let result = await model.coupon.find({restaurantID:users[0].RestaurantId})
        resolve(result)
        console.log(result);
    }).then((result)=>{
        res.send(result)
    })
})

//获取未审核套餐、审核套餐
router.get('/noadopt',function(req,res){
    let payload = jwt.verify(req.headers.token,PRIVITE_KEY)
    new Promise(async (resolve,reject)=>{
        let users = await model.account.find({userName:payload.username})
        let noadopt = null
        let yes = null
        let no = null
        if(users[0].type === '商家') {
            noadopt = 0
        }else {
            noadopt = await model.coupon.find({isadopt:0})
            yes = await model.coupon.find({isadopt:1})
            no = await model.coupon.find({isadopt:2})
        }
        let result1 = []
        let result2 = []
        let result3 =[]
        for(let i in noadopt) {
            let obj = JSON.parse(JSON.stringify(noadopt[i]))
            let users = await model.restaurant.find({_id:noadopt[i].restaurantID},{name:1})
            obj.restaurantName = users[0].name
            result1.push(obj)
        }
        for(let i in yes) {
            let obj = JSON.parse(JSON.stringify(yes[i]))
            let users = await model.restaurant.find({_id:yes[i].restaurantID},{name:1})
            obj.restaurantName = users[0].name
            result2.push(obj)
        }
        for(let i in no) {
            let obj = JSON.parse(JSON.stringify(no[i]))
            let users = await model.restaurant.find({_id:no[i].restaurantID},{name:1})
            obj.restaurantName = users[0].name
            result3.push(obj)
        }
        resolve([result1,result2,result3])
    }).then(async ([result1,result2,result3])=>{
        res.json([result1,result2,result3])
    })
})

router.post('/add',function(req,res){
    let payload = jwt.verify(req.headers.token,PRIVITE_KEY)
    let obj = req.body.obj
    console.log(obj);
    new Promise(async (resolve,reject)=>{
        let users = await model.coupon.create(obj)
        resolve(users)
    }).then(()=>{
        res.send('ok')
    })
})

router.post('/del',function(req,res){
    let id = req.body._id
    new Promise(async (resolve,reject)=>{
        let users = await model.coupon.deleteOne({_id:id})
        resolve(users)
    }).then(()=>{
        res.send('ok')
    })
})

router.post('/pass',function(req,res){
    let id = req.body._id
    new Promise(async (resolve,reject)=>{
        let users = await model.coupon.updateOne({_id:id},{'$set':{isadopt:1}})
        resolve(users)
    }).then(()=>{
        res.send('ok')
    })
})

router.post('/fail',function(req,res){
    let id = req.body._id
    new Promise(async (resolve,reject)=>{
        let users = await model.coupon.updateOne({_id:id},{'$set':{isadopt:2}})
        resolve(users)
    }).then(()=>{
        res.send('ok')
    })
})
module.exports = router

