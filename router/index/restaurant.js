const express = require("express")
const router = express.Router()
const restaurant = require('../../model/restaurant')
const request = require('https')

router.get('/',(req,res)=>{
    async function test(){
        let longitude = req.query.longitude//经度
        let latitude = req.query.latitude//纬度
        let arr = []
        var change = []
        const  result = await restaurant.find({},{_id:0}) 
        result.forEach(element => {
            arr.push(element.longitude + ',' + element.latitude)
        });
        arr.join('|')
        let key = '6325483d7a196109808539ae8bf3f732'
        let url = `https://restapi.amap.com/v3/distance?origins=${arr.join('|')}&destination=${longitude},${latitude}&key=${key}`
        let result1 = null
        let promise = new Promise((resolve)=>{
          request.get(url, function(res){
            res.on('data',(data)=>{
              result1 = JSON.parse(data.toString()).results
              for(let i in result) {
                let obj = {}
                obj = JSON.parse(JSON.stringify(result[i]))
                obj.distance = result1[i].distance / 1000 + "km"
                change.push(obj)
              }
             resolve()
           })
        })
        })
      promise.then(()=>{
        change.sort((a,b)=>{
          return  a.distance.split('km')[0] - b.distance.split('km')[0]
        })
        // console.log(change);
        res.send(change)
      })
  }
      test()
})

module.exports = router