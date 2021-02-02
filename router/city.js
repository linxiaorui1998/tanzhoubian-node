const express = require("express")
const router = express.Router()
const request = require('https')
const city = require('../city.json')

router.get('/',function(req,res){
    console.log(city);
    res.send(city)
})

router.get('/local',(req,res)=>{
    let key = req.query.key
    let location = req.query.location
    let result = null
    location = '113.26436,23.12908'
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

module.exports = router