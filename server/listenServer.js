const express = require("express")
const path = require("path")
const app = express()

app.listen(3000,()=>{
    console.log("node服务启动成功，端口号为3000");
})
module.exports = app