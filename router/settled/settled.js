const express = require("express")
const router = express.Router()
const app = require("../../server/listenServer")
const bodyParser  = require("body-parser")
const model = require('../../model/index');

var {PRIVITE_KEY,EXPIRESD} = require("../../utils/store")
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 删除商家信息
router.post('/add',function(req,res){
    let obj = req.body.obj
    new Promise(async (resolve,reject)=>{
        let users = await model.settled.create(obj)
        resolve()
    }).then( ()=>{
        res.send('ok')
    })
})

router.get('/settledList',function(req,res){
    new Promise(async (resolve,reject)=>{
        let users = await model.settled.find()
        resolve(users)
    }).then(async (users)=>{
        res.json(users)
    })
})


module.exports = router
