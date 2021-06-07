const express = require("express")
const bodyParser  = require("body-parser")
const app = require("../../server/listenServer")
//随机数生成导入模块
const { v4: uuidv4 } = require('uuid');
const router = express.Router()
const request = require('https')
const User = require('../../model/user');
const model = require('../../model/index');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
router.post('/',function(req,res){
    let code = req.body.code;
    let appid = 'wx84357b7f3ce8bc2f'
    let appSerect = '3f39a54086c4f33347877120e8dd4e09'
    let random = uuidv4()
    let openid = ''
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSerect}&js_code=${code}&grant_type=authorization_code`
    let promise = new Promise((resolve)=>{
        request.get(url,function(res){
            res.on('data',async(data)=>{
                let result = JSON.parse(data.toString())
                openid = result.openid
                let users = await User.find({openid:result.openid})
                if(users.length > 0) {
                    try {
                        await User.updateOne({openid: result.openid}
                            ,{$set: {session: random,openid: result.openid
                                ,session_key: result.session_key}},)
                    } catch (error) {
                        console.log(error);
                    }
                }else {
                    await User.create({session: random,openid: result.openid,
                        session_key: result.session_key})
                }
                resolve()
            })
           
        })
    })
  promise.then(()=>{
    res.send({
        random:random,
        openid:openid
    })
  })
    
})

module.exports = router