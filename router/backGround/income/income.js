const express = require("express")
const router = express.Router()
const app = require("../../../server/listenServer")
const bodyParser = require("body-parser")
const model = require('../../../model/index');

var { PRIVITE_KEY, EXPIRESD } = require("../../../utils/store")
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//管理员按年收益
router.get('/adminYear', function (req, res) {
    new Promise(async (resolve, reject) => {
        let users = await model.order.find({status:{$ne:3}}, { buy_price: 1, time: 1 })
        console.log(users,"结果");
        let result = new Array(12).fill(0);
        users.forEach(element => {
            let mouth = element.time.split(' ')[0].split('-')[1]
            result[mouth - 1] = result[mouth - 1] + element.buy_price
        });
        resolve(result)
        console.log(result);
    }).then((result) => {
        res.send({
            data: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
            result: result
        })
    })
})

//管理员按月收益
router.get('/adminMouth', function (req, res) {
    let mouth = req.query.mouth
    new Promise(async (resolve, reject) => {
        let users = await model.order.find({status:{$ne:3}}, { buy_price: 1, time: 1 })
        let result = {}
        users.forEach(element => {
            if(element.time.split(' ')[0].split('-')[1] == mouth) {
                if(result[element.time.split(' ')[0].split('-')[1] + '-' + element.time.split(' ')[0].split('-')[2]]) {
                    result[element.time.split(' ')[0].split('-')[1] + '-' + element.time.split(' ')[0].split('-')[2]]
                     = result[element.time.split(' ')[0].split('-')[1] + '-' + element.time.split(' ')[0].split('-')[2]] + element.buy_price 
                }else {
                    result[element.time.substr(5,4)] = element.buy_price
                }
            }
        });
        resolve(result)
        console.log(result);
    }).then((result) => {
        let result1 = []
        for(let i in result) {
            result1.push(result[i])
        }
        res.send({
            data: Object.keys(result),
            result: result1
        })
    })
})

//商家按年收益
router.get('/restaurantYear', function (req, res) {
    new Promise(async (resolve, reject) => {
        let users = await model.order.find({restaurantID:req.query.id,status:{$ne:3}}, { buy_price: 1, time: 1 })
        console.log(users,"结果");
        let result = new Array(12).fill(0);
        users.forEach(element => {
            let mouth = element.time.split(' ')[0].split('-')[1]
            result[mouth - 1] = result[mouth - 1] + element.buy_price
        });
        resolve(result)
        console.log(result);
    }).then((result) => {
        res.send({
            data: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
            result: result
        })
    })
})


//商家按月收益
router.get('/restaurantMouth', function (req, res) {
    let mouth = req.query.mouth
    new Promise(async (resolve, reject) => {
        let users = await model.order.find({restaurantID:req.query.id,status:{$ne:3}}, { buy_price: 1, time: 1 })
        let result = {}
        users.forEach(element => {
            if(element.time.split(' ')[0].split('-')[1] == mouth) {
                if(result[element.time.split(' ')[0].split('-')[1] + '-' + element.time.split(' ')[0].split('-')[2]]) {
                    result[element.time.split(' ')[0].split('-')[1] + '-' + element.time.split(' ')[0].split('-')[2]]
                     = result[element.time.split(' ')[0].split('-')[1] + '-' + element.time.split(' ')[0].split('-')[2]] + element.buy_price 
                }else {
                    result[element.time.substr(5,4)] = element.buy_price
                }
            }
        });
        resolve(result)
        console.log(result);
    }).then((result) => {
        let result1 = []
        for(let i in result) {
            result1.push(result[i])
        }
        res.send({
            data: Object.keys(result),
            result: result1
        })
    })
})

module.exports = router