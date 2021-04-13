const express = require("express")
const router = express.Router()
const app = require("../../../server/listenServer")
const bodyParser  = require("body-parser")
const model = require('../../../model/index');
const fs = require('fs')
const cors = require('cors')
const XLSX = require('xlsx')
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() }) // 上传文件使用缓存策略

var {PRIVITE_KEY,EXPIRESD} = require("../../../utils/store")
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())  // 允许跨域


router.post("/upload_excel",upload.any(),  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.json({ text: '请选择文件上传' })
    }
    const { originalname, buffer } = req.files[0]
    if (!originalname.endsWith('xls') && !originalname.endsWith('xlsx')) {
      return res.json({ text: '请上传xls或xlsx格式的文件' })
    }
    // 解析excel文件
    const workbook = XLSX.read(buffer, { type: "buffer" })
    const sheet = workbook.Sheets[workbook.SheetNames[0]] // 选择第一个工作簿
    const result = XLSX.utils.sheet_to_json(sheet,{header:2,defval:''})
    return res.json(result)
  })

module.exports = router