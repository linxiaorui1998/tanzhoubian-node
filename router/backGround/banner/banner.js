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
    new Promise(async (resolve,reject)=>{
        let result = await model.bannerImge.find()
        resolve(result)
    }).then((result)=>{
        res.send(result)
    })
})
router.post('/add',function(req,res){
    let obj = req.body
    new Promise(async (resolve,reject)=>{
        let result = await model.bannerImge.create(obj)
        resolve()
    }).then(()=>{
        res.send('ok')
    })
})

router.post('/edit',function(req,res){
    let obj = req.body
    new Promise(async (resolve,reject)=>{
        let result = await model.bannerImge.updateOne({_id:obj._id},{'$set':obj})
        resolve()
    }).then(()=>{
        res.send('ok')
    })
})
router.post('/del',function(req,res){
    new Promise(async (resolve,reject)=>{
        let result = await model.bannerImge.deleteOne({_id:req.body._id})
        resolve()
    }).then(()=>{
        res.send('ok')
    })
})
module.exports = router

