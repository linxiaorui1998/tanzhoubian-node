const express = require("express")
const router = express.Router()
const request = require('https')
const city = require('../../city.json')

router.get('/',function(req,res){
    console.log(city);
    res.send(city)
})

router.get('/local',(req,res)=>{
    let key = req.query.key
    let location = req.query.location
    let result = null
    // location = '113.26436,23.12908'
    key = '6325483d7a196109808539ae8bf3f732'
    let url = `https://restapi.amap.com/v3/geocode/regeo?key=${key}&location=${location}&output=JSON`
    let promise = new Promise((resolve,reject)=>{
        request.get(url, function(res){
            res.on('data',(data)=>{
              result = JSON.parse(data.toString()).regeocode.addressComponent.city
              resolve() 
             console.log(result,"地址成功");
           })
        })
    })
    promise.then(function(){
        res.send(result)
    })
})

router.get('/selCity',(req,res)=>{
    let address = req.query.address
    let result = null
    let  key = '6325483d7a196109808539ae8bf3f732'
    let url = `https://restapi.amap.com/v3/geocode/geo?key=${key}&address=${address}`
    let promise = new Promise((resolve,reject)=>{
        request.get(url, function(res){
            res.on('data',(data)=>{
              result = JSON.parse(data.toString()).geocodes[0].location
              resolve() 
             console.log(result,"地址成功");
           })
        })
    })
    promise.then(function(){
        res.send(result)
    })
})

router.get('/iconList',(req,res)=> {
    let arr = [
        {'icon':'icon iconfont icon-huoguo','text':'火锅'},
        {'icon':'icon iconfont icon-shousi','text':'寿司'},
        {'icon':'icon iconfont icon-xia','text':'泰国料理'},
        {'icon':'icon iconfont icon-youxi','text':'休闲娱乐'},
        {'icon':'icon iconfont icon-kouhong','text':'美容美妆'},
        {'icon':'icon iconfont icon-shaokao','text':'烧烤'},
        {'icon':'icon iconfont icon-cake','text':'甜品'},
        {'icon':'icon iconfont icon-naicha','text':'奶茶'}
    ]
    res.send(arr)
})
module.exports = router