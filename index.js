const connectMognDb = require("./server/connectMognDb")
const app = require("./server/listenServer")
const express = require('express')
const path = require('path')
const model = require('./model/index')



const Banner = require('./model/bannerImge')
app.use(express.static(path.join(__dirname,"public/image")))
app.use('/banner',require('./router/index/bannerImg.js'))
app.use('/city',require('./router/index/city'))
app.use('/login',require('./router/index/login'))
app.use('/restaurantList',require('./router/index/restaurant'))
app.use('/restauranMessage',require('./router/restaurant/discounts'))
app.use('/backGround/login',require('./router/backGround/login/login'))

