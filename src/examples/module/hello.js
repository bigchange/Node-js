/*
exports.world = function() {
  console.log('Hello World');
}
*/
// 模块的使用 - 导出一个对象
function Hello() { 
	var name; 
	this.setName = function(thyName) { 
		name = thyName; 
	}; 
	this.sayHello = function() { 
		console.log('Hello ' + name); 
	}; 
}; 
module.exports = Hello;