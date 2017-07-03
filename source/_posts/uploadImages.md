---
title: 多图片上传
categories: Node.js
tags: ['node.js']
---

以前写java的时候上传图片感觉蛮复杂的，就想看看神奇的node.js实现图片上传需要多少代码量,试过之后结果令人惊讶


## 代码示例

```
1. node.js
let multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads')
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	}
})

var upload = multer({
		storage: storage
	}) //for parsing multipart/form-data


/**
 * 多图上传 
 * @files 文件名称
 * 12 ： 文件数量限制
 */
app.post('/uploadImg', upload.array('files', 12), function(req, res) {
	console.log(req.files);
	res.send(req.body);
});

2. 前端
//jade模板语法
form(action="/uploadImg",method="post",enctype="multipart/form-data")
		div
			lable 图片上传
			input(type="file",name="files",multiple=true)
		div
			lable Name
			input(type="text",name="name")
		div
			lable age
			input(type="text",name="age")
		div
			input(type="submit",value="提交")

```

有没发现，除了插件引入的配置外就一行代码解决了多图片上传功能