var express = require('express')
var util = require('util')
var path = require("path")
var bodyParser = require('body-parser')
var fs = require('fs')
var multer  = require('multer')
 // 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({ dest: '/tmp/'}).array('image'))
// index
app.get('/', function (req, res) {
    res.setHeader("Content-Type", "application/json")
    // res.send('Hello World')
    res.json({msg:"Hello World, this is home page!", status:200})
})

app.get('/home', function (req, res) {
   res.sendFile(path.normalize(__dirname + "/public/upload_file.html"))
   // res.end("this is home page!!")
})

// 启动服务
var server = app.listen(8082, function (){
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})