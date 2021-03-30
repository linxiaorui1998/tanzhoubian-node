const express = require("express")
const router = express.Router()
const app = require("../../../server/listenServer")
const bodyParser  = require("body-parser")
const model = require('../../../model/index');

var {PRIVITE_KEY,EXPIRESD} = require("../../../utils/store")
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//获取菜单列表
router.get('/menusList',function(req,res){
    let payload = jwt.verify(req.headers.token,PRIVITE_KEY)
    new Promise(async (resolve,reject)=>{
        let users = await model.account.find({userName:payload.username})
        let result = await model.menu.find({restaurantID:users[0].RestaurantId})
        resolve(result)
    }).then((result)=>{    
        res.json(result)
    })
})

//新增菜单
router.post('/addMenus',function(req,res){
    let payload = jwt.verify(req.headers.token,PRIVITE_KEY)
    new Promise(async (resolve,reject)=>{
        let users = await model.account.find({userName:payload.username})
        let obj = {
            restaurantID: users[0].RestaurantId,
            image:'',
            name:req.body.name,
            introduce:req.body.introduce,//说明
            guide:req.body.guide,
            price:req.body.price,
            sold: 0,//已卖出
            support: 0,//点赞数
            stock: req.body.stock,//库存
            company: req.body.company,//单位
        }
        let result = await model.menu.create(obj)
        resolve(result)
    }).then((result)=>{    
       res.status(200).end()
    })
})

//编辑库存
router.post('/editStock',function(req,res){
    let payload = jwt.verify(req.headers.token,PRIVITE_KEY)
    console.log(req.body._id);
    new Promise(async (resolve,reject)=>{
        let users = await model.menu.updateOne({_id:req.body._id},{'$set':{stock:req.body.stock}})
        console.log(users);
        resolve(users)
    }).then((users)=>{    
        res.json(users)
    })
})

//删除菜品
router.post('/delMenus',function(req,res){
    // let payload = jwt.verify(req.headers.token,PRIVITE_KEY)
    new Promise(async (resolve,reject)=>{
        let users = await model.menu.deleteOne({_id:req.body._id})
        resolve(users)
    }).then((users)=>{    
        res.status(200).end()
    })
})
//修改菜单
router.post('/editMenus',function(req,res){
    // let payload = jwt.verify(req.headers.token,PRIVITE_KEY)
    let obj = {
        image:'',
        name:req.body.name,
        introduce:req.body.introduce,//说明
        guide:req.body.guide,
        price:req.body.price,
        sold: req.body.sold,//已卖出
        support: req.body.support,//点赞数
        stock: req.body.stock,//库存
        company: req.body.company,//单位
    }
    new Promise(async (resolve,reject)=>{
        let users = await model.menu.updateOne({_id:req.body._id},{'$set':obj})
        console.log(users);
        resolve(users)
    }).then((users)=>{    
        res.status(200).end()
    })
})

module.exports = router
