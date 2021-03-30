const connectMognDb = require("./server/connectMognDb")
const app = require("./server/listenServer")
const express = require('express')
const path = require('path')
const model = require('./model/index')
var {PRIVITE_KEY,EXPIRESD} = require("./utils/store") 
const jwt = require("jsonwebtoken");

app.use('/backGround/*',function (req, res, next) {
    // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
        if (req.baseUrl != '/backGround/login') {
            let token = req.headers.token;
            // let token = req.headers.Cookie;
            console.log(token);
            let payload = jwt.verify(token,PRIVITE_KEY)
            let nowTime =  Math.round(new Date().getTime()/1000).toString()
            if(nowTime > payload.exp) {
                res.send({status: 403, msg: '登录已过期,请重新登录'})
            }else {
                console.log("没过期呢");
                next()
            } 
    } else {
        next();
    }
});

// model.account.create(
//     {
//         userName:'123',
//         Pwd:'123456',
//         type:'商家',
//         RestaurantId:'602a95d599760c24b04a36c4'
//     }
// )

const Banner = require('./model/bannerImge')
app.use(express.static(path.join(__dirname,"public/image")))
app.use('/banner',require('./router/index/bannerImg.js'))
app.use('/city',require('./router/index/city'))
app.use('/login',require('./router/index/login'))
app.use('/restaurantList',require('./router/index/restaurant'))
app.use('/restauranMessage',require('./router/restaurant/discounts'))
app.use('/backGround/login',require('./router/backGround/login/login'))
app.use('/backGround/restaurant',require('./router/backGround/restaurant/restaurant'))
app.use('/backGround/user',require('./router/backGround/user/user'))
app.use('/backGround/menus',require('./router/backGround/menus/menus'))

