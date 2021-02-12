const connectMognDb = require("./server/connectMognDb")
const app = require("./server/listenServer")
const express = require('express')
const path = require('path')
const model = require('./model/index')

// model.restaurant.create({
//     name:"大龙燚",//餐厅名称
//     score:4,//评分
//     average:93,//人均
//     type:"火锅",//类型
//     city:"广州",//所在城市
//     longitude:"113.251281",//经度
//     latitude:"23.42817",//纬度
//     image:"",//图片
//     guide:"快来买",//导购语
//     specialty:"肥肠",//招牌菜
//     beginTime:"9：00",//开始营业时间
//     endTime:"24:00",//结束营业时间
// })

const Banner = require('./model/bannerImge')
app.use(express.static(path.join(__dirname,"public/image")))
app.use('/banner',require('./router/index/bannerImg.js'))
app.use('/city',require('./router/index/city'))
app.use('/login',require('./router/index/login'))
app.use('/restaurantList',require('./router/index/restaurant'))


// app.use(express.static(path.join(__dirname,"public/image")))
// app.get('/',(req,res)=>{
//     // // path.resolve(__dirname,"public/image"+ req.path)
//     // console.log(path.resolve(__dirname,"public/image"+ req.path));
//     res.type("png")
//     res.send(path.resolve(__dirname,"public/image"+ req.path))
//     console.log("连接成功");
// })
