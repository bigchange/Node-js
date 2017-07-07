// 引入 events 模块
var events = require("events")
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter()
// 创建事件处理程序
var connectionHandler = function connected(db) {
    console.log("connected -> " + db)
    // 触发 data_received 事件 
    eventEmitter.emit("data_received")
}
// 绑定 connection 事件处理程序
eventEmitter.on("connection", connectionHandler)
// 使用匿名函数绑定 data_received 事件
eventEmitter.on("data_received", function() {
    console.log("data receive success!!")
})
// 触发 connection 事件 (事件参数作为回调函数参数传递)
eventEmitter.emit("connection", "db1")


setTimeout(function(){
    console.log("time out emit events!!")
    eventEmitter.emit("data_received")
}, 1000)
console.log("程序执行完毕。")
