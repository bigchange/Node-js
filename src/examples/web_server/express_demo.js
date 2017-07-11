//express_demo.js 文件
var express = require('express');
var util = require('util')
var path = require("path")
var bodyParser = require('body-parser');
var fs = require('fs')
const child_process = require('child_process');
var client = require('./client')

var app = express();
 
var multer  = require('multer');
 // 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));

// index
app.get('/', function (req, res) {
    res.setHeader("Content-Type", "application/json")
    // res.send('Hello World');
    res.json({msg:"Hello World, this is home page!", status:200})
})

app.get('/home', function (req, res) {
   res.sendFile(path.normalize(__dirname + "/public/index.html"));
   // res.end("this is home page!!")
})

// get
app.get('/process_get', function (req, res) {
 
   // 输出 JSON 格式
   var response = {
       "first_name":req.query.first_name,
       "last_name":req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

// post
app.post('/process_post', urlencodedParser, function (req, res) {
 
   // 输出 JSON 格式
   var response = {
       "first_name":req.body.first_name,
       "last_name":req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/file_upload', function (req, res) {
 
   console.log(req.files[0]);  // 上传的文件信息
 
   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
       // post resume
       if (!err) {
        client.postExtractor(data, response);
       }

       // save files in local machine
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else {
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})

// rest api
/**
 * 1	listUsers	GET	空	显示所有用户列表
 * 2	addUser	POST	JSON 字符串	添加新用户
 * 3	deleteUser	DELETE	JSON 字符串	删除用户
 * 4	:id	GET	空	显示用户详细信息
 */

// 列举用户
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/public/users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

// 添加用户
//添加的新用户数据
var userDefine = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.post('/addUser', function (req, res) {
   // 读取已存在的数据
   fs.readFile( __dirname + "/public/users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       // data["user4"] = user["user4"];
       var id = req.body.id
       var name = req.body.name
       var password = req.body.password
       var profession = req.body.profession
       var key = ("user" + id)
       console.log("key -> " + key)
       var user = {
                "name" : name,
                "password" : password,
                "profession" : profession,
                "id": id
            }
       data[key] = user
       fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }
       console.log( data );
       res.end(JSON.stringify(data));
   });
})

// 通过id获取用户
app.get('/:id', function (req, res) {
   // 首先我们读取已存在的用户
   fs.readFile( __dirname + "/public/users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var user = data["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})

// 删除用户
app.get('/deleteUser/:id', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/public/users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + req.params.id];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})
 
// 启动服务
var server = app.listen(8082, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})