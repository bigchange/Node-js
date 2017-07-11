var http = require('http');

// 用于请求的选项
var options = {
   host: 'localhost',
   port: '8081',
   path: '/index.html'  
};

// 处理响应的回调函数
var callback = function(response){
   // 不断更新数据
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      // 数据接收完成
      console.log(body);
   });
}
// 向服务端发送请求
var req = http.request(options, callback);
req.end();




// post 

exports.postExtractor = function (data, response) {  
  
    var opt = {  
        method: "POST",  
        host: "hg003",  
        port: 7778,  
        path: "/api/extract_by_content",  
        headers: {  
            "Content-Type": 'application/octet-stream',  
            "Content-Length": data.length  
        }  
    };  
  
    http.request(opt, function (serverFeedback) {  
        if (serverFeedback.statusCode == 200) {  
            var body = "";  
            serverFeedback.on('data', function (data) { body += data; })  
                          .on('end', function () { res.send(200, body); });  
        }  
        else {  
            res.send(500, "error");  
        }  
    });  
}  