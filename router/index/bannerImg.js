const express = require("express")
const router = express.Router()
const Banner = require('../../model/bannerImge')



router.get('/',(req,res)=>{
    async function test(){
        const  result = await Banner.find({},{_id:0}) 
        res.send(result)
      }
      test()
})

module.exports = router