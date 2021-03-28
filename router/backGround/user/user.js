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
        for(let i in users) {
              let id = users[i].RestaurantId
              if(id !== '') {
                let result = await model.restaurant.findById({_id:id},{name:1})
                if(result) {
                   users[i].RestaurantName = result.name
                }
              } else {
                users[i].RestaurantName = ''
              }
          }
        resolve(users)
    }).then((users)=>{     
        res.json(users)
    })
})

router.post('/addUser',function(req,res){
    let obj = {
        userName: req.body.username,
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


router.post('/updateUser',function(req,res){
    let obj = {
        userName: req.body.username,
        Pwd: req.body.Pwd,
        RestaurantId: req.body.RestaurantId,
        type: req.body.type,
        RestaurantName: req.body.RestaurantName,
    }
    console.log(obj);
    new Promise(async (resolve,reject)=>{
        let users = await model.account.updateOne({userName:req.body.username},{'$set':obj})
        resolve(users)
    }).then((users)=>{     
        if(users) {
            res.status(200).end()
        }else {
            res.status(500).end()
        }
    })
})
module.exports = router
