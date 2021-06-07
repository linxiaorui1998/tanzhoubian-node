const express = require("express")
const router = express.Router()
const app = require("../../server/listenServer")
const bodyParser  = require("body-parser")
const model = require('../../model/index');

var {PRIVITE_KEY,EXPIRESD} = require("../../utils/store")
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.post('/add',function(req,res){
    let obj = req.body.obj
    new Promise(async (resolve,reject)=>{
        let result = await model.comment.create(obj)
        let result1 = await model.order.updateOne({_id:obj.orderID},{$set:{isComment:true}})
        resolve()
    }).then(()=>{
        res.send('ok')
    })
})
//获取评论
router.get('/commentList', function (req, res) {
    let type = req.query.type
    let id = req.query.id
    new Promise(async (resolve, reject) => {
        let users = await model.comment.find({goodsID:id})
        resolve(users)
    }).then((users) => {
        res.json(users)
    })
})

//获取评论
router.get('/commentListByRestaurantID', function (req, res) {
    let id = req.query.id
    new Promise(async (resolve, reject) => {
        let users = await model.comment.find({restaurantID:id})
        resolve(users)
    }).then((users) => {
        res.json(users)
    })
})

//根据用户获取评论
router.get('/commentListById', function (req, res) {
    let id = req.query.id
    new Promise(async (resolve, reject) => {
        let users = await model.comment.find({openid:id})
        resolve(users)
    }).then((users) => {
        res.json(users)
    })
})
module.exports = router

