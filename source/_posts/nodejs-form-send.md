---
title: Node.js原生表單提交
---

### node.js代碼

```
let http = require('http');
let querystring = require('querystring');
const url = require('url');

let server = http.createServer((req, res) => {
    res.writeHead(200,{'content-type':'text/html;charset=utf8'});
    let urlObj=url.parse(req.url);
    let reqUrl=urlObj.pathname;
	if(reqUrl === "/upload" && req.method.toLowerCase() === "get"){
		res.end('<form action="/upload" enctype="application/x-www-form-urlencoded" method="post">'+
            '<input type="text" name="username" placeholder="用户名"/>'+
            '<input type="text" name="age" placeholder="年龄"/>'+
            '<input type="text" name="sex" placeholder="性别"/>'+
            '<input type="submit" value="Submit" />'+
            '</form>');
	}else if(reqUrl === "/upload" && req.method.toLowerCase() === "post"){
       let body='';
       req.on('data',function(chunk){
           body+=chunk; 
       });
       req.on('end',function(){
           let data=querystring.parse(body);
            console.log(data);
           res.end('提交成功'+JSON.stringify(data));
       });
	}else{
        res.end('index首页');
	}

});


server.listen('3000', function() {
	console.log('server started port 3000');
})

```