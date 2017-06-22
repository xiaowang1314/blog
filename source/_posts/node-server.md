title: Node服务器搭建
---
最近开始玩node.js想把自己学习的过程记录下来，从最简单的来吧

## 服务器搭建代码
```
let express = require('express');
let port = process.env.PORT || 3000;
let app = express();
let bodyParser = require('body-parser');//接入这个插件才能http请求参数解析
let multer = require('multer');//上传文件使用
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads')//./uploads图片上传路径
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	}
})
var upload = multer({
		storage: storage
	}) //for parsing multipart/form-data

app.set('views', './views/pages');//页面路径
app.set('view engine', 'jade');//使用jade模板渲染引擎
app.listen(port);

console.log('started on port ' + port);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded


//首页
app.get('/', function(req, res) {
	res.render('index');
});


```



##### 参考链接
1. [Node.js官网](http://nodejs.cn/api/synopsis.html)
2. [express官网](http://www.expressjs.com.cn/4x/api.html)
3. [multer](https://github.com/expressjs/multer)
4. [body-parser](https://github.com/expressjs/body-parser)

