const express = require("express")
const router = express.Router()
const app = require("../../../server/listenServer")
const bodyParser  = require("body-parser")
const model = require('../../../model/index');
const fs = require('fs')
const cors = require('cors')
const XLSX = require('xlsx')
const multer = require('multer')
const path = require('path')
const co = require('co')
const OSS = require('ali-oss')

var client = new OSS({
  region: 'oss-cn-guangzhou',
  accessKeyId: 'LTAI5tLUCJotx1JmkeidX9DB',
  accessKeySecret: 'RjNV4xnJ8VqxL1Xh06NvSa7n3opsih',
  bucket: 'upload-image1998',
});

var ali_oss = {
  bucket: 'upload-image1998',
  endPoint: 'oss-cn-guangzhou.aliyuncs.com',
}
const upload = multer({ storage: multer.memoryStorage() }) // 上传文件使用缓存策略
let upload1 = multer({ dest: './upload' }).single('file')

var {PRIVITE_KEY,EXPIRESD} = require("../../../utils/store")
const jwt = require("jsonwebtoken");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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

  router.get('/dowload_excel',function(req,res){
    res.download(path.join(__dirname,'/模板.xlsx'),err=>{
      if(err) {
      }
    })
  });

  router.post('/delImage',async function(req,res){
    let url = req.body.url
    let result = await client.delete(url);
    res.send(result)
  });

  router.post('/upload2', upload1, async (req, res) => {
        // 文件路径
        var filePath = './' + req.file.path;
        // 文件类型
        var temp = req.file.originalname.split('.');
        var fileType = temp[temp.length - 1];
        var lastName = '.' + fileType;
        // 构建图片名
        var fileName = Date.now() + lastName;
        // 图片重命名
        fs.rename(filePath, fileName, (err) => {
            if (err) {
                res.end(JSON.stringify({ status: '102', msg: '文件写入失败' }));
            } else {
                var localFile = './' + fileName;
                var key = fileName;
                // 阿里云 上传文件 
                co(function* () {
                    client.useBucket(ali_oss.bucket);
                    var result = yield client.put('images/' + key, localFile,{
    //这一步是为了解决返回的图片直接默认打开的需要做判断处理由于时间关系所以暂无处理
                        headers:{
                            'content-type':'image/jpg'
                        }
                    });
                    var imageSrc =  result.name;
                    // 上传之后删除本地文件
                    fs.unlinkSync(localFile);
                    res.end(JSON.stringify({ status: '100', msg: '上传成功', imageUrl: imageSrc }));
                }).catch(function (err) {
                    // 上传之后删除本地文件
                    fs.unlinkSync(localFile);
                    res.end(JSON.stringify({ status: '101', msg: '上传失败', error: JSON.stringify(err) }));
                });
            }
        });
    })
    
module.exports = router