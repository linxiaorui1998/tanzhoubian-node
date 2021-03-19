
const express = require("express")
const router = express.Router()
const bodyParser  = require("body-parser")
const app = require("../../server/listenServer")
const model = require('../../model/index')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.get('/',(req,res)=>{
  let id = req.query.id 
    async function test(){
        const  result = await model.discounts.find({restaurantID:id},{}) 
        res.send(result)
      }
      test()
})

router.get('/menus',(req,res)=>{
    let id = req.query.id 
    let openid = req.query.openid 
      async function test(){
          const  result = await model.menu.find({restaurantID:id},{})
          const  result1 = await model.supported.find({openid:openid},{})
          // let obj = JSON.parse(JSON.stringify(result))
          let obj = JSON.parse(JSON.stringify(result))
          // console.log(obj);
          for(let i =0; i < result.length; i++) {
            if(result1.length !== 0 && result1[0].menus.includes(result[i]._id)){
              obj[i].supported = true
            }else {
              obj[i].supported = false
            }
          }
          console.log(obj,"obj1");
          res.send(obj)
        }
        test()
  })
  //修改点赞数
  router.post('/changeSupport',(req,res)=>{
    let id = req.body.id;
    let openid = req.body.openid;
      async function test(){
        try {
          //查看是否有在点赞表里
          var a = await model.supported.find({openid:openid})
          //还没创建用户点赞数据
          if(a.length === 0) {
            await model.supported.create({
              openid: openid,
              menus: [id],
          })
          }else {
            //如果没有则push
             if(!a[0].menus.includes(id)) {
               await model.supported.updateOne({openid :openid},{$addToSet:{menus:id}})
             }
          }
          //对菜单的点赞数增加
          await model.menu.updateOne({_id: id},{$inc: {support: +1,}})
          res.send('ok')
      } catch (error) {
          console.log(error);
      }  
    }
        test()
  })

  //获取用户点赞列表
  router.get('/supported',(req,res)=>{
    let openid = req.query.openid 
      async function test(){
          const  result = await model.supported.find({openid:openid},{})
          res.send(result[0])
        }
        test()
  })
module.exports = router