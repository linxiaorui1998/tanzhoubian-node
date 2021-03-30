const express = require("express")
const router = express.Router()
const app = require("../../../server/listenServer")
const bodyParser  = require("body-parser")
const model = require('../../../model/index');

var {PRIVITE_KEY,EXPIRESD} = require("../../../utils/store")
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.post('/',function(req,res){
    let username = req.body.username
    let pwd = req.body.password
    // let headertoken = req.headers.token;
    //没有token的时候
    new Promise(async (resolve,reject)=>{
        let users = await model.account.find({userName:username,Pwd:pwd})
        resolve(users)
    }).then((users)=>{
        if(users.length > 0) {
            let token = jwt.sign({username:username},PRIVITE_KEY,{expiresIn:EXPIRESD});
            console.log(token);
            res.send(token)
        }else {
            // res.send({status: 403, msg: '账号或密码错误'})
            res.status(403).end()
        }
    })
})

router.post('/changePwd',function(req,res){
    let payload = jwt.verify(req.headers.token,PRIVITE_KEY)
    let newPwd = req.body.newPwd
    let oldPwd = req.body.oldPwd
    new Promise(async (resolve,reject)=>{
        let users = await model.account.find({userName:payload.username,Pwd:oldPwd})
        resolve(users)
    }).then( async (users)=>{
        if(users.length > 0) {
            let users = await model.account.updateOne({userName:payload.username},{'$set':{Pwd:newPwd}})
            if(users.n === 1 && users.ok === 1) {
                res.status(200).end()
            }
        }else {
            // res.send({status: 403, msg: '账号或密码错误'})
            res.status(403).end('账号或密码错误')
        }
    })
})

router.get('/test',function(req,res){
    res.send('ok')
})

router.get('/menu',function(req,res){
    let payload = jwt.verify(req.headers.token,PRIVITE_KEY)
    new Promise(async (resolve,reject)=>{
        let users = await model.account.find({userName:payload.username})
        console.log(users[0].type);
        resolve(users)
    }).then((users)=>{
        if(users[0].type === '管理员') {
           let obj = {
            menus:[
              
           ],
           menusChild:[
            {
                icon: 'el-icon-setting',
                name: 'User',
                title:'用户信息',
                child:[
                  {
                    icon: 'el-icon-setting',
                    name: 'UserList',
                    title:'用户列表',
                  },
                   {
                    icon: 'el-icon-setting',
                    name: 'UserManage',
                    title:'用户管理',
                  }
                ]
            },
           ]
           }
        res.json(obj)
        }else {
            let obj = {
                menus:[
                    {
                        icon: 'el-icon-setting',
                        name: 'RestaurantMessage',
                        title:'店铺信息'
                    },
                    {
                        icon: 'el-icon-menu',
                        name: 'MenuManage',
                        title:'菜单管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        name: 'Stock',
                        title:'库存管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        name: 'Order',
                        title:'订单信息'
                    },
                    {
                        icon: 'el-icon-setting',
                        name: 'Income',
                        title:'收支信息'
                    },
               ],
               menusChild:[]
               }
               res.json(obj)
        }
    })
})

module.exports = router
