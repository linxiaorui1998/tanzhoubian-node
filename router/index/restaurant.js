const express = require("express")
const router = express.Router()
const restaurant = require('../../model/restaurant')
const request = require('https')



//获取餐厅列表
router.get('/',(req,res)=>{
    async function test(){
        let longitude = req.query.longitude//经度
        let latitude = req.query.latitude//纬度
        let id = req.query.id//id
        let cuisines = req.query.cuisine
        console.log(cuisines);
        let arr = []
        let change = []
        const  result = id ? 
        (cuisines  ? await restaurant.find({_id:id,cuisine:cuisines}) : await restaurant.find({_id:id}) )://有id
         (cuisines ? await restaurant.find({id,cuisine:cuisines}) : await restaurant.find({id})  )
        result.forEach(element => {
            arr.push(element.longitude + ',' + element.latitude)
        });
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
                console.log(result1[i],"距离");
                if(result1[i]) {
                   obj.distance = result1[i].distance / 1000 + "km"
                    change.push(obj)
                change.sort((a,b)=>{
                  return  a.distance.split('km')[0] - b.distance.split('km')[0]
                })
                }
               
              }
             resolve()
           })
        })
        })
      promise.then(()=>{
       
        // console.log(change);
        res.send(change)
      })
     
  }
      test()
})

//获取某种餐厅类型的餐厅（例如火锅，寿司）
router.get('/type',async(req,res)=>{
  let type = req.query.type
   var result = await restaurant.find({
    type: type
  })

  res.send(result)
})

//获取某个餐厅的全部信息
router.get('/message',async(req,res)=>{
  let id = req.query.id
   var result = await restaurant.find({
    _id: id
  })
  res.send(result)
})

module.exports = router