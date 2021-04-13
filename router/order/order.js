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
    }
    new Promise(async (resolve,reject)=>{
        let users = await model.order.create(obj)
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
module.exports = router