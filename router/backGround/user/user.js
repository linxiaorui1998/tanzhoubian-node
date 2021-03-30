const express = require("express")
const router = express.Router()
const app = require("../../../server/listenServer")
const bodyParser  = require("body-parser")
const model = require('../../../model/index');

var {PRIVITE_KEY,EXPIRESD} = require("../../../utils/store")
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.get('/list',function(req,res){
    new Promise(async (resolve,reject)=>{
        let users = await model.account.find()
        console.log(users,"list接口");
        // for(let i in users) {
        //       let id = users[i].RestaurantId
        //       if(id !== '' || id !== undefined || id !== null) {
        //         let result = await model.restaurant.findById({_id:id},{name:1})
        //         if(result) {
        //            users[i].RestaurantName = result.name
        //         }
        //       } else {
        //         users[i].RestaurantName = ''
        //       }
        //   }
        resolve(users)
    }).then((users)=>{     
        res.json(users)
    })
})

router.get('/restaurantMsg',function(req,res){
    new Promise(async (resolve,reject)=>{
        let users = await model.restaurant.find({},{name:1,})
        console.log(users);
        resolve(users)
    }).then((users)=>{     
        res.json(users)
    })
})

router.post('/addUser',function(req,res){
    let obj = {
        userName: req.body.userName,
        Pwd: req.body.Pwd,
        RestaurantId: req.body.RestaurantId,
        type: req.body.type,
        RestaurantName: req.body.RestaurantName,
    }
    console.log(obj);
    new Promise(async (resolve,reject)=>{
        let users = await model.account.create(obj)
        resolve(users)
    }).then((users)=>{     
        if(users) {
            res.status(200).end()
        }else {
            res.status(500).end()
        }
    })
})

router.post('/delUser',function(req,res){
    let id = req.body._id
    console.log(id);
    new Promise(async (resolve,reject)=>{
        let users = await model.account.deleteOne({_id:id})
        resolve(users)
    }).then((users)=>{     
        if(users) {
            res.status(200).end()
        }else {
            res.status(500).end()
        }
    })
})

router.post('/updateUser',function(req,res){
    let obj = {
        userName: req.body.userName,
        Pwd: req.body.Pwd,
        RestaurantId: req.body.RestaurantId,
        type: req.body.type,
        RestaurantName: req.body.RestaurantName,
    }
    // console.log(obj);
    new Promise(async (resolve,reject)=>{
        let users = await model.account.updateOne({_id:req.body._id},{'$set':obj})
        resolve(users)
    }).then((users)=>{     
        if(users.n === 0) {
            res.status(500).end('未找到该用户')
        }else {
            res.status(200).end()
        }
    })
})
module.exports = router
