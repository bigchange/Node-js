var fs = require("fs");

var fileName = "../resource/input.txt"
var data = fs.readFileSync(fileName);

console.log(data.toString());

console.log("阻塞读取文件finished !!");


var data = fs.readFile(fileName, function(error, data){
    if (error)  return console.error(error)
    console.log(data.toString())
})

console.log("非阻塞(回调)读取结束")
