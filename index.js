const connectMognDb = require("./server/connectMognDb")
const app = require("./server/listenServer")
const express = require('express')
const path = require('path')

const Banner = require('./model/bannerImge')
app.use(express.static(path.join(__dirname,"public/image")))
app.use('/banner',require('./router/bannerImg.js'))
app.use('/city',require('./router/city'))



// app.use(express.static(path.join(__dirname,"public/image")))
// app.get('/',(req,res)=>{
//     // // path.resolve(__dirname,"public/image"+ req.path)
//     // console.log(path.resolve(__dirname,"public/image"+ req.path));
//     res.type("png")
//     res.send(path.resolve(__dirname,"public/image"+ req.path))
//     console.log("连接成功");
// })
