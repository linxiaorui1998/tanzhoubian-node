const connectMognDb = require("./server/connectMognDb")
const app = require("./server/listenServer")
const express = require('express')
const path = require('path')
const model = require('./model/index')
var {PRIVITE_KEY,EXPIRESD} = require("./utils/store") 
const jwt = require("jsonwebtoken");

app.use('/backGround/*',function (req, res, next) {
    // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
        if (req.baseUrl != '/backGround/login' && req.baseUrl != '/backGround/uploadFile/upload_excel') {
            let token = req.headers.token;
            if(token === undefined) {
                res.status(403).send('登录已过期,请重新登录')
            }
            // let token = req.headers.Cookie;
            let payload = jwt.verify(token,PRIVITE_KEY)
            let nowTime =  Math.round(new Date().getTime()/1000).toString()
            if(nowTime > payload.exp) {
                res.status(403).send('登录已过期,请重新登录')
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
app.use('/search',require('./router/restaurant/search'))
app.use('/order',require('./router/order/order'))
app.use('/restaurantList',require('./router/index/restaurant'))
app.use('/restauranMessage',require('./router/restaurant/discounts'))
app.use('/backGround/login',require('./router/backGround/login/login'))
app.use('/backGround/restaurant',require('./router/backGround/restaurant/restaurant'))
app.use('/backGround/user',require('./router/backGround/user/user'))
app.use('/backGround/menus',require('./router/backGround/menus/menus'))
app.use('/backGround/coupon',require('./router/backGround/coupon/coupon'))
app.use('/backGround/uploadFile',require('./router/backGround/uploadFile/uploadFile'))

