var express  = require('express')

var app = express()

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
       console.log( data )
       res.end( data )
   })
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

app.get('/home', function (req, res) {
   res.sendFile(path.normalize(__dirname + "/public/upload.html"))
   // res.end("this is home page!!")
})

app.post('/addUser', function (req, res) {
   // 读取已存在的数据
   fs.readFile( __dirname + "/public/users.json", 'utf8', function (err, data) {
       data = JSON.parse( data )
       // data["user4"] = user["user4"]
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
              console.log( err )
         }
       console.log( data )
       res.end(JSON.stringify(data))
        })
   })
})


// 通过id获取用户
app.get('/:id', function (req, res) {
   // 首先我们读取已存在的用户
   fs.readFile( __dirname + "/public/users.json", 'utf8', function (err, data) {
       data = JSON.parse( data )
       var user = data["user" + req.params.id] 
       console.log( user )
       res.end( JSON.stringify(user))
   })
})

// 删除用户
app.get('/deleteUser/:id', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/public/users.json", 'utf8', function (err, data) {
       data = JSON.parse( data )
       delete data["user" + req.params.id]
       
       console.log( data )
       res.end( JSON.stringify(data))
   })
})
// 启动服务
var server = app.listen(8081,function(){
    var host = server.address().host
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

